from flask import Flask, request, jsonify
import pymongo
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

app = Flask(__name__)

# Configure the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("musicapp")  
users_collection = db["users"]  

def signup(data):
    user_type = data['user_type']
    username = data['username']
    password = data['password']
    confirm_password = data['confirm_password']
    email = None
    artist_name=None
    artist_type=None 
    genre=None
    organization_name=None
    phone=None

    if user_type == 'artist':
        artist_name = data['artist_name']
        artist_type = data['artist_type']
        genre = data['genre']
    elif user_type == 'organization':
        organization_name = data['organization_name']
        email = data['email']
        phone = data['phone']

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return {"error": "User already exists"}, 400

    if password != confirm_password:
        return {"error": "Passwords do not match"}, 400

    hashed_password = generate_password_hash(password)

    if user_type=='artist':
        user_data = {
            "username": username,
            "password": hashed_password,
            "artist_name": artist_name,
            "type": artist_type,
            "genre": genre
        }
    elif user_type=='organization':
        user_data = {
            "username": username,
            "password": hashed_password,
            "email": email,
            "organization_name": organization_name,
            "phone": phone
        }

    users_collection.insert_one(user_data)
    
    return {"message": f"User '{username}' created successfully!"}, 201

def login(data):
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({"username": username})

    if not user:
        return {"error": "User not found"}, 404

    hashed_password = user.get('password')

    if not check_password_hash(hashed_password, password):
        return {"error": "Incorrect password"}, 401

    user['_id'] = str(user['_id'])
    return user

@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.json
    user_type = data.get('user_type')

    required_fields = {
        'artist': ['username', 'password', 'confirm_password', 'artist_name', 'artist_type', 'genre'],
        'organization': ['username', 'password', 'confirm_password', 'email', 'organization_name', 'phone']
    }

    if user_type not in required_fields:
        return jsonify({"error": "Invalid user type"}), 400

    for field in required_fields[user_type]:
        if field not in data:
            return jsonify({"error": f"Please provide {field}"}), 400

    return jsonify(signup(data))

@app.route('/login', methods=['POST'])
def login_route():
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Please provide username and password"}), 400

    return jsonify(login(data))

@app.route('/users', methods=['GET'])
def get_users():
    users = list(users_collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users), 200

@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = users_collection.find_one({"_id": ObjectId(id)})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
