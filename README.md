# Customer Feedback System

A full-stack MERN application that allows users to register, log in, and submit feedback through a secure dashboard. The application also provides an admin panel for managing all user feedback entries.

## Features

### User Features

* User registration and login using JWT authentication
* Secure password storage with bcrypt hashing
* Submit feedback with title, message, and rating
* Update previously submitted feedback
* View personal feedback data

### Admin Features

* View all feedback submissions
* Create feedback entries for registered users
* Edit existing feedback
* Delete feedback records
* Role-based access control

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Project Structure

```text
customer-feedback-system/
│
├── client/          # React frontend
├── server/          # Express backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ishashukla18/customer-feedback-system.git
cd customer-feedback-system
```

### 2. Install dependencies

```bash
npm install
npm run install:all
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 4. Seed Admin Account

```bash
npm run seed:admin --prefix server
```

### 5. Start Development Servers

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed before being stored in MongoDB.
3. User logs in and receives a JWT token.
4. Token is sent with protected requests using the Authorization header.
5. Backend middleware validates the token before granting access.

## API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user          |

### User Feedback

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | /api/feedback/my | Get user's feedback       |
| PUT    | /api/feedback/my | Create or update feedback |

### Admin

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/feedback     | Get all feedback |
| POST   | /api/feedback     | Create feedback  |
| PUT    | /api/feedback/:id | Update feedback  |
| DELETE | /api/feedback/:id | Delete feedback  |

## Future Improvements

* Search and filter feedback
* Pagination for admin dashboard
* Email notifications
* User profile management
* Dashboard analytics

## Author

Isha Shukla
