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


@api.route('/specializations', methods=["GET", "POST"])
def handle_specializations():
    response_body = {}
    specializations = db.session.query(Specializations).all()
    if request.method == "GET":
        if not specializations:
            response_body["message"] = "No specializations available"
            return response_body, 404
        response_body["message"] = "Specializations available"
        response_body["specializations"] = [specialization.serialize() for specialization in specializations]
        return response_body, 200
    if request.method == "POST":
        data = request.json
        new_specialization = Specializations( 
            name=data["name"], 
            description=data["description"], 
            logo_url=data["logo_url"]
        )
        if any(specialization.name == data["name"] for specialization in specializations):
            response_body["message"] = "Specialization already exists"
            return response_body, 400
        db.session.add(new_specialization)
        db.session.commit()
        response_body["message"] = "Specialization created"
        response_body["specialization"] = new_specialization.serialize()
        return response_body, 201


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
            

@api.route('/trainers/<int:id>/classes', methods=["GET", "POST"])
def handle_trainer_classes(id):
    response_body = {}
    trainer = Trainers.query.get(id)
    classes_trainer = TrainersClasses.query.filter_by(trainer_id=id).all()
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
    else:
        if request.method == "GET":
            if not classes_trainer:
                response_body["message"] = "Trainer has no classes available"
                return response_body, 400
            response_body["message"] = "Trainer classes"
            response_body["Trainer classes"] = [class_trainer.serialize() for class_trainer in classes_trainer]
            return response_body, 200
        if request.method == "POST":
            data = request.json
            existing_class = db.session.query(TrainersClasses).filter_by(date = data['date']).first()
            if existing_class:
                response_body["message"] = "Trainer class already exists for this datetime"
                return response_body, 400
            new_trainer_class = TrainersClasses(
                trainer_id=id, 
                address=data["address"], 
                capacity=data["capacity"], 
                duration=data["duration"],
                date=data["date"],
                price=data["price"],
                training_type=data["training_type"],
                training_level=data["training_level"]
            )
            db.session.add(new_trainer_class)
            db.session.commit()
            response_body["message"] = "New class create"
            response_body["new class"] = new_trainer_class.serialize()
            return response_body, 201


@api.route('/users/<int:id>/classes', methods=["GET", "POST"]) 
def handle_user_classes(id):  
    response_body = {}
    user = Users.query.get(id)
    classes_user = UsersClasses.query.filter_by(user_id=id).all()
    classes_trainer = TrainersClasses.query.get(id)
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
    else:
        if request.method == "GET":
            if not classes_trainer:
                response_body["message"] = "No trainer classes available"
                return response_body, 400
            if not classes_user:
                response_body["message"] = "No classes available"
                return response_body, 400
            response_body["message"] = "User classes"
            response_body["classes"] = [class_user.serialize() for class_user in classes_user]
            return response_body, 200
        if request.method == "POST":
            # Verificar si hay clases de entrenadores disponibles
            data = request.json
            if not data:
                response_body["message"] = "No data provided for class creation"
                return response_body, 400
            # Aquí verifica si la clase proporcionada por el usuario es una clase de entrenador disponible
            existing_class = db.session.query(UsersClasses).filter_by(class_id = data['class_id']).first()
            if existing_class:
                response_body["message"] = "User class already exist"
                return response_body, 400
            trainer_class = TrainersClasses.query.filter_by(id = data["class_id"]).first()
            if not trainer_class:
                response_body["message"] = "No Trainer class available"
                return response_body, 404
            new_class = UsersClasses(
                amount=data["amount"], 
                stripe_status=data["stripe_status"], 
                trainer_status=data["trainer_status"], 
                value=0,
                user_id=id,
                class_id=data["class_id"]
            )
            db.session.add(new_class)
            db.session.commit()
            response_body["message"] = "Class added"
            response_body["class"] = new_class.serialize()
            return response_body, 201

 



