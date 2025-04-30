from database import db
from sqlalchemy_serializer import SerializerMixin

class InvestmentInformation(db.Model, SerializerMixin):
    __tablename__ = 'investment_information'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(120), nullable=True)
    asset_type = db.Column(db.String(50), nullable=True)

    

    

    def __repr__(self):
        return f"<InvestmentInformation(title='{self.title}', author='{self.author}')>"