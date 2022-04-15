from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, User, Image, db, Comment
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from sqlalchemy import desc
import json
from datetime import datetime


comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/')
@login_required
def getComments():
  comments = Comment.query.all();
  comments_array = []
  for comment in comments:
    comments_array.append(comment.to_dict())
  for comment in comments_array:
    comment['user_id'] = User.query.get(comment['user_id']).to_dict()
  return { 'comments': comments_array}

@comments_routes.route('/', methods=['POST'])
@login_required
def createComment():
  print('comment create.....', request.form)

  newComment = Comment(
    comment=request.form['comment'],
    post_id=request.form['post_id'],
    user_id=request.form['user_id']
  )

  db.session.add(newComment)
  db.session.commit()

  return newComment.to_dict()
