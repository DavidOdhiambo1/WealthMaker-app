from database import db 
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy

ALLOWED_ASSET_TYPES = {
    "stocks",
    "real_estate",
    "fixed_income",
    "crypto",
    "cash",
    "tangible_assets",
    "private_equity",
    "collectibles"
}
class Holding(db.Model, SerializerMixin):
    """Holding model to track individual investments within a portfolio."""
    __tablename__ = 'holdings'

    serialize_rules = ('-portfolio.holdings', '-user.holdings',)

    id = db.Column(db.Integer, primary_key=True)
    asset_name = db.Column(db.String(100), nullable=False)    
    asset_type = db.Column(db.String(50), nullable=False)      
    buy_price = db.Column(db.Float, nullable=False)
    buy_date = db.Column(db.DateTime, nullable=False)
    

    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    portfolio = db.relationship('Portfolio', back_populates='holdings')
    user = db.relationship('User', back_populates='holdings')
    

    @validates('asset_type')
    def validate_asset_type(self, _, value):
        if value not in ALLOWED_ASSET_TYPES:
            raise ValueError(f"Invalid asset type: {value}")
        return value

    @validates('buy_price')
    def validate_buy_price(self, _, value):
        if value < 0:
            raise ValueError("Buy price cannot be negative.")
        return value

    @validates('buy_date')
    def validate_buy_date(self, key, value):
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)  # Make it aware if not
        if value > datetime.now(timezone.utc):
            raise ValueError("Buy date cannot be in the future")
        return value

    def __repr__(self):
        return (f"<Holding(id={self.id}, quantity={self.quantity}, buy_price={self.buy_price}, "
                f"buy_date={self.buy_date.isoformat()}, portfolio_id={self.portfolio_id})>")
