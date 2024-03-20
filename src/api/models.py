from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False)
    last_name = db.Column(db.String(100), unique=False)
    address = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(20), unique=False)
    gender = db.Column(db.Enum("Male", "Female", "Not Specified", name="gender"), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User: {self.id} - Email: {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'email': self.email,
                'address': self.address,
                'phone_number': self.phone_number,
                'gender': self.gender,
                'is_active': self.is_active}


class Trainers(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=False)
        last_name = db.Column(db.String(100), unique=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        address = db.Column(db.String(120), unique=False)
        password = db.Column(db.String(80), unique=False, nullable=False)
        phone_number = db.Column(db.String(20), unique=False)
        gender = db.Column(db.Enum("Male", "Female", "Not Specified", name="gender"), nullable=False)
        website_url = db.Column(db.String(100), unique=False)
        instagram_url = db.Column(db.String(100), unique=False)
        facebook_url = db.Column(db.String(100), unique=False)
        x_url = db.Column(db.String(100), unique=False)
        bank_iban = db.Column(db.String(34), unique=False, nullable=False)
        vote_user = db.Column(db.Integer)
        sum_value = db.Column(db.Integer)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False)

        def __repr__(self):
            return f'<Trainer: {self.id} - Email: {self.email}>'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'last_name': self.last_name,
                    'email': self.email,
                    'address': self.address,
                    'phone_number': self.phone_number,
                    'gender': self.gender,
                    'website_url': self.website_url,
                    'instagram_url': self.instagram_url,
                    'facebook_url': self.facebook_url,
                    'x_url': self.x_url,
                    'iban' : self.bank_iban,
                    'value': self.sum_value,
                    'is_active': self.is_active}


class Administrators(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=False, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(80), unique=False, nullable=False)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False)

        def __repr__(self):
           return f'<Admin: {self.id} - Name: {self.name} - Email: {self.email}>'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'email': self.email,
                    'isactive': self.is_active}


class Specializations(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=True, nullable=False)
        description = db.Column(db.String(250))
        logo_url = db.Column(db.String(255))

        def __repr__(self):
           return f'<Specialization: {self.id} - Name: {self.name}>'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'description': self.description,
                    'logo': self.logo_url}


class TrainersClasses(db.Model):
        __tablename__= "trainers_classes"
        id = db.Column(db.Integer, primary_key=True)
        address = db.Column(db.String(100), unique=False, nullable=False)
        capacity = db.Column(db.Integer, unique=False, nullable=False)
        duration = db.Column(db.Integer, unique=False)
        date = db.Column(db.DateTime, unique=False, nullable=False)
        price = db.Column(db.Integer, unique=False, nullable=False)
        training_level = db.Column(db.Enum("Beginner", "Intermediate", "Advanced", name="training_level"), unique=False)
        training_type = db.Column(db.Integer, db.ForeignKey("specializations.id"))
        specialization = db.relationship("Specializations", foreign_keys=[training_type])
        trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
        trainer = db.relationship('Trainers', backref=db.backref('classes', lazy=True)) 

        def __repr__(self):
           return f'<Trainer Class: {self.id} - Trainer: {self.trainer_id}>'

        def serialize(self):
            return {'id': self.id,
                    'trainer': self.trainer_id,
                    'address': self.address,
                    'capacity': self.capacity,
                    'duration': self.duration,
                    'date': self.date,
                    'price': self.price,
                    'training_type': self.training_type,
                    'training_level': self.training_level}
    

class UsersClasses(db.Model):
        __tablename__ = "users_classes"
        id = db.Column(db.Integer, primary_key=True)
        amount = db.Column(db.Integer, unique=False, nullable=False)
        stripe_status = db.Column(db.Enum("Cart", "Paid", "Reject", name="stripe_status"), nullable=False)
        trainer_status = db.Column(db.Enum("Paid", "Pending", name=" trainer_status"), nullable=False)
        value = db.Column(db.Boolean())
        user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
        user = db.relationship("Users", foreign_keys=[user_id])
        class_id = db.Column(db.Integer, db.ForeignKey("trainers_classes.id")) 
        training_class = db.relationship("TrainersClasses", foreign_keys=[class_id])

        def __repr__(self):
           return f'<User Class: {self.id} - User: {self.user_id} - Class: {self.class_id}>'

        def serialize(self):
            return {'id': self.id,
                    'user': self.user_id,
                    'class': self.class_id,
                    'amount': self.amount,
                    'stripe_status': self.stripe_status,
                    'trainer_status': self.trainer_status}


class TrainersSpecializations(db.Model):
        __tablename__= "trainers_specializations"
        id = db.Column(db.Integer, primary_key=True)
        certification = db.Column(db.String(255), unique=True, nullable=False)
        status = db.Column(db.Enum("Requested", "Approved", "Rejected", name="status"), nullable=False)
        specialization_id = db.Column(db.Integer, db.ForeignKey("specializations.id"))  
        specialization = db.relationship("Specializations", foreign_keys=[specialization_id])  
        trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
        trainer = db.relationship("Trainers", foreign_keys=[trainer_id])
        
        def __repr__(self):
           return f'<Trainer Specialization: {self.id} - Specialization: {self.specialization_id} - Trainer: {self.trainer_id}>'

        def serialize(self):
            return {'id': self.id,
                    'specialization': self.specialization_id,
                    'trainer': self.trainer_id,
                    'certification': self.certification,
                    'status': self.status}


