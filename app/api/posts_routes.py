from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, User, Image, db
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from sqlalchemy import desc


post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def posts():
  posts = Post.query.order_by(desc(Post.created_at)).all()
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

  newPost = Post(
    title=request.form['title'],
    user_id=request.form['user_id'],
    description=request.form['description']
  )

  db.session.add(newPost)
  db.session.commit()

  newPost_id = newPost.id

  errors = []
  print(request.files.getlist('images array'), 'piiiiiiiiiiiiiiiiiiiiiiiics')
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
      post_id = newPost_id
    )

    db.session.add(newImage)
    db.session.commit()
  return newPost.to_dict()
