from database import db
from sqlalchemy_serializer import SerializerMixin

class InvestmentInformation(db.Model, SerializerMixin):
    __tablename__ = 'investment_information'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(120), nullable=True)

    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable=False)
    
    portfolio = db.relationship('Portfolio', back_populates='investment_info')

    serialize_rules = ('-portfolio.investment_info',)

    def __repr__(self):
        return f"<InvestmentInformation(title='{self.title}', author='{self.author}')>"