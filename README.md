# User Feedback MERN App

A simple interview project with user registration/login, one editable feedback submission per user, and an admin dashboard for viewing, editing, and deleting feedback.

## Project structure

- `client/`: React + Vite UI
- `server/`: Express API, MongoDB models, JWT authentication
- `User` model: name, email, hashed password, role
- `Feedback` model: user reference, title, message, rating

## Run locally

1. Install MongoDB locally and make sure it is running.
2. Copy `server/.env.example` to `server/.env`.
3. Run `npm install` in the project root.
4. Run `npm run install:all`.
5. Create the admin with `npm run seed:admin --prefix server`.
6. Start both apps with `npm run dev`.
7. Open `http://localhost:5173`.

The example admin login is `admin@example.com` / `admin123`. Change it in `server/.env` before seeding for a real deployment.

## How to explain it

1. React sends form data to Express using `fetch`.
2. Registration hashes passwords with bcrypt. Login returns a signed JWT.
3. The client stores the JWT and sends it as an Authorization header.
4. The `protect` middleware verifies the JWT. `adminOnly` also checks the role.
5. `PUT /api/feedback/my` uses MongoDB upsert: it creates feedback if none exists, otherwise updates it.
6. Admin routes create, list, update, or delete feedback and are inaccessible to normal users.

## Main API routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/feedback/my` | User | Get own feedback |
| PUT | `/api/feedback/my` | User | Add/update own feedback |
| GET | `/api/feedback` | Admin | List all |
| POST | `/api/feedback` | Admin | Create for a registered user |
| PUT | `/api/feedback/:id` | Admin | Update one |
| DELETE | `/api/feedback/:id` | Admin | Delete one |
