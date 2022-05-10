from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


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
    # print(dir(current_user), 'flask login')