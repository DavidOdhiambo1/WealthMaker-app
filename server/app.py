from flask import Flask, request, jsonify, make_response, session, render_template
from models import User, Portfolio,  Holding
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import relationship, backref
from flask_restful import Api, Resource
from database import db
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv
import bcrypt

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# app secrect key for session management
secret_key = os.environ.get('SECRET_KEY') or os.urandom(24)
app.secret_key = secret_key

# config db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# create migrations
migrate = Migrate(app, db)

# connect to db
db.init_app(app)

# create api instance
api = Api(app)


CORS(app)

class SignUp(Resource):
    def post(self):
        data = request.get_json()

        full_name = data['full_name']
        email = data['email']
        password = data['password']

        user = User.query.filter_by(email=email).first()
        if user:
            response = make_response(
                jsonify({
                    "error": "User already exists"
                }), 
                409
            )
            response.headers["Content-Type"] = "application/json"
            return response
        
        # hashing password
        hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

        new_user = User(
            full_name=full_name,
            email= email,
            password = hashed_password.decode('utf8')
        )
        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            jsonify({
                "message": "User created successfully"
            }), 
            201 
        )
        response.headers["Content-Type"] = "application/json"
        return response
class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()
        if user:
            if bcrypt.checkpw(password.encode('utf8'), user.password.encode('utf8')):
                session['user_id'] = user.id
                print(f"Session after login: {session}") 

                response = make_response(jsonify({"message":f"Welcome {user.username}."}), 200)
                print("Response headers:", response.headers)
                return response

        return make_response(jsonify({"error": "Invalid email or password"}), 401)
       
class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response(jsonify({"message": "Logged out successfully"}), 200)


    
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')







if __name__ == '__main__':
    app.run(port=5555, debug=True)