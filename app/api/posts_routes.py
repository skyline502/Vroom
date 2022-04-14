from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post
from app.models import User
from app.models import Image


post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def posts():
  posts = Post.query.all()
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
