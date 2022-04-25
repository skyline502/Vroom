# Vroom

Vroom is a clone of instagram, but with a focus on the car community.  Registered users will be able to browse all posts on the site.  If they find a post that they like, they can add a like to the post by clicking on the like button.  Users will also be able to comment on posts.  If a user wishes to create their own post, they may do so by clicking on the add post button on the navigation bar.  Each post can have a maximum of 5 images, with each image having a limit of around 1mb in size.
# Live Link
[Vroom live link](https://vroom-pssh.herokuapp.com/login)

# Frontend Overview
Vroom is built on a React front end:
## React
Vroom is a React application.  Vroom uses a combination of React and CSS to style the whole app.

## Redux
Vroom uses Redux to manage the state of the application.

# Backend Overview
## Flask
Flask was used to manage the backend of my application.  We used it for our last group project, so it was the obvious choice for my backend.

## Postgresql
Postgres was used for my database

## SQLAlchemy
SQLAlchemy was used in conjunction with Flask to manage the backend of my application.  I found querying much more simpler using SQLAlchemy than using Sequelize.

## AWS S3
Amazon Web Services S3 was used to handle all user image uploads to Vroom.

# Key Functionality Implemented
## Sign up/Log in
- Users can log in or sign up
- ![sign](/react-app/public/screen5.png)

## Posts
- Users can create, edit, read, and delete posts
- ![read](/react-app/public/screen1.png)
- Users can add up to 5 images per post
- ![create](/react-app/public/screen3.png)
## Comments
- Users can create, edit, read, and delete comments
- ![comments](/react-app/public/screen6.png)
## Likes
- Users can like and unlike posts
## Search
- Users can search for other users using the search bar
- ![search](/react-app/public/screen2.png)

# Future implementation Ideas
I am happy with how the app looks right now, but in the future I would like to implement socket.io for instant messaging, and somehow incorporate posts with videos.
