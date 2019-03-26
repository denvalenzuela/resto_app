import os

BIND_IP = os.environ.get('BIND_IP', '127.0.0.1')
BIND_PORT = os.environ.get('BIND_PORT', 8080)
DEBUG = os.environ.get('DEBUG', False)
