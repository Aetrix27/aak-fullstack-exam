from flask import Flask
from aak_app.config import Config
import os


app= Flask(__name__)
app.config.from_object(Config)
app.secret_key = os.urandom(24)


from models import User


