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
# Extension para encriptar las password
from flask_bcrypt import Bcrypt
# Extension para enviar un correo al querer cambiar la password en el caso de haberla olvidado
from flask_mail import Mail


# TODO: Pasar token cada vez que un user o trainer quiera ver algo 

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API
bcrypt = Bcrypt()
mail = Mail()


# TODO: El get tiene que tener autenticacion
@api.route('/users', methods=['POST', 'GET'])
def handle_signup_user():
    response_body = {}
    if request.method == 'POST':
        data = request.json
        user = db.session.query(Users).filter_by(email=data["email"], password=data["password"]).first()
        if user:
            response_body["message"] = "User already exist!"
            return response_body, 401
        # TODO: Verificar si tiene todo
        password = data["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = Users(
            email=data["email"], 
            password=hashed_password, 
            name=data["name"], 
            last_name=data["last_name"],
            address=data["address"],
            phone_number=data["phone_number"],
            is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body["message"] = "User create successfully"
        response_body["user"] = new_user.serialize()
        # TODO: Generar el token para que se logee en automatico
        return response_body, 200
    if request.method == 'GET':
        users = db.session.query(Users).all()
        if not users:
            response_body['message'] = 'No users currently registered'
            return response_body,404
        response_body['message'] = 'Users currently registered'
        response_body['results'] = [single_user.serialize() for single_user in users]
        return response_body, 200

# TODO: El get tiene que tener autenticacion
@api.route('/trainers', methods=['POST', 'GET'])
def handle_signup_trainer():
    response_body = {}
    data = request.json
    if request.method == 'POST':
        trainer = db.session.query(Trainers).filter_by(email=data["email"], password=data["password"]).first()
        if trainer:
            response_body["message"] = "Trainer already exist!"
            return response_body, 401
        # TODO: Verificar si tiene todo
        password = data["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_trainer = Trainers(
            email=data["email"],
            password=hashed_password,
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
        response_body["trainer"] = new_trainer.serialize()
        # TODO: Generar el token para que se logee en automatico
        return response_body, 200
    if request.method == 'GET':
        trainers = db.session.query(Trainers).all()
        if not trainers:
            response_body['message'] = 'No trainers currently registered'
            return response_body,404
        response_body['message'] = 'Trainers currently registered'
        response_body['results'] = [single_trainer.serialize() for single_trainer in trainers]
        return response_body, 200


# TODO: El get tiene que tener autenticacion
@api.route('/administrators', methods=['POST', 'GET'])
def handle_admin_signup():
    response_body = {}
    if request.method == 'POST':
        data = request.json
        admin = db.session.query(Administrators).filter_by(email=data['email'], password=data["password"]).first()
        if admin:
            response_body['message'] = 'Admin already exists'
            return response_body, 401
        password = data["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_admin = Administrators(name=data['name'], email=data['email'], password=hashed_password, is_active=True)
        db.session.add(new_admin)
        db.session.commit()
        response_body['message'] = 'Admin successfully created!'
        response_body['results'] = new_admin.serialize()
        return response_body, 200
    if request.method == 'GET':
        admins = db.session.query(Administrators).all()
        if not admins:
            response_body['message'] = 'No administrators currently registered'
            return response_body,404
        response_body['message'] = 'Administrators currently registered'
        response_body['results'] = [single_admin.serialize() for single_admin in admins]
        return response_body, 200


# TODO: Hacer que el admin pueda crear specializaciones, aplicar token, para que las puedan ver entrenadores y admin
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
        # TODO: Comprobacion
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


# Endpoints unico para los login
@api.route('/login/<user_type>', methods=['POST'])
def handle_login(user_type):
    response_body = {}
    data = request.json
    if not user_type:
        response_body["message"] = "Insert user type"
        return response_body, 400
    if user_type == 'users':
        user = db.session.query(Users).filter_by(email=data['email']).first()
    if user_type == 'trainers':
        user = db.session.query(Trainers).filter_by(email=data['email']).first()
    if user_type == 'administrators':
        user = db.session.query(Administrators).filter_by(email=data['email']).first()
    else:
        response_body['message'] = 'Invalid user type'
        return response_body, 400
    password = data['password'] 
    if not user:
        response_body['message'] = f'{user_type.capitalize()} not found'
        return response_body, 401
    if not bcrypt.check_password_hash(user.password, password):
        response_body['message'] = f'Wrong password for email {user.email}'
        return response_body, 401
    access_token = create_access_token(identity=user.email)
    response_body['message'] = 'Successfully logged in!'
    response_body['results'] = {'email': user.email}
    response_body['access_token'] = access_token
    return response_body, 200


# New endpoint to handle protected route for users
@api.route("/users/protected", methods=["GET"])
@jwt_required()
def protected_user():
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    if not current_user:
        response_body['message'] = 'Acccess denied!'
        return response_body, 401
    response_body['message'] = jsonify(logged_in_as=current_user)
    return response_body, 200


# New endpoint to handle protected route for trainers
@api.route("/trainers/protected", methods=["GET"])
@jwt_required()
def protected_trainer():
    response_body = {}
    current_trainers= get_jwt_identity()
    print(current_trainers)
    if not current_trainers:
        response_body['message'] = 'Acccess denied!'
        return response_body, 401
    response_body['message'] = jsonify(logged_in_as=current_trainers)
    return response_body, 200


# New endpoint to handle protected route for administrators
@api.route("/administrators/protected", methods=["GET"])
@jwt_required()
def protected_admin():
    response_body = {}
    current_administrator= get_jwt_identity()
    print(current_administrator)
    if not current_administrator:
        response_body['message'] = 'Acccess denied!'
        return response_body, 401
    response_body['message'] = jsonify(logged_in_as=current_administrator)
    return response_body, 200


@api.route('/users/<int:id>', methods=["GET", "DELETE", "PATCH"])
def handle_user(id):
    response_body = {}
    user = Users.query.get(id)
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
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
        if 'password' in data:
            user.password = data["password"]
        if "address" in data:
            user.address = data["address"]
        if "phone_number" in data:
            user.phone_number = data["phone_number"]
        db.session.add(user)
        db.session.commit()
        response_body["message"] = "User Update"
        response_body["user update"] = user.serialize()
        return response_body, 200


@api.route('/trainers/<int:id>', methods=["GET", "DELETE", "PATCH"])
def handle_trainer(id):
    response_body= {}
    trainer = Trainers.query.get(id)
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
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


@api.route('/administrators/<int:id>', methods=["GET", "DELETE", "PATCH"])
def handle_administrator(id):
    response_body = {}
    administrator = Administrators.query.get(id)
    if not administrator:
        response_body["message"] = "Admin not found"
        return response_body, 404
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
            administrator.password = data["password"]
        db.session.add(administrator)
        db.session.commit()
        response_body["message"] = "Admin Update"
        response_body["administrator update"] = administrator.serialize()
        return response_body, 200    


@api.route('/users/<int:id>/classes', methods=["GET", "POST"]) 
def handle_user_classes(id):  
    response_body = {}
    user = Users.query.get(id)
    classes_user = UsersClasses.query.filter_by(user_id=id).all()
    classes_trainer = TrainersClasses.query.get(id)
    if not user:
        response_body["message"] = "User not found"
        return response_body, 404
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
        data = request.json
        if not data:
            response_body["message"] = "No data provided for class creation"
            return response_body, 400
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
            trainer_status="Pending", 
            value=0,
            user_id=id,
            class_id=data["class_id"]
        )
        db.session.add(new_class)
        db.session.commit()
        response_body["message"] = "Class added"
        response_body["class"] = new_class.serialize()
        return response_body, 201


@api.route('/trainers/<int:id>/classes', methods=["GET", "POST"])
def handle_trainer_classes(id):
    response_body = {}
    trainer = Trainers.query.get(id)
    classes_trainer = TrainersClasses.query.filter_by(trainer_id=id).all()
    if not trainer:
        response_body["message"] = "Trainer not found"
        return response_body, 404
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
        

@api.route('/trainers/<int:id>/classes/<int:classid>', methods=["GET", "DELETE", "PATCH"])
def handle_trainer_class(id, classid):
    response_body = {}
    trainer = Trainers.query.get(id)
    trainer_class = TrainersClasses.query.filter(TrainersClasses.trainer_id == id, TrainersClasses.id == classid).first()
    if not trainer: 
        response_body["message"] = "Trainer not found"
        return response_body, 404
    if not trainer_class:
            response_body["message"] = "Class doesn't exist"
            return response_body, 404
    if request.method == "GET":
        response_body["message"] = "Trainer class"
        response_body["class"] = trainer_class.serialize()
        return response_body, 200
    if request.method == "DELETE":
        # No hace cancelar las classes si hay usuarios apuntados a ella
        classes_user = UsersClasses.query.filter_by(class_id=classid).all()
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
        if 'address' in data:
            trainer_class.address = data["address"]
        if 'duration' in data:
            trainer_class.duration = data["duration"]
        if 'date' in data:
            trainer_class.date = data["date"]
        if 'price' in data:
            trainer_class.price = data["price"]
        db.session.add(trainer_class)
        db.session.commit()
        response_body["message"] = "Class update"
        response_body["result"] = trainer_class.serialize()
        return response_body, 200
            

@api.route('users/<int:id>/classes/<int:classid>', methods=["GET", "DELETE", "PATCH"])
def handle_user_class(id, classid):


# New endpoint to GET and CREATE TrainersSpecializations
@api.route('/trainers/<int:id>/specializations', methods=['GET','POST'])
def handle_trainers_specializations(id):
    response_body = {}
    trainer = db.session.query(Trainers).filter_by(id = id).first()
    if not trainer:
        response_body['message'] = f'No trainer with trainer id {id} found!'
        return response_body,404
    if request.method == 'GET':
        trainers_specializations = db.session.query(TrainersSpecializations).filter_by(trainer_id = id).all()
        if not trainers_specializations:
            response_body['message'] = 'No trainer specializations for trainer id ' + str(id)
            return response_body,404
        response_body['message'] = 'Trainer specializations for trainer ' + str(id)
        response_body['results'] = [spec.serialize() for spec in trainers_specializations]
        return response_body,200
    if request.method == 'POST':
        data = request.json
        specialization = db.session.query(Specializations).filter_by(id = data['specialization_id']).first()
        if not specialization:
            response_body['message'] = 'No specialization with id ' + data['specialization_id'] + ' !'
            return response_body, 404
        new_trainer_specialization = TrainersSpecializations(
            certification = data['certification'],
            status = "Requested",
            specialization_id = data['specialization_id'],  
            trainer_id = id
        )
        db.session.add(new_trainer_specialization)
        db.session.commit()
        response_body['message'] = 'New specialization connected with trainer ' + str(id)
        response_body['results'] = new_trainer_specialization.serialize()
        return response_body,201