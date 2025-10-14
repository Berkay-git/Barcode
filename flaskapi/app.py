from flask import Flask
from flask_cors import CORS
from db_config import db
from flask_migrate import Migrate
import os

# Örnek blueprint
from routes.product_routes import product_bp  # products için yeni blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)  # React Native entegrasyonu için önemli

    # Configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-fallback-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
        'mysql+pymysql://root:1234@localhost/barcode'  # MySQL bağlantısı
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize database + migrate
    db.init_app(app)
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(product_bp, url_prefix='/api/products')

    return app

if __name__ == '__main__':
    app = create_app()
    print(app.url_map)
    app.run(debug=True)
