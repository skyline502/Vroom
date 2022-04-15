from app.models import db, Comment

def seed_comments():
  demo_comment = Comment(
    comment='This is my car, a Lexus Is350. It is not fast, but it is comfortable to drive in, and looks good to me.',
    post_id=3,
    user_id=1,
  )

  demo_comment2 = Comment(
    comment='This is my car, a Lexus Is350. It is not fast, but it is comfortable to drive in, and looks good to me.',
    post_id=1,
    user_id=2,
  )

  demo_comment3 = Comment(
    comment='This is my car, a Lexus Is350. It is not fast, but it is comfortable to drive in, and looks good to me.',
    post_id=2,
    user_id=3,
  )

  db.session.add(demo_comment)
  db.session.add(demo_comment2)
  db.session.add(demo_comment3)
  db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
