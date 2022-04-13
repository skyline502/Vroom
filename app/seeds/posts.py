from app.models import db, Post

def seed_posts():
  demo_post = Post(
    title='My car',
    description='This is my car, a Lexus Is350. It is not fast, but it is comfortable to drive in, and looks good to me.',
    user_id=1,
  )

  db.session.add(demo_post)
  db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
