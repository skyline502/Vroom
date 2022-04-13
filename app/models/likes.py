from .db import db
from sqlalchemy.orm import relationship, backref


class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id', passive_deletes=True), nullable=False)
  user_id = db.Column(db.Integer, nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'post_id': self.post_id,
      'user_id': self.user_id
    }
