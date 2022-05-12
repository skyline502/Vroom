from flask_socketio import SocketIO, emit
import os


if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'https://vroom-pssh.herokuapp.com/',
    'http://vroom-pssh.herokuapp.com/'
  ]
else:
  origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('chat')
def handle_chat(data):
  emit('chat', data, broadcast=True)
