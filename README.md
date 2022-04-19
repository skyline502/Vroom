# Vroom

Vroom is a clone of instagram, but with a focus on the car community.  Registered users will be able to browse all posts on the site.  If they find a post that they like, they can add a like to the post by clicking on the like button.  Users will also be able to comment on posts.  If a user wishes to create their own post, they may do so by clicking on the add post button on the navigation bar.  Each post can have a maximum of 5 images, with each image having a limit of around 1mb in size.


* Create user in psql
  - create user vroom_app_user with password 'password' createdb login;
* Create database in psql
  - create database vroom_app_dev with owner vroom_app_user;
