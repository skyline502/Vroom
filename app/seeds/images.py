from app.models import db, Image

def seed_images():
  demo_post_image = Image(
    url = 'https://vroom-bucket.s3.us-west-1.amazonaws.com/lexusis350.jpg',
    user_id = 1,
    post_id = 1,
  )

  demo_post_image2 = Image(
    url = 'https://vroom-bucket.s3.us-west-1.amazonaws.com/lexusis350.jpg',
    user_id = 2,
    post_id = 2,
  )
  demo_post_image3 = Image(
    url = 'https://vroom-bucket.s3.us-west-1.amazonaws.com/lexusis350.jpg',
    user_id = 3,
    post_id = 3,
  )

  db.session.add(demo_post_image);
  db.session.add(demo_post_image2);
  db.session.add(demo_post_image3);
  db.session.commit()

def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;');
  db.session.commit();
