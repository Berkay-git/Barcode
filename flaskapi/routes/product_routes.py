from flask import Blueprint, request, jsonify
from models.product import Product
from db_config import db

product_bp = Blueprint('product_bp', __name__)

# GET /api/products → Tüm ürünleri listele
@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = []
    for p in products:
        result.append({
            'barcodeid': p.barcodeid,
            'name': p.name,
            'typ': p.typ,
            'color': p.color,
            'size': p.size,
            'price': float(p.price),
            'stock': p.stock,
            'sex': p.sex
        })
    return jsonify(result)

# GET /api/products/<barcodeid> → Tek ürün detay
@product_bp.route('/<int:barcodeid>', methods=['GET'])
def get_product(barcodeid):
    product = Product.query.get_or_404(barcodeid)
    return jsonify({
        'barcodeid': product.barcodeid,
        'name': product.name,
        'typ': product.typ,
        'color': product.color,
        'size': product.size,
        'price': float(product.price),
        'stock': product.stock,
        'sex': product.sex
    })

# POST /api/products → Yeni ürün ekle
@product_bp.route('/', methods=['POST'])
def add_product():
    data = request.get_json()
    product = Product(
        barcodeid = data['barcodeid'],
        name = data['name'],
        typ = data['typ'],
        color = data.get('color'),
        size = data.get('size'),
        price = data['price'],
        stock = data.get('stock', 0),
        sex = data.get('sex')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully'}), 201

# PUT /api/products/<barcodeid> → Ürünü güncelle
@product_bp.route('/<int:barcodeid>', methods=['PUT'])
def update_product(barcodeid):
    product = Product.query.get_or_404(barcodeid)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.typ = data.get('typ', product.typ)
    product.color = data.get('color', product.color)
    product.size = data.get('size', product.size)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.sex = data.get('sex', product.sex)
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

# DELETE /api/products/<barcodeid> → Ürünü sil
@product_bp.route('/<int:barcodeid>', methods=['DELETE'])
def delete_product(barcodeid):
    product = Product.query.get_or_404(barcodeid)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})
