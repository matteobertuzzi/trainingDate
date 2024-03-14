"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Trainers, Administrators, Specializations, TrainersClasses, UsersClasses, TrainersSpecializations
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/users', methods=['POST'])
def handle_signup_user():
    response_body = {}
    data = request.json
    user = db.session.query(Users).filter_by(email=data["email"],password=data["password"]).first()
    if user:
        response_body["message"] = "User already exist!"
        return response_body, 401
    else:
        new_user = Users(
            email=data["email"], 
            password=data["password"], 
            name=data["name"], 
            last_name=data["last_name"],
            address=data["address"],
            phone_number=data["phone_number"],
            is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body["message"] = "User create successfully"
        response_body["user"] = new_user.serialize()
        return response_body, 200


@api.route('/trainers', methods=['POST'])
def handle_signup_trainer():
    response_body = {}
    data = request.json
    user = db.session.query(Trainers).filter_by(email=data["email"], password=data["password"]).first()
    if user:
        response_body["message"] = "Trainer already exist!"
        return response_body, 401
    else:
        new_trainer = Trainers(
            email=data["email"],
            password=data["password"],
            name=data["name"],
            last_name=data["last_name"],
            address=data["address"],
            phone_number=data["phone_number"],
            website_url=data["website_url"],
            instagram_url=data["instagram_url"],
            facebook_url=data["facebook_url"],
            x_url=data["x_url"],
            bank_iban=data["bank_iban"],
            vote_user=0,
            sum_value=0,
            is_active=True)
        db.session.add(new_trainer)
        db.session.commit()
        response_body["message"] = "Trainer create successfully"
        response_body["user"] = new_trainer.serialize()
        return response_body, 200


@api.route('/administrators', methods=['POST'])
def handle_admin_signup():
    data = request.json
    response_body = {}
    admin = db.session.query(Administrators).filter_by(email=data['email'], password=data["password"]).first()
    if admin:
        response_body['message'] = 'Admin already exists'
        return response_body, 401
    else:
        new_admin = Administrators(name=data['name'], email=data['email'], password=['password'], is_active=True)
        db.session.add(new_admin)
        db.session.commit()
        response_body['message'] = 'Admin successfully created!'
        response_body['results'] = new_admin.serialize()
        return response_body, 200

@api.route('/users/login', methods=['POST'])
def handle_user_login():
    response_body = {}
    data = request.json
    user = db.session.query(Users).filter_by(email=data['email'], password=['password']).first()
    if not user:
        response_body['message'] = 'User not found'
        return response_body, 401
    elif user.password != data['password']:
        response_body['message'] = 'Wrong password for email ' + user.email
        return response_body, 401
    else:
        access_token = create_access_token(identity=user.email)
        response_body['message'] = 'Successfully logged in!'
        response_body['results'] = {'email': user.email,'password': user.password }
        response_body['access_token'] = access_token
        return response_body, 200
