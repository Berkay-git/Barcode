📱 Barcode Scanner App
🧩 Overview

This project is a full-stack barcode scanning application built with Flask (Python) as the backend and React Native (Expo) as the frontend.
It allows users to scan barcodes using a mobile camera and view detailed product information retrieved from a MySQL database.

💡 Designed for a clothing brand to manage and display product details such as name, type, color, size, price, stock, and gender category.

🏗️ Tech Stack
🔹 Backend (Flask)

Flask – RESTful API service

MySQL – Product data storage

Flask-Migrate – Database migration and version control

SQLAlchemy – ORM for database management

CORS – API connection with frontend (Expo)

🔹 Frontend (React Native with Expo)

Expo Router – Screen navigation

Expo Barcode Scanner / Camera – Live barcode scanning

Axios – Communication with Flask backend

React Navigation – Tab-based UI

React Native SVG / Icons – Custom visuals and icons

🧱 Project Structure
C:.
├── barcode_app/            # React Native (Expo) frontend
│   ├── app/
│   │   ├── (tabs)/         # Tab-based navigation
│   │   │   ├── index.tsx   # Product listing
│   │   │   ├── explore.tsx # Barcode scanning
│   │   │   └── _layout.tsx # Tab layout
│   │   └── _layout.tsx     # Root layout
│   ├── assert/images/      # Icons, SVGs, and assets
│   └── src/api/api.ts      # Axios connection
│
└── flaskapi/               # Backend (Flask)
    ├── app.py              # Flask entry point
    ├── db_config.py        # Database connection
    ├── models/             # SQLAlchemy models
    ├── routes/             # Flask routes (API endpoints)
    └── migrations/         # Auto-generated migrations

⚙️ Features

✅ Scan barcodes using the camera
✅ Fetch real-time product data from backend
✅ Display product details with name, price, color, and stock
✅ Tab navigation between Product List and Barcode Scanner
✅ Dynamic API integration (Flask ↔ React Native)
✅ Works on both Android Emulator and Web Preview
✅ Responsive UI design with custom icons

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Berkay-git/Barcode.git
cd barcode

2️⃣ Backend Setup (Flask)
cd flaskapi
pip install -r requirements.txt
flask db upgrade
python app.py


Backend runs on → http://127.0.0.1:5000

3️⃣ Frontend Setup (Expo)
cd ../barcode_app
npm install
npx expo start


Press a → Android

Press w → Web

🔗 API Example

Endpoint: GET /api/products/<barcodeid>

Response:

{
  "barcodeid": 8691234567890,
  "name": "Basic T-Shirt",
  "typ": "T-Shirt",
  "color": "Beyaz",
  "size": "M",
  "price": 199.90,
  "stock": 120,
  "sex": "U"
}

🧠 Notes

On Android Emulator → use http://10.0.2.2:5000 as base URL

On Web → use http://127.0.0.1:5000

Camera permission must be granted manually on first use

📸 Screenshots (Optional)
Home	Barcode Scanner
🏠 Product List	📷 Live Camera Scanning
🧑‍💻 Author

Developed by: Berkay Ceylan
📍 Computer Engineering Student
💡 Focused on full-stack and mobile development

🏁 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.