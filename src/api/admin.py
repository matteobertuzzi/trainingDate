import os
from flask_admin import Admin
from .models import db, Users, Trainers, Administrator, Specializations, TrainersClasses, UsersClasses, TrainersSpecializations
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Trainers, db.session))
    admin.add_view(ModelView(Administrator, db.session))
    admin.add_view(ModelView(Specializations, db.session))
    admin.add_view(ModelView(TrainersClasses, db.session))
    admin.add_view(ModelView(UsersClasses, db.session))
    admin.add_view(ModelView(TrainersSpecializations, db.session))
    
 

    