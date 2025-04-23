from database import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone


class Goal(db.Model, SerializerMixin):
    """Goal model to track financial goals."""
    __tablename__ = 'goals'

    serialize_rules = ('-user.goals',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)  # Name of the goal, e.g., "Buy a house"
    target_amount = db.Column(db.Float, nullable=False)  # Target amount for the goal
    current_amount = db.Column(db.Float, default=0.0)  # Current amount saved towards the goal
    deadline = db.Column(db.DateTime, nullable=False)  # Deadline for achieving the goal
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())  # Timestamp when the goal was created

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='goals')

    def __repr__(self):
        return f"<Goal(id={self.id}, name='{self.name}', target_amount={self.target_amount}, current_amount={self.current_amount}, deadline={self.deadline})>"