from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, get_unique_filename
import re

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    # form = SignUpForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     user = User(
    #         username=form.data['username'],
    #         email=form.data['email'],
    #         password=form.data['password']
    #     )
    #     db.session.add(user)
    #     db.session.commit()
    #     login_user(user)
    #     return user.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    print(request.form, 'forrrrrrrrrrrrrrrrm')

    errors = []
    username = User.query.filter(User.username == request.form['username']).first()
    email = User.query.filter(User.email == request.form['email']).first()
    password = request.form['password']
    confirm = request.form['confirm']
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

    def allowed_file(filename):
        return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

    img_url = "https://pbs.twimg.com/profile_images/1208234904405757953/mT0cFOVQ_400x400.jpg"

    emailValidation = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

    if username:
        errors.append('Username has already been taken.')
    if email:
        errors.append('That email has already been used.')

    if len(request.form['name'] > 100):
        errors.append('Your name must be between 2 and 100 characters long.')

    if len(password) < 8 or len(password) > 255:
        errors.append('Password must be between 8 and 255 characters long!')

    if password != confirm:
        errors.append('Passwords do not match.')

    if re.fullmatch(emailValidation, request.form['email']):
        print('Valid email')
    else:
        errors.append('Please provide a valid email')

    if len(request.form['email']) > 255:
        errors.append('Email must not be more than 255 characters long.')

    if len(request.form['username']) < 2 or len(request.form['username']) > 40:
        errors.append('Username must be between 2 characters and 40 in length')

    if allowed_file(request.files['profile_pic'].filename) == False:
        print(allowed_file(request.files['profile_pic']), '......file in backend')
        errors.append('Cannot use that file as a profile picture!')

    if len(errors):
        return {'errors': errors}, 401

    if 'profile_pic' in request.files:
        pic = request.files['profile_pic']
        print(pic, 'pic......................')
        pic.filename = get_unique_filename(pic.filename)
        image = upload_file_to_s3(pic)
        print(pic.filename, 'piccccccccccccccccccccccccccc')
        print(image, 's3333333333333333333333333')
        img_url = image['url']


    newUser = User(
        name=request.form['name'],
        username=request.form['username'],
        email=request.form['email'],
        profile_url=img_url,
        password=request.form['password']
    )

    db.session.add(newUser)
    db.session.commit()
    login_user(newUser)
    return newUser.to_dict()


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
