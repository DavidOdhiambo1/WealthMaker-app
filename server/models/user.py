from server.database import db 
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from sqlalchemy.orm import validates

from sqlalchemy.ext.associationproxy import association_proxy

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ( '-holdings.user', '-goals.user',)
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationships
   
    holdings = db.relationship('Holding', back_populates='user', cascade="all, delete-orphan")
    goals = db.relationship('Goal', back_populates='user', cascade="all, delete-orphan")
    

    @validates('full_name')
    def validate_full_name(self, _, value):
        value = value.strip()
        if not value or len(value) < 3:
            raise ValueError("Full name must be at least 3 characters long.")
        return value
    
 

    @validates('email')
    def validate_email(self, _, value):
        value = value.strip()
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email format.")
        return value

    def __repr__(self):
        return f"<User id={self.id}, username='{self.username}', email='{self.email}'>"