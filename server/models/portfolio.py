from database import db 
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone



class Portfolio(db.Model, SerializerMixin):
    __tablename__ = 'portfolios'

    serialize_rules = ('-holdings.portfolio', '-users.portfolios',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)  # Asset type, e.g., "Stocks", "Real Estate"
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    holdings = db.relationship('Holding', back_populates='portfolio', cascade="all, delete-orphan")
   

    
    
    @staticmethod
    def get_or_create_by_asset_type(asset_type, user_id):
        """Automatically create a portfolio if it doesn't exist based on the asset type."""
        portfolio = Portfolio.query.filter_by(name=asset_type, user_id=user_id).first()
        if not portfolio:
            portfolio = Portfolio(name=asset_type, user_id=user_id)
            db.session.add(portfolio)
            db.session.commit()
        return portfolio
    
    def __repr__(self):
        return f"<Portfolio(id={self.id}, name='{self.name}', user_id={self.user_id})>"