from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    username = db.Column(db.String(100), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    training_level = db.Column(db.Enum("Beginner", "Intermediate", "Advanced", name="training_level"), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User: {self.id} - Name: {self.name} - Last Name: {self.last_name} - Username: {self.username} - Email: {self.email} - Address: {self.address} - Phone Number: {self.phone_number} - Training Level: {self.training_level}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'username': self.username,
                'email': self.email,
                'address': self.address,
                'phone_number': self.phone_number,
                'training_level': self.training_level,
                'is_active': self.is_active,
                }


class Trainers(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=False, nullable=False)
        last_name = db.Column(db.String(100), unique=False, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        address = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(80), unique=False, nullable=False)
        phone_number = db.Column(db.Integer, unique=True, nullable=False)
        website_url = db.Column(db.String(100), unique=False, nullable=True)
        instagram_url = db.Column(db.String(100), unique=False, nullable=True)
        facebook_url = db.Column(db.String(100), unique=False, nullable=True)
        x_url = db.Column(db.String(100), unique=False, nullable=True)
        certification = db.Column(db.String(255), unique=True, nullable=False)  # Almacena la ruta del archivo de la imagen
        bank_iban = db.Column(db.String(34), unique=True, nullable=False)
        vote_user = db.Column(db.Integer, nullable=True)
        sum_value = db.Column(db.Integer, nullable=True)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False)

        def __repr__(self):
            return f'<Trainer: {self.id} - Name: {self.name} - Last Name: {self.last_name} - Email: {self.email} - Address: {self.address} - Phone Number: {self.phone_number} - Certification: {self.certification} - Value: {self.sum_value}'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'last_name': self.last_name,
                    'email': self.email,
                    'address': self.address,
                    'phone_number': self.phone_number,
                    'certification': self.certification,
                    # 'iban' : self.bank_iban ?? Tenemos que ponerlo?
                    'value': self.sum_value,
                    'is_active': self.is_active,
                    }


class Administrator(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=False, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(80), unique=False, nullable=False)

        def __repr__(self):
           return f'<Admin: {self.id} - Name: {self.name} - Email: {self.email}'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'email': self.email,
                    }


class Specializations(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=True, nullable=False)
        description = db.Column(db.String(250), nullable=False)
        logo_url = db.Column(db.String(255), unique=True, nullable=False)

        def __repr__(self):
           return f'<Specialization: {self.id} - Name: {self.name} - Description: {self.email} - Logo: {self.logo_url}'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'description': self.description,
                    'logo': self.logo_url
                    }


class TrainersClasses(db.Model):
        __tablename__= "trainers_classes"
        id = db.Column(db.Integer, primary_key=True)
        trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
        # Establece una relación bidireccional entre Trainers y TrainersClasses, donde puedo acceder a las clases asociadas a un entrenador utilizando trainer.classes
        trainer = db.relationship('Trainers', backref=db.backref('classes', lazy=True)) 
        address = db.Column(db.String(100), unique=False, nullable=False)
        capacity = db.Column(db.Integer, unique=False, nullable=False)
        duration = db.Column(db.Integer, unique=False, nullable=False)
        date = db.Column(db.DateTime, unique=True, nullable=False)
        price = db.Column(db.Integer, unique=False, nullable=False)
        training_type = db.Column(db.Integer, db.ForeignKey("specializations.id"))
        specialization = db.relationship(("Specializations"), foreign_keys=[training_type])
        training_level = db.Column(db.Enum("Beginner", "Intermediate", "Advanced", name="training_level"), unique=False, nullable=False)

        def __repr__(self):
           return f'<Trainer Class: {self.id} - Trainer: {self.trainer_id} - Address: {self.address} - Capacity: {self.capacity} - Durations: {self.duration} - Date: {self.date} - Price: {self.price} - Training Type: {self.training_type} - Training Level: {self.training_level}'

        def serialize(self):
            return {'id': self.id,
                    'trainer': self.trainer_id,
                    'address': self.address,
                    'capacity': self.capacity,
                    'duration': self.duration,
                    'date': self.date,
                    'price': self.price,
                    'training_type': self.training_type,
                    'training_level': self.training_level
                    }
    

class UsersClasses(db.Model):
        __tablename__ = "users_classes"
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
        user = db.relationship("Users", foreign_keys=[user_id])
        class_id = db.Column(db.Integer, db.ForeignKey("trainers_classes.id")) 
        training_class = db.relationship("TrainersClasses", foreign_keys=[class_id])
        amount = db.Column(db.Integer, unique=False, nullable=False)
        stripe_status = db.Column(db.Enum("Cart", "Paid", "Reject", name="stripe_status"), nullable=False)
        trainer_status = db.Column(db.Enum("Paid", "Pending", name=" trainer_status"), nullable=False)
        value = db.Column(db.Boolean, nullable=True)

        def __repr__(self):
           return f'<User Class: {self.id} - User: {self.user_id} - Class: {self.class_id} - Amount: {self.amount} - Stripe Status: {self.stripe_status} - Trainer Status: {self.trainer_status}'

        def serialize(self):
            return {'id': self.id,
                    'user': self.user_id,
                    'class': self.class_id,
                    'amount': self.amount,
                    'stripe_status': self.stripe_status,
                    'trainer_status': self.trainer_status
                    }


class TrainersSpecializations(db.Model):
        __tablename__= "trainers_specializations"
        id = db.Column(db.Integer, primary_key=True)
        specialization_id = db.Column(db.Integer, db.ForeignKey("specializations.id"))  
        specialization = db.relationship("Specializations", foreign_keys=[specialization_id])  
        trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
        trainer = db.relationship(("Trainers"), foreign_keys=[trainer_id])
        certification = db.Column(db.String(255), unique=True, nullable=False)
        status = db.Column(db.Enum("Requested", "Approved", "Rejected", name="status"), nullable=False)
        
        def __repr__(self):
           return f'<Trainer Specialization: {self.id} - Specialization: {self.specialization_id} - Trainer: {self.trainer_id} - Certification: {self.certification} - Status: {self.status}'

        def serialize(self):
            return {'id': self.id,
                    'specialization': self.specialization_id,
                    'trainer': self.trainer_id,
                    'certification': self.certification,
                    'status': self.status,
                    }