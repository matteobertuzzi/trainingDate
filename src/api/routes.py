"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Trainers, Administrators, Specializations, TrainersClasses, UsersClasses, TrainersSpecializations
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask import render_template
from datetime import timedelta, datetime
import secrets
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature


api = Blueprint('api', __name__)
CORS(api) 
bcrypt = Bcrypt()
mail = Mail()
s = URLSafeTimedSerializer('Thisisasecret!')


@api.route('/forgetpassword/<user_type>', methods=['POST'])
def handle_forget_password(user_type):
    response_body = {}
    data = request.json
    if not "email" in data:
        response_body['message'] = 'Email missing, please provide necessary data!'
        return response_body,400
    if user_type == 'users':
        current_user = db.session.query(Users).filter_by(email=data["email"]).first()
    if user_type == 'trainers':
        current_user = db.session.query(Trainers).filter_by(email=data["email"]).first()
    if user_type == 'administrators':
        current_user = db.session.query(Administrators).filter_by(email=data["email"]).first()
    expires = timedelta(minutes=30)
    confirmation_token = create_access_token(identity={'email': current_user.email,
                                                       'role': user_type,
                                                       'id': current_user.id
                                                       }, expires_delta=expires)
    subject = 'Reset Password'
    html_content = f'''
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Confirmation</title>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            display: flex,
                            flex-direction: column,
                            align-items: center,
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }}
                        .message {{
                            margin-bottom: 20px;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                            transition: background-color 0.3s ease;
                        }}
                        .button:hover {{
                            background-color: #0056b3;
                        }}
                    </style>
                </head>
                <body>
                    <div class="message">
                        <p>¡Hola!</p>
                        <p>Recibiste este correo electrónico porque solicitaste restablecer tu contraseña.</p>
                        <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                    </div>
                    <div class="action">
                        <a class="button" href="www.google.com" target="_blank">¡Haz clic aquí para restablecer tu contraseña!</a>
                    </div>
                </body>
                </html>
                '''
    msg = Message(subject, recipients=[current_user.email], html=html_content, sender=os.getenv('MAIL_DEFAULT_SENDER'))
    mail.send(msg)
    response_body["message"] = "Password reset instructions have been sent to your email"
    response_body["token"] = confirmation_token
    response_body["id"] = current_user.id
    return response_body, 200


# Controlar si hay un account con session activa
@api.route('/current_available_account', methods=['GET'])
@jwt_required()
def handle_current_available_account():
    response_body = {}
    try:
        current_user = get_jwt_identity()
    except SignatureExpired:
        return redirect(f"{process.env.FRONT_URL}/end/session") 
    response_body["message"] = "Welcome, your account is active"
    response_body["results"] = current_user
    return response_body, 200


# Mirar los usuarios registrados
@api.route('/users', methods=['GET'])
@jwt_required()
def handle_users():
    response_body = {}
    current_user = get_jwt_identity()
    if not current_user['role'] == 'administrators':
        response_body['message'] = 'Not allowed!'
        return response_body, 405
    users = db.session.query(Users).all()
    if not users:
        response_body['message'] = 'No users currently registered'
        return response_body, 404
    response_body['message'] = 'Users currently registered'
    response_body['results'] = [single_user.serialize() for single_user in users]
    return response_body, 200


# Confirmacion registracion con token
@api.route('/confirm/<token>', methods=['GET'])
def confirm_email(token):
    response_body = {}
    try:
        email = s.loads(token, salt='email-confirm', max_age=1800)
    except SignatureExpired:
        user = Users.query.filter_by(email=email).first()
        trainer = Trainers.query.filter_by(email=email).first()
        if user:
            db.session.delete(user)
        elif trainer:
            db.session.delete(trainer)
        db.session.commit()
        response_body["message"] = 'The token has expired!'
        return redirect(f"{process.env.FRONT_URL}/invalid")
    except BadSignature:
        user = Users.query.filter_by(email=email).first()
        trainer = Trainers.query.filter_by(email=email).first()
        if user:
            db.session.delete(user)
        elif trainer:
            db.session.delete(trainer)
        db.session.commit()
        response_body["message"] = 'Invalid token!'
        return redirect(f"{process.env.FRONT_URL}/invalid")
    user = Users.query.filter_by(email=email).first()
    trainer = Trainers.query.filter_by(email=email).first()
    if not user and not trainer:
        response_body["message"] = 'Invalid user or trainer!'
        return response_body, 400
    if user:
        if user.is_active:
            response_body["message"] = "User account already confirmed."
            return response_body, 400
        user.is_active = True
        db.session.add(user)
        db.session.commit()
        response_body["message"] = "User registration successful."
        return redirect(f"{process.env.FRONT_URL}/confirmation")
    elif trainer:
        if trainer.is_active:
            response_body["message"] = "Trainer account already confirmed."
            return response_body, 400
        trainer.is_active = True
        db.session.add(trainer)
        db.session.commit()
        response_body["message"] = "Trainer registration successful."
        return redirect(f"{process.env.FRONT_URL}/confirmation")


# Crear un usuario y enviar correo para la confirma de la registracion
@api.route('/users', methods=['POST'])
def handle_signup_user():
    response_body = {}
    data = request.json
    if not data:
        response_body["message"] = "No data provided"
        return response_body, 400
    required_fields = ['email', 'password', 'name', 'last_name', 'city', 'postal_code', 'phone_number', 'gender']
    if not request.json or not all(field in request.json for field in required_fields):
        response_body["message"] = "Missing required fields in the request."
        return response_body, 400
    user = db.session.query(Users).filter(Users.email == data["email"].lower()).first()
    if user:
        response_body["message"] = "User email already exists!"
        return response_body, 409
    trainer = db.session.query(Trainers).filter(Trainers.email == data["email"].lower()).first()
    if trainer:
        response_body["message"] = "Found trainer with same email!!"
        return response_body, 409
    administrator = db.session.query(Administrators).filter(Administrators.email == data["email"].lower()).first()
    if administrator:
        response_body["message"] = "Found administrator with same email!"
        return response_body, 409
    if data["gender"] not in ["Male", "Female", "Not Specified"]:
        response_body["message"] = "Data contains no valid gender"
        response_body["gender available"] = ["Male", "Female", "Not Specified"]
        return response_body, 400
    password = data["password"]
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Users(email=data["email"].lower(), 
                     password=hashed_password, 
                     name=data["name"], 
                     last_name=data["last_name"],
                     city=data["city"],
                     postal_code=data["postal_code"],
                     phone_number=data["phone_number"],
                     gender=data["gender"])
    db.session.add(new_user)
    db.session.commit()
    token = s.dumps(new_user.email, salt='email-confirm')
    confirm_url = f"{process.env.BACKEND_URL}api/confirm/{token}"
    subject = 'Confirm Email'
    html_content = f'''
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email Confirmation</title>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                display: flex,
                                flex-direction: column,
                                align-items: center,
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }}
                            .message {{
                                margin-bottom: 20px;
                            }}
                            .button {{
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #007bff;
                                color: #fff;
                                text-decoration: none;
                                border-radius: 5px;
                                transition: background-color 0.3s ease;
                            }}
                            .button:hover {{
                                background-color: #0056b3;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="message">
                                <p>Welcome! Thanks for signing up. Please follow this link to activate your account:</p>
                            </div>
                            <div class="action">
                                <a class="button" href="{confirm_url}" target="_blank">Click here to confirm!</a>
                            </div>
                        </div>
                    </body>
                    </html>
                    '''
    msg = Message(subject, recipients=[new_user.email], html=html_content, sender=os.getenv('MAIL_DEFAULT_SENDER'))
    mail.send(msg)
    response_body["message"] = "Email sent, wait for the confirmation!"
    return response_body, 200


# Mostrar los entrenadores disponibles
@api.route('/trainers', methods=['GET'])
@jwt_required()
def handle_trainers():
    response_body = {}
    current_user = get_jwt_identity()
    if not current_user['role'] == 'administrators':
        response_body['message'] = 'Not allowed!'
        return response_body, 405
    trainers = db.session.query(Trainers).all()
    if not trainers:
        response_body['message'] = 'No trainers currently registered'
        return response_body, 404
    response_body['message'] = 'Trainers currently registered'
    response_body['results'] = [single_trainer.serialize() for single_trainer in trainers]
    return response_body, 200


# Crear un entrenador
@api.route('/trainers', methods=['POST'])
def handle_signup_trainer():
    response_body = {}
    data = request.json
    if not data:
        response_body["message"] = "No data provided"
        return response_body, 400
    required_fields = ['email', 'password', 'name', 'last_name', 'city', 'postal_code', 'phone_number', 'gender', 'bank_iban']
    if not request.json or not all(field in request.json for field in required_fields):
        response_body["message"] = "Missing required fields in the request."
        return response_body, 400
    trainer = db.session.query(Trainers).filter(Trainers.email == data["email"].lower()).first()
    if trainer:
        response_body["message"] = "Trainer already exists with this email!"
        return response_body, 409
    user = db.session.query(Users).filter(Users.email == data["email"].lower()).first()
    if user:
        response_body["message"] = "Found user with same email!"
        return response_body, 409
    administrator = db.session.query(Administrators).filter(Administrators.email == data["email"].lower()).first()
    if administrator:
        response_body["message"] = "Found administrator with same email!"
        return response_body, 409
    if data["gender"] not in ["Male", "Female", "Not Specified"]:
        response_body["message"] = "Data contains no valid gender"
        response_body["gender available"] = ["Male", "Female", "Not Specified"]
        return response_body, 400
    password = data["password"]
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_trainer = Trainers(email=data["email"].lower(),
                           password=hashed_password,
                           name=data["name"],
                           last_name=data["last_name"],
                           city=data["city"],
                           postal_code=data["postal_code"],
                           phone_number=data["phone_number"],
                           gender=data["gender"],
                           website_url=data.get("website_url"),
                           instagram_url=data.get("instagram_url"),
                           facebook_url=data.get("facebook_url"),
                           x_url=data.get("x_url"),
                           bank_iban=data["bank_iban"],
                           vote_user=0,
                           sum_value=0)
    db.session.add(new_trainer)
    db.session.commit()
    token = s.dumps(new_trainer.email, salt='email-confirm')
    confirm_url = f"{process.env.BACKEND_URL}api/confirm/{token}"
    subject = 'Confirm Email'
    html_content = f'''
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email Confirmation</title>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                display: flex,
                                flex-direction: column,
                                align-items: center,
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }}
                            .message {{
                                margin-bottom: 20px;
                            }}
                            .button {{
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #007bff;
                                color: #fff;
                                text-decoration: none;
                                border-radius: 5px;
                                transition: background-color 0.3s ease;
                            }}
                            .button:hover {{
                                background-color: #0056b3;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="message">
                                <p>Welcome! Thanks for signing up. Please follow this link to activate your account:</p>
                            </div>
                            <div class="action">
                                <a class="button" href="{confirm_url}" target="_blank">Click here to confirm!</a>
                            </div>
                        </div>
                    </body>
                    </html>
                    '''
    msg = Message(subject, recipients=[new_trainer.email], html=html_content, sender=os.getenv('MAIL_DEFAULT_SENDER'))
    mail.send(msg)
    response_body["message"] = "Email sent, wait for the confirmation!"
    return response_body, 200


# Mostrar los admin disponibles
@api.route('/administrators', methods=['GET'])
@jwt_required()
def handle_admins():
    response_body = {}
    current_user = get_jwt_identity()
    if not current_user['role'] == 'administrators':
        response_body['message'] = 'Not allowed!'
        return response_body, 405
    admins = db.session.query(Administrators).all()
    if not admins:
        response_body['message'] = 'No administrators currently registered'
        return response_body,404
    response_body['message'] = 'Administrators currently registered'
    response_body['results'] = [single_admin.serialize() for single_admin in admins]
    return response_body, 200


# Crear un admin
@api.route('/administrators', methods=['POST'])
def handle_signup_admin():
    response_body = {}
    data = request.json
    if not data:
        response_body["message"] = "No data provided"
        return response_body, 400
    required_fields = ['email', 'password', 'name']
    if not request.json or not all(field in request.json for field in required_fields):
        response_body["message"] = "Missing required fields in the request."
        return response_body, 400
    admin = db.session.query(Administrators).filter(Administrators.email == data['email'].lower()).first()
    if admin:
        response_body['message'] = 'Admin already exists'
        return response_body, 409
    trainer = db.session.query(Trainers).filter(Trainers.email == data["email"].lower()).first()
    if trainer:
        response_body["message"] = "Found trainer with same email!!"
        return response_body, 409
    user = db.session.query(Users).filter(Users.email == data["email"].lower()).first()
    if user:
        response_body["message"] = "Found user with same email!"
        return response_body, 409
    password = data["password"]
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_admin = Administrators(name=data['name'], 
                               email=data['email'].lower(), 
                               password=hashed_password)
    db.session.add(new_admin)
    db.session.commit()
    access_token = create_access_token(identity={"admin": new_admin.email,
                                                 "role": "administrators",
                                                 "id": new_admin.id})
    response_body['results'] = {"admin": new_admin.serialize(), 
                                "role": "administrators"}
    response_body['access_token'] = access_token
    response_body['message'] = 'Admin successfully created and logged in!'
    return response_body, 200


# Crear espacializaciones
@api.route('/specializations', methods=["POST"])
@jwt_required()
def handle_add_specializations():
    response_body = {}
    current_user = get_jwt_identity()
    if not current_user['role'] == 'administrators':
        response_body['message'] = 'Not allowed!'
        return response_body, 405
    data = request.json
    if not data:
        response_body["message"] = "No data provided"
        return response_body, 400
    if 'name' not in data:
        response_body["message"] = "The 'name' field is required."
        return response_body, 400
    specializations = db.session.query(Specializations).all()
    if any(specialization.name == data["name"].lower() for specialization in specializations):
        response_body["message"] = "Specialization already exists"
        return response_body, 400
    new_specialization = Specializations(name=data["name"].lower(), 
                                         description=data.get("description"), 
                                         logo_url=data.get("logo_url"))
    db.session.add(new_specialization)
    db.session.commit()
    response_body["message"] = "Specialization created"
    response_body["specialization"] = new_specialization.serialize()
    return response_body, 201
    

# Mostrar especializaciones
@api.route('/specializations', methods=['GET'])
def handle_specializations():
    response_body = {}
    specializations = db.session.query(Specializations).all()
    if not specializations:
            response_body["message"] = "No specializations available"
            return response_body, 404
    response_body["message"] = "Specializations available"
    response_body["specializations"] = [specialization.serialize() for specialization in specializations]
    return response_body, 200


# Login (user, trainer, admin)
@api.route('/login/<user_type>', methods=['POST'])
def handle_login(user_type):
    response_body = {}
    data = request.json
    if not data:
        response_body["message"] = "No data provided"
        return response_body, 400
    if "email" not in data:
        response_body["message"] = "Email is required"
        return response_body, 400
    if "password" not in data:
        response_body["message"] = "Password is required"
        return response_body, 400
    if user_type not in ['users', 'trainers', 'administrators']:
        response_body['message'] = 'Invalid user type'
        return response_body, 400
    if user_type == 'users':
        user = db.session.query(Users).filter_by(email=data['email'].lower()).first()
        if not user:
            response_body['message'] = f'{user_type.capitalize()} not found'
            return response_body, 401
        if not user.is_active:
            response_body["message"] = "The user is not active."
            return response_body, 400
        password = data['password']
        if not bcrypt.check_password_hash(user.password, password):
            response_body['message'] = f'Wrong password for email {user.email}'
            return response_body, 401
        access_token = create_access_token(identity={"user": user.email,
                                                     "role": user_type,
                                                     "id": user.id})
        response_body['message'] = 'Successfully logged in!'
        response_body['results'] = {"user": user.serialize(), 
                                    "role": user_type}
        response_body['access_token'] = access_token
        return response_body, 200
    elif user_type == 'trainers':
        trainer = db.session.query(Trainers).filter_by(email=data['email'].lower()).first()
        if not trainer:
            response_body['message'] = f'{user_type.capitalize()} not found'
            return response_body, 401
        if not trainer.is_active:
            response_body["message"] = "The trainer is not active."
            return response_body, 400
        password = data['password']
        if not bcrypt.check_password_hash(trainer.password, password):
            response_body['message'] = f'Wrong password for email {trainer.email}'
            return response_body, 401
        access_token = create_access_token(identity={"trainer": trainer.email,
                                                     "role": user_type,
                                                     "id": trainer.id})
        response_body['message'] = 'Successfully logged in!'
        response_body['results'] = {"trainer": trainer.serialize(), 
                                    "role": user_type}
        response_body['access_token'] = access_token
        return response_body, 200
    elif user_type == 'administrators':
        administrator = db.session.query(Administrators).filter_by(email=data['email'].lower()).first()
        if not administrator:
            response_body['message'] = f'{user_type.capitalize()} not found'
            return response_body, 401
        if not administrator.is_active:
            response_body["message"] = "The administrator is not active."
            return response_body, 400
        password = data['password']
        if not bcrypt.check_password_hash(administrator.password, password):
            response_body['message'] = f'Wrong password for email {administrator.email}'
            return response_body, 401
        access_token = create_access_token(identity={"administrator": administrator.email,
                                                     "role": user_type,
                                                     "id": administrator.id})
        response_body['message'] = 'Successfully logged in!'
        response_body['results'] = {"administrator": administrator.serialize(), 
                                    "role": user_type}
        response_body['access_token'] = access_token
        return response_body, 200


# Mostrar, borrar o modificar user
@api.route('/users/<int:id>', methods=["GET", "DELETE", "PATCH"])
@jwt_required()
def handle_user(id):
    response_body = {}
    user = Users.query.get(id)
    current_user = get_jwt_identity()
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
    if (current_user['role'] == 'users' and current_user['id'] == id) or (current_user['role'] == 'administrators'):
        if request.method == "GET":
            response_body["message"] = "User found"
            response_body["user"] = user.serialize()
            return response_body, 200
        if request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()
            response_body["message"] = "User delete"
            response_body["delete user"] = user.serialize()
            return response_body, 200
        if request.method == "PATCH":
            data = request.json
            if not data:
                response_body["message"] = "No data provided for update"
                return response_body, 200
            if 'password' in data:
                hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
                user.password = hashed_password
            if "city" in data:
                user.city = data["city"]
            if "postal_code" in data:
                user.postal_code = data["postal_code"]
            if "phone_number" in data:
                user.phone_number = data["phone_number"]
            db.session.add(user)
            db.session.commit()
            response_body["message"] = "User Update"
            response_body["user update"] = user.serialize()
            return response_body, 200
    response_body['message'] = 'Not allowed!'
    return response_body, 405


# Mostrar, borrar o modificar trainer
@api.route('/trainers/<int:id>', methods=["GET", "DELETE", "PATCH"])
@jwt_required()
def handle_trainer(id):
    response_body= {}
    current_user = get_jwt_identity()
    trainer = Trainers.query.get(id)
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
    if (current_user['role'] == 'trainers' and current_user['id'] == id) or (current_user['role'] == 'administrators'):
        if request.method == "GET":
            response_body["message"] = "Trainer found"
            response_body["trainer"] = trainer.serialize()
            return response_body, 200
        if request.method == "DELETE":
            db.session.delete(trainer)
            db.session.commit()
            response_body["message"] = "Trainer delete"
            response_body["delete trainer"] = trainer.serialize()
            return response_body, 200
        if request.method == "PATCH":
            data = request.json
            if not data:
                response_body["message"] = "No data provided for update"
            if 'password' in data:
                hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
                trainer.password = hashed_password
            if "city" in data:
                trainer.city = data["city"]
            if "postal_code" in data:
                trainer.postal_code = data["postal_code"]
            if "phone_number" in data:
                trainer.phone_number = data["phone_number"]
            if "website_url" in data:
                trainer.website_url = data["website_url"]
            if "instagram_url" in data:
                trainer.instagram_url = data["instagram_url"]
            if "facebook_url" in data:
                trainer.facebook_url = data["facebook_url"]
            if "x_url" in data:
                trainer.x_url = data["x_url"]
            if "bank_iban" in data:
                trainer.bank_iban = data["bank_iban"]
            db.session.add(trainer)
            db.session.commit()
            response_body["message"] = "Trainer Update"
            response_body["trainer update"] = trainer.serialize()
            return response_body, 200
    response_body['message'] = 'Not allowed!'
    return response_body, 405


# Mostrar, borrar o modificar admin
@api.route('/administrators/<int:id>', methods=["GET", "DELETE", "PATCH"])
@jwt_required()
def handle_administrator(id):
    response_body = {}
    current_user = get_jwt_identity()
    administrator = Administrators.query.get(id)
    if not administrator:
        response_body["message"] = "Admin not found"
        return response_body, 404
    if (current_user['role'] == 'administrators' and current_user['id'] == id) or (current_user['role'] == 'administrators'):
        if request.method == "GET":
            response_body["message"] = "Admin found"
            response_body["administrator"] = administrator.serialize()
            return response_body, 200
        if request.method == "DELETE":
            db.session.delete(administrator)
            db.session.commit()
            response_body["message"] = "Admin delete"
            response_body["delete administrator"] = administrator.serialize()
            return response_body, 200
        if request.method == "PATCH":
            data = request.json
            if not data:
                response_body["message"] = "No data provided for update"
            if 'password' in data:
                hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
                administrator.password = hashed_password
            db.session.add(administrator)
            db.session.commit()
            response_body["message"] = "Admin Update"
            response_body["administrator update"] = administrator.serialize()
            return response_body, 200   
    response_body['message'] = 'Not allowed!'
    return response_body, 405 


# Mostrar y crear classes user
@api.route('/users/<int:id>/classes', methods=["GET", "POST"]) 
@jwt_required()
def handle_user_classes(id):  
    response_body = {}
    user = Users.query.get(id)
    current_user = get_jwt_identity()
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
    if (current_user['role'] == 'users' and current_user['id'] == user.id) or (current_user["role"] == "administrators"):
        if request.method == "GET":
            user_classes = UsersClasses.query.filter_by(user_id=id).all()
            if not user_classes:
                response_body["message"] = "No classes available"
                return response_body, 400
            response_body["message"] = "User classes"
            response_body["result"] = [class_user.serialize() for class_user in user_classes]
            return response_body, 200
        if request.method == "POST":
            data = request.json
            if not data:
                response_body["message"] = "No data provided for class creation"
                return response_body, 400
            required_fields = ['amount', 'class_id']
            if not request.json or not all(field in request.json for field in required_fields):
                response_body["message"] = "Missing required fields in the request."
                return response_body, 400
            existing_class = db.session.query(UsersClasses).filter_by(class_id = data['class_id']).first()
            if existing_class:
                response_body["message"] = "User class already exist"
                return response_body, 409
            trainer_class = TrainersClasses.query.filter_by(id = data["class_id"]).first()
            if not trainer_class:
                response_body["message"] = "No Trainer class available"
                return response_body, 404
            new_class = UsersClasses(amount=data["amount"], 
                                     stripe_status="Cart", 
                                     trainer_status="Pending", 
                                     value=0,
                                     user_id=id,
                                     class_id=data["class_id"])
            db.session.add(new_class)
            db.session.commit()
            response_body["message"] = "Class added"
            response_body["class"] = new_class.serialize()
            return response_body, 201
    response_body["message"] = 'Not allowed!'
    return response_body, 405


# Mostrar y crear classes trainer
@api.route('/trainers/<int:id>/classes', methods=["GET", "POST"])
@jwt_required()
def handle_trainer_classes(id):
    response_body = {}
    current_user = get_jwt_identity()
    trainer = Trainers.query.get(id)
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
    if request.method == "GET":
        trainer_classes = TrainersClasses.query.filter_by(trainer_id=id).all()
        if not trainer_classes:
            response_body["message"] = "Trainer has no classes available"
            return response_body, 400
        response_body["message"] = "Trainer classes"
        response_body["Trainer classes"] = [class_trainer.serialize() for class_trainer in trainer_classes]
        return response_body, 200
    if request.method == "POST":
        # if (current_user['role'] == 'trainers' and current_user['id'] == trainer.id) or (current_user["role"] == "administrators"):
        data = request.json
        print(data)
        if not data:
            response_body["message"] = "No data provided"
            return response_body, 400
        required_fields = ['city', 'postal_code', 'street_name', 'street_number', 'capacity', 'start_date', 'end_date', 'price', 'training_type', 'training_level']
        if not request.json or not all(field in request.json for field in required_fields):
            response_body["message"] = "Missing required fields in the request."
            return response_body, 400
        # try:
            # start_date = datetime.strptime(data['start_date'], '%Y-%m-%dT%H:%M')
            # end_date = datetime.strptime(data['end_date'], '%Y-%m-%dT%H:%M')
        # except ValueError:
            # response_body["message"] = "Invalid datetime format. Use format: YYYY-MM-DDTHH:MM"
            # return response_body, 400
        if data['training_level'] not in ['Beginner', 'Intermediate', 'Advanced']:
            response_body["message"] = "Invalid training level"
            response_body["training_level available"] = ["Beginner", "Intermediate", "Advanced"]
            return response_body, 400
        trainers_specializations = db.session.query(TrainersSpecializations).filter_by(trainer_id = id, specialization_id = data["training_type"]).all()
        if not trainers_specializations:
            response_body["message"] = f"Training type no available for the trainer with id: {str(id)}"
            return response_body, 400
        existing_class = db.session.query(TrainersClasses).filter(db.or_(db.and_(TrainersClasses.start_date >= data['start_date'], TrainersClasses.start_date < data['end_date']),
                                                                            db.and_(TrainersClasses.end_date > data['start_date'], TrainersClasses.end_date <= data['end_date']),
                                                                            db.and_(TrainersClasses.start_date <= data['start_date'], TrainersClasses.end_date >= data['end_date']))).first()
        if existing_class:
            response_body["message"] = "Trainer class already exists for this datetime"
            return response_body, 400
        new_trainer_class = TrainersClasses(trainer_id=id, 
                                            city=data["city"], 
                                            postal_code=data["postal_code"],
                                            street_name=data["street_name"],
                                            street_number=data["street_number"],
                                            additional_info=data.get("additional_info"),
                                            capacity=data["capacity"], 
                                            start_date=data["start_date"],
                                            end_date=data["end_date"],
                                            price=data["price"],
                                            training_type=data["training_type"],
                                            training_level=data["training_level"])
        db.session.add(new_trainer_class)
        db.session.commit()
        response_body["message"] = "New class create"
        response_body["class"] = new_trainer_class.serialize()
        return response_body, 201
        # response_body["message"] = 'Not allowed!'
        # return response_body, 405
        

# Mostrar, crear, borrar clase trainer
@api.route('/trainers/<int:id>/classes/<int:class_id>', methods=["GET", "DELETE", "PATCH"])
@jwt_required()
def handle_trainer_class(id, class_id): 
    response_body = {}
    trainer = Trainers.query.get(id)
    current_user = get_jwt_identity()
    if not trainer: 
        response_body["message"] = "Trainer not found"
        return response_body, 404
    trainer_class = TrainersClasses.query.filter(TrainersClasses.trainer_id == id, TrainersClasses.id == class_id).first()
    if not trainer_class:
            response_body["message"] = "Class doesn't exist"
            return response_body, 404
    if request.method == "GET":
        response_body["message"] = "Trainer class"
        response_body["class"] = trainer_class.serialize()
        return response_body, 200
    if (current_user['role'] == 'trainers' and current_user['id'] == trainer.id) or (current_user["role"] == "administrators"):
        if request.method == "DELETE":
            classes_user = UsersClasses.query.filter_by(class_id=class_id).all()
            if classes_user:
                response_body["message"] = "Unable to delete class, it has associated users"
                return response_body, 400
            db.session.delete(trainer_class)
            db.session.commit()
            response_body["message"] = "Class deleted successfully"
            response_body["class"] = trainer_class.serialize()
            return response_body, 200
        if request.method == "PATCH":
            data = request.json
            if not data:
                response_body["message"] = "No data provided for update"
                return response_body, 400
            if 'city' in data:
                trainer_class.city = data["city"]
            if 'postal_code' in data:
                trainer_class.postal_code = data["postal_code"]
            if 'street_name' in data:
                trainer_class.street_name = data["street_name"]
            if 'street_number' in data:
                trainer_class.street_number = data["street_number"]
            if 'additional_info' in data:
                trainer_class.additional_info = data["additional_info"]
            if 'start_date' in data:
                trainer_class.start_date = data["start_date"]
            if 'end_date' in data:
                trainer_class.end_date = data["end_date"]
            if 'price' in data:
                trainer_class.price = data["price"]
            db.session.add(trainer_class)
            db.session.commit()
            response_body["message"] = "Class updated"
            response_body["result"] = trainer_class.serialize()
            return response_body, 200
    response_body["message"] = 'Not allowed!'
    return response_body, 405


# Mostrar, crear, borrar clase user
@api.route('/users/<int:id>/classes/<int:class_id>', methods=["GET", "DELETE"])
@jwt_required()
def handle_user_class(id, class_id):
    response_body = {}
    user = Users.query.get(id)
    current_user = get_jwt_identity()
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
    if (current_user['role'] == 'users' and current_user['id'] == user.id) or (current_user["role"] == "administrators"):
        user_class = UsersClasses.query.filter_by(user_id=id, class_id=class_id).first()
        if not user_class:
            response_body["message"] = "User class not found"
            return response_body, 404
        trainer_class = TrainersClasses.query.get(class_id)
        if not trainer_class:
            response_body["message"] = "Class doesn't exist"
            return response_body, 404
        if request.method == "GET":
            response_body["message"] = "User class"
            response_body["class"] = trainer_class.serialize()
            return response_body, 200
        if request.method == "DELETE":
            db.session.delete(user_class)
            db.session.commit()
            response_body["message"] = "User unenrolled successfully"
            response_body["class"] = trainer_class.serialize()
            return response_body, 200
    response_body["message"] = 'Not allowed!'
    return response_body, 405


# Mostrar y crear especializaciones para trainer
@api.route('/trainers/<int:id>/specializations', methods=['GET','POST'])
@jwt_required()
def handle_trainer_specializations(id):
    response_body = {}
    current_user = get_jwt_identity()
    trainer = db.session.query(Trainers).filter_by(id = id).first()
    if not trainer:
        response_body['message'] = f'No trainer with trainer id {str(id)} found!'
        return response_body,404
    if (current_user['role'] == 'trainers' and current_user['id'] == id) or (current_user['role'] == 'administrators'):
        if request.method == 'GET':
            trainers_specializations = db.session.query(TrainersSpecializations).filter_by(trainer_id = id).all()
            if not trainers_specializations:
                response_body['message'] = 'No specializations for trainer id: ' + str(id)
                return response_body, 404
            response_body['message'] = 'Specializations for trainer ' + str(id)
            response_body['results'] = [spec.serialize() for spec in trainers_specializations]
            return response_body,200
        if request.method == 'POST':
            data = request.json
            if not data:
                response_body["message"] = "No data provided"
                return response_body, 400
            required_fields = ['certification', 'specialization_id']
            if not request.json or not all(field in request.json for field in required_fields):
                response_body["message"] = "Missing required fields in the request."
                return response_body, 400
            specialization = db.session.query(Specializations).filter_by(id = data['specialization_id']).first()
            if not specialization:
                response_body['message'] = 'Specialization with id ' + data['specialization_id'] + ' does not exist!'
                return response_body, 404
            trainer_specialization = db.session.query(TrainersSpecializations).filter_by(specialization_id = data['specialization_id']).first()
            if trainer_specialization:
                response_body['message'] = 'Specialization with id ' + data['specialization_id'] + ' already exist!'
                return response_body, 404
            new_trainer_specialization = TrainersSpecializations(certification = data['certification'],
                                                                 status = "Requested",
                                                                 specialization_id = data['specialization_id'],  
                                                                 trainer_id = id)
            db.session.add(new_trainer_specialization)
            db.session.commit()
            response_body['message'] = 'New specialization connected with trainer ' + str(id)
            response_body['results'] = new_trainer_specialization.serialize()
            return response_body,201
    response_body['message'] = 'Not allowed!'
    return response_body, 405


# Borrar una especializacion de un entrenador
@api.route('/trainers/<int:id>/specializations/<int:specialization_id>', methods=["GET", 'DELETE'])
@jwt_required()
def handle_trainer_specialization(id, specialization_id):
    response_body = {}
    current_user = get_jwt_identity()
    trainer = db.session.query(Trainers).filter_by(id = id).first()
    if not trainer:
        response_body['message'] = f'No trainer with id {str(id)} found!'
        return response_body, 404
    if (current_user['role'] == 'trainers' and current_user['id'] == id) or (current_user['role'] == 'administrators'):
        trainer_specializations = db.session.query(TrainersSpecializations).filter_by(trainer_id = id).all()
        if not trainer_specializations:
            response_body['message'] = f'No specializations for trainer id: {str(id)}'
            return response_body, 404
        trainer_specialization = db.session.query(TrainersSpecializations).filter_by(trainer_id = id, specialization_id = specialization_id).first()
        if not trainer_specialization:
            response_body["message"] = f"No specialization with id: {str(specialization_id)} for the trainer with id: {str(id)}"
            return response_body, 404
        if request.method == 'GET':
            response_body["message"] = "Trainer Specialization"
            response_body["result"] = trainer_specialization.serialize()
            return response_body, 200
        if request.method == "DELETE":
            db.session.delete(trainer_specialization)
            db.session.commit()
            response_body["message"] = "Specialization deleted"
            response_body["result"] = trainer_specialization.serialize()
            return response_body, 200
    response_body["message"] = 'Not allowed!'
    return response_body, 405


# Modificar y cancelar una specialization
@api.route('/specializations/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
@jwt_required()
def handle_specialization(id):
    response_body = {}
    current_user = get_jwt_identity()
    specialization = db.session.query(Specializations).filter_by(id=id).first()
    if not specialization:
        response_body['message'] = f'No specialization found with id: {str(id)}!'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Specialization details.'
        response_body['results'] = specialization.serialize()
        return response_body, 200
    if not current_user['role'] == 'administrators':
        response_body['message'] = 'Not allowed!'
        return response_body, 405
    if request.method == 'PATCH':
        data = request.json
        if not data:
            response_body['message'] = 'Please provide the information to update'
            return response_body, 400
        if data['name']:
            specialization.name = data['name']
        if data['description']:
            specialization.description = data['description']
        if data['logo_url']:
            specialization.logo_url = data['logo_url']
        db.session.add(specialization)
        db.session.commit()
        response_body['message'] = 'Specialization updated successfully!'
        response_body['results'] = {'Updated specialization data': specialization.serialize()}
        return response_body,200
    if request.method == 'DELETE':
        trainer_specialization = db.session.query(TrainersSpecializations). filter_by(specialization_id=id).first()
        if trainer_specialization:
            response_body['message'] = 'Specialization connected with trainer cannot be deleted!'
            return response_body,400
        db.session.delete(specialization)
        db.session.commit()
        response_body['message'] = f'Specialization with id: {str(id)}, successfully deleted'
        return response_body, 200