"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Trainers, Administrators, Specializations, TrainersClasses, UsersClasses, TrainersSpecializations
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
# Extension para enviar un correo al querer cambiar la password en el caso de haberla olvidado
from flask_mail import Mail
# Extension para encriptar las password
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API
mail = Mail()
bcrypt = Bcrypt()


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
def handle_signup_admin():
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


@api.route('/trainers/<int:id>', methods=["GET", "DELETE", "PATCH"])
def handle_trainer(id):
    response_body= {}
    trainer = Trainers.query.get(id)
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
    else:
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
                trainer.password = data["password"]
            if "address" in data:
                trainer.address = data["address"]
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
            

@api.route('/users/<int:id>/classes', methods=["GET", "POST"]) 
def handle_user_classes(id):  
    response_body = {}
    user = Users.query.get(id)
    classes_user = UsersClasses.query.filter_by(user_id=id).all()
    train_classes = db.session.query(TrainersClasses).join(UsersClasses, UsersClasses.class_id == TrainersClasses.id).all()
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
    else:
        if request.method == "GET":
            if not classes_user:
                response_body["message"] = "No classes available"
                return response_body, 400
            response_body["message"] = "User classes"
            response_body["classes"] = [class_user.serialize() for class_user in classes_user]
            return response_body, 200
        if request.method == "POST":
            # Verificar si hay clases de entrenadores disponibles
            if not train_classes:
                response_body["message"] = "No trainer classes available"
                return response_body, 400
            data = request.json
            if not data:
                response_body["message"] = "No data provided for class creation"
                return response_body, 400
            # Aquí verifica si la clase proporcionada por el usuario es una clase de entrenador disponible
            class_id = data.get("class_id") 
            if class_id not in [train_class.id for train_class in train_classes]:
                response_body["message"] = "Invalid trainer class ID"
                return response_body, 400
            new_class = UsersClasses(
                amount=data["amount"], 
                stripe_status=data["stripe_status"], 
                trainer_status=data["trainer_status"], 
                value=0,
                user_id=id,
                class_id=class_id
            )
            db.session.add(new_class)
            db.session.commit()
            response_body["message"] = "Class added"
            response_body["class"] = new_class.serialize()
            return response_body, 201

 



