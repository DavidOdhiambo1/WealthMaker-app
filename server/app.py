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

                response = make_response(jsonify({"message":f"Welcome {user.full_name}."}), 200)
                print("Response headers:", response.headers)
                return response

        return make_response(jsonify({"error": "Invalid email or password"}), 401)
       
class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response(jsonify({"message": "Logged out successfully"}), 200)

class Holdings(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return make_response(jsonify({"error": "Unauthorized"}), 401)

        holdings = Holding.query.filter_by(user_id=user_id).all()
        serialized_holdings = [holding.to_dict(rules=("-user.password",)) for holding in holdings]

        return make_response(jsonify(serialized_holdings), 200)
    
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return make_response(jsonify({"error": "Unauthorized"}), 401)

        data = request.get_json()
        asset_name = data['assetName']
        asset_type = data['assetType']
        buy_price = float(data['buyPrice'])
        buy_date = datetime.strptime(data['date'], '%Y-%m-%d')

        # Create or get the portfolio based on asset type
        portfolio = Portfolio.get_or_create_by_asset_type(asset_type)

        new_holding = Holding(
            asset_name=asset_name,
            asset_type=asset_type,
            buy_price=buy_price,
            buy_date=buy_date,
            portfolio_id=portfolio.id,
            user_id=user_id
        )

        db.session.add(new_holding)
        db.session.commit()

        return make_response(jsonify(new_holding.to_dict()), 201)

class HoldingsById(Resource):
    def put(self, holding_id):
        user_id = session.get('user_id')
        if not user_id:
            return make_response(jsonify({"error": "Unauthorized"}), 401)

        data = request.get_json()
        asset_name = data['assetName']
        asset_type = data['assetType']
        buy_price = float(data['buyPrice'])
        buy_date = datetime.strptime(data['date'], '%Y-%m-%d')

        holding = Holding.query.filter_by(id=holding_id, user_id=user_id).first()
        if not holding:
            return make_response(jsonify({"error": "Holding not found"}), 404)

        holding.asset_name = asset_name
        holding.asset_type = asset_type
        holding.buy_price = buy_price
        holding.buy_date = buy_date

        db.session.commit()

        return make_response(jsonify(holding.to_dict()), 200)
    
    def delete(self, holding_id):
        user_id = session.get('user_id')
        if not user_id:
            return make_response(jsonify({"error": "Unauthorized"}), 401)

        holding = Holding.query.filter_by(id=holding_id, user_id=user_id).first()
        if not holding:
            return make_response(jsonify({"error": "Holding not found"}), 404)

        db.session.delete(holding)
        db.session.commit()

        return make_response(jsonify({"message": "Holding deleted successfully"}), 200)

api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Holdings, '/holdings')
api.add_resource(HoldingsById, '/holdings/<int:holding_id>')







if __name__ == '__main__':
    app.run(port=5555, debug=True)