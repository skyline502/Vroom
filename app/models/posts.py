from .db import db
from sqlalchemy.orm import relationship, backref

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(2000), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), server_default=func.now())

  images = relationship('Image', backref='post', cascade='all,delete-orphan')
  comments = relationship('Comment', backref='post', cascade='all,delete-orphan')
  likes = relationship('Like', backref='post', cascade='all,delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'user_id': self.user_id,
      'images': self.images,
      'comments': self.comments,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }


class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(2000), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id', passive_deletes=True), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'user_id': self.user_id,
      'post_id': self.post_id
    }

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(500), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id', passive_deletes=True), nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), server_default=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'user_id': self.user_id,
      'post_id': self.post_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
