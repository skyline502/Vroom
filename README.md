# Vroom

Vroom is a clone of instagram, but with a focus on the car community.  Registered users will be able to browse all posts on the site.  If they find a post that they like, they can add a like to the post by clicking on the like button.  Users will also be able to comment on posts.  If a user wishes to create their own post, they may do so by clicking on the add post button on the navigation bar.  Each post can have a maximum of 5 images, with each image having a limit of around 1mb in size.

# Frontend Overview
Vroom is built on a React front end:
## React
Vroom is a React application.  Vroom uses a combination of React and CSS to style the whole app.

## Redux
Vroom uses Redux to manage state.

# Backend Overview
## Flask
Flask was used to manage the backend of my application.  With it fresh in my memory, it was the obvious choice for my backend.

## Postgresql
Postgres was used for my database

## SQLAlchemy
SQLAlchemy was used in conjunction with Flask to manage the backend of my application.  I found querying much more simple using SQLAlchemy than using Sequelize.

## AWS S3
Amazon Web Services S3 was used to handle all user image uploads to Vroom.  





* Create user in psql
  - create user vroom_app_user with password 'password' createdb login;
* Create database in psql
  - create database vroom_app_dev with owner vroom_app_user;
