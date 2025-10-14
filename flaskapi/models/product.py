from db_config import db

class Product(db.Model):
    __tablename__ = 'products'

    barcodeid = db.Column(db.BigInteger, primary_key=True)  # Manuel girilecek barkod
    name = db.Column(db.String(100), nullable=False)
    typ = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(30))
    size = db.Column(db.String(10))
    price = db.Column(db.Numeric(10,2), nullable=False)
    stock = db.Column(db.Integer, default=0)
    sex = db.Column(db.String(1), nullable=True)  # 'M', 'F', 'U'

