from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, User, Image, db
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from sqlalchemy import desc
import json
from datetime import datetime

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and \
       filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def posts():
  posts = Post.query.order_by(desc(Post.updated_at)).all()
  post_array = []
  for post in posts:
    post_array.append(post.to_dict())
  for post in post_array:
    post['user_id'] = User.query.get(post['user_id']).to_dict()
  return { 'posts': post_array}

@post_routes.route('/', methods=['POST'])
@login_required
def createPost():
  print('foooooooooooorm create', request.form)

  errors = []
  title=request.form['title'],
  user_id=request.form['user_id'],
  description=request.form['description']

  if len(title) < 8 or len(title) > 50:
    errors.append('Title must be between 8 characters and 50 characters in length')

  if len(description) < 8 or len(description) > 2000:
    errors.append('Description must be between 8 characters and 2000 characters in length.')

  if len(errors):
    return {'errors': errors}, 401

  newPost = Post(
    title=request.form['title'],
    user_id=request.form['user_id'],
    description=request.form['description']
  )

  db.session.add(newPost)
  db.session.commit()

  newPost_id = newPost.id

  print(request.files.getlist('images array'), 'piiiiiiiiiiiiiiiiiiiiiiiics')
  images = request.files.getlist('images array')




  for image in images:
    errors = []

    if allowed_file(image.filename) == False:
      errors.append(f'{image.filename} is not an Image!')

    if len(errors):
      return {'errors': errors}, 401


  for image in images:
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print(upload, 'uploaded.....')
    if 'url' not in upload:
      return upload, 400

    url = upload['url']

    newImage = Image(
      url = url,
      user_id = request.form['user_id'],
      post_id = newPost_id
    )

    db.session.add(newImage)
    db.session.commit()
  return newPost.to_dict()

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
  post = Post.query.get(post_id)
  db.session.delete(post)
  db.session.commit()
  return {'post_id': post_id}

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):
  print('does it get back here.....')
  post = Post.query.get(post_id)


  post.title = request.form['title']
  post.description = request.form['description']
  post.updated_at = datetime.now()
  db.session.commit()

  if request.files:
    images = request.files.getlist('images array')
    for image in images:
      image.filename = get_unique_filename(image.filename)

      upload = upload_file_to_s3(image)
      print(upload, 'uploaded.....')
      if 'url' not in upload:
        return upload, 400

      url = upload['url']

      newImage = Image(
        url = url,
        user_id = request.form['user_id'],
        post_id = post_id
      )

      db.session.add(newImage)
      db.session.commit()
  return post.to_dict();
