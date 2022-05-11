from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User,db, Post, follows

user_routes = Blueprint('users', __name__)

def followed_posts(self):
        followed = Post.query.join(
            follows, (follows.c.follower_id == Post.user_id)).filter(
                follows.c.followed_id == self.id)
        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.updated_at.desc())

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)

    if user:
        followers = [follower.to_dict() for follower in list(user.followers)]
        user = user.to_dict();
        user['followers'] = followers
        print(user, '....this user has followers?')
        return user
    else:
        return {'errors': 'user not found'}


@user_routes.route('/<int:id>', methods=['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    print(user, 'user....inbackend')
    following = user.is_following(current_user)
    if following:
        user.unfollow(current_user)
        print(current_user.username, 'is unfollowing', user.username)
        print(current_user.followers, 'my followers....')
        db.session.commit()
        return {'id': None}
    else:
        user.follow(current_user)
        print(current_user.username, 'is following', user.username)
        db.session.commit()
        return user.to_dict()


@user_routes.route('/<int:id>/follows', methods=['GET'])
@login_required
def getFollow(id):
    user = User.query.get(id);
    print(user, 'this is the user....')
    followed = list(followed_posts(user))
    followed_post = [post.to_dict() for post in followed]
    for post in followed_post:
        post['user_id'] = User.query.get(post['user_id']).to_dict()
    user = user.to_dict()
    user['followed_posts'] = followed_post
    return user
