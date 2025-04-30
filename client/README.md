# About WealthMaker

A full-stack application to track, manage, and grow your investments and overall net worth. It includes features for managing investment goals, holdings, and related financial insights..

## Features

###  User Features

- User registration & login (with session-based auth)

- Create, read, update, delete (CRUD) investment holdings

- Create and track financial goals

- Browse helpful investment resources

- View portfolio and net worth summary

### Admin/Backend

- RESTful API with Flask + Flask-RESTful

- SQLite (or any SQLAlchemy-compatible DB)

- Auth with session + bcrypt

- Modular models and migrations

## Tech Stack

| Frontend         | Backend         | Database    | Others            |
|------------------|------------------|-------------|-------------------|
| React            | Flask (RESTful)  | SQLite      | Flask-Migrate     |
| React Router     | Flask-CORS       | SQLAlchemy  | bcrypt for hashing|
| Context API (Auth) | Flask-Session  |             | dotenv            |

# Setup Instructions

## Backend Setup (Flask)

1. Navigate to server/:
```
cd server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

2.Run the backend server:
```
python app.py
```
Server will run at http://localhost:5555

## Frontend Setup (React)

1. Navigate to client/:
```
cd client
npm install
npm start
```
App will run at http://localhost:3000

# API Endpoints (Flask)

| Endpoint              | Method | Description                         |
|-----------------------|--------|-------------------------------------|
| `/signup`             | POST   | Register a new user                 |
| `/login`              | POST   | Login and start a session           |
| `/logout`             | DELETE | End user session                    |
| `/holdings`           | GET/POST | View or add user holdings          |
| `/holdings/<id>`      | PUT/DELETE | Update or delete a holding       |
| `/goals`              | GET/POST | View or create financial goals     |
| `/goals/<id>`         | PUT/DELETE | Update or delete a goal          |
| `/info`               | GET/POST | Investment information resources   |

# Future enhancements

- Investment growth visualization (charts)

- Email/password reset functionality

- OAuth login (Google/GitHub)

- Real-time stock/crypto price APIs

# License

This project is licensed under the MIT License.

