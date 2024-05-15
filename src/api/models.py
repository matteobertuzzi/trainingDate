from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False)
    last_name = db.Column(db.String(100), unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    city = db.Column(db.String(120), unique=False, nullable=False)
    postal_code = db.Column(db.Integer, unique=False, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(20), unique=False)
    gender = db.Column(db.Enum("Male", "Female", "Not Specified", name="gender"), nullable=False)
    stripe_customer_id = db.Column(db.String(), unique=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def __repr__(self):
        return f'<User: {self.id} - Email: {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'email': self.email,
                'city': self.city,
                'postal_code': self.postal_code,
                'phone_number': self.phone_number,
                'gender': self.gender,
                'stripe_customer_id': self.stripe_customer_id,
                'is_active': self.is_active}


class Trainers(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=False)
        last_name = db.Column(db.String(100), unique=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        city = db.Column(db.String(120), unique=False, nullable=False)
        postal_code = db.Column(db.Integer, unique=False, nullable=False)
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
        stripe_account_id = db.Column(db.String(), unique=True)
        is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

        def __repr__(self):
            return f'<Trainer: {self.id} - Email: {self.email}>'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'last_name': self.last_name,
                    'email': self.email,
                    'city': self.city,
                    'postal_code': self.postal_code,
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
        is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

        def __repr__(self):
           return f'<Admin: {self.id} - Name: {self.name} - Email: {self.email}>'

        def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'email': self.email,
                    'is_active': self.is_active}


class Specializations(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(100), unique=True, nullable=False)
        description = db.Column(db.String(250))
        logo_url = db.Column(db.String())

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
        class_name = db.Column(db.String(120), unique=False, nullable=True)
        class_details = db.Column(db.String(200), unique=False, nullable=True)
        city = db.Column(db.String(120), unique=False, nullable=False)
        postal_code = db.Column(db.Integer, unique=False, nullable=False)
        street_name = db.Column(db.String(120), unique=False, nullable=False)
        street_number = db.Column(db.Integer, unique=False, nullable=False)
        additional_info = db.Column(db.String(255),unique=False, nullable=True)
        capacity = db.Column(db.Integer, unique=False, nullable=False)
        start_date = db.Column(db.DateTime, unique=False, nullable=False)
        end_date = db.Column(db.DateTime, unique=False, nullable=False)
        price = db.Column(db.Integer, unique=False, nullable=False)
        training_level = db.Column(db.Enum("Beginner", "Intermediate", "Advanced", name="training_level"), unique=False)
        training_type = db.Column(db.Integer, db.ForeignKey("specializations.id"))
        specializations = db.relationship("Specializations", foreign_keys=[training_type])
        trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
        trainer = db.relationship('Trainers', backref=db.backref('classes', lazy=True))
        stripe_product_id = db.Column(db.String(), unique=True)
        stripe_price_id = db.Column(db.String(), unique=True) 

        def __repr__(self):
           return f'<Trainer Class: {self.id} - Trainer: {self.trainer_id}>'

        def serialize(self):
            return {'id': self.id,
                    'class_name': self.class_name,
                    'class_details': self.class_details,
                    'trainer': self.trainer_id,
                    'city': self.city,
                    'postal_code': self.postal_code,
                    'street_name': self.street_name,
                    'street_number': self.street_number,
                    'additional_info': self.additional_info,
                    'capacity': self.capacity,
                    'start_date': self.start_date,
                    'end_date': self.end_date,
                    'price': self.price,
                    'training_type': self.training_type,
                    'training_level': self.training_level,
                    "stripe_product_id": self.stripe_product_id,
                    "stripe_price_id": self.stripe_price_id}
    

class UsersClasses(db.Model):
        __tablename__ = "users_classes"
        id = db.Column(db.Integer, primary_key=True)
        amount = db.Column(db.Integer, unique=False, nullable=False)
        stripe_status = db.Column(db.Enum("Cart", "Paid", "Reject", name="stripe_status"), nullable=False)
        trainer_status = db.Column(db.Enum("Paid", "Pending", name="trainer_status"), nullable=False)
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



