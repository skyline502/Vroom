from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='Demo User', username='Demo', email='demo@aa.io', password='password', profile_url='https://pbs.twimg.com/profile_images/1208234904405757953/mT0cFOVQ_400x400.jpg')
    marnie = User(
        name='Marnie Barney', username='marnie', email='marnie@aa.io', password='password', profile_url='https://pbs.twimg.com/profile_images/1208234904405757953/mT0cFOVQ_400x400.jpg')
    bobbie = User(
        name='Bobbie Brown', username='bobbie', email='bobbie@aa.io', password='password', profile_url='https://pbs.twimg.com/profile_images/1208234904405757953/mT0cFOVQ_400x400.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
