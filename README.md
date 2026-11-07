# Student Registration Portal – IGEC Sagar

A full-stack web application for **Indira Gandhi Engineering College, Sagar (MP)**. Students can register, log in securely and publish blogs. The frontend (HTML/CSS/JS) is connected to a Node.js + Express REST API backed by MongoDB Atlas.

> Built as part of **Module 02: Backend Development** of my internship.

---

## Features

- Student registration with validation (name, enrollment no., email, DOB, gender, branch, password)
- Secure login using **JWT authentication**
- Passwords hashed with **bcryptjs**
- Protected route: only logged-in students can create a blog
- Public blog listing with author name and date
- Duplicate checks on enrollment number and email
- CORS enabled for the frontend
- Sensitive config stored in `.env`

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | HTML, CSS, JavaScript (Fetch API)       |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB Atlas, Mongoose                 |
| Auth       | JSON Web Token (JWT), bcryptjs          |
| Dev tools  | Nodemon, Postman, MongoDB Compass       |

---

## Project Structure

```
Student registration/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── auth.js          # register & login
│   │   └── blog.js          # create & list blogs
│   ├── .env                 # (not pushed to GitHub)
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontent/
    ├── home.html
    ├── login.html
    ├── Registration.html
    ├── blog.html
    ├── placement.html
    ├── about.html
    └── *.css
```

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint     | Auth     | Description                      |
|--------|--------------|----------|----------------------------------|
| POST   | `/register`  | No       | Register a new student           |
| POST   | `/login`     | No       | Login and receive a JWT token    |
| POST   | `/blogs`     | Required | Create a new blog                |
| GET    | `/blogs`     | No       | Get all blogs (latest first)     |

### Register – `POST /api/register`
```json
{
  "fname": "Student Name",
  "enroll": "0101IT221001",
  "email": "student@example.com",
  "dob": "2004-05-20",
  "gender": "Male",
  "branch": "it",
  "password": "secret123",
  "confirm": "secret123"
}
```

### Login – `POST /api/login`
```json
{
  "enroll": "0101IT221001",
  "password": "secret123"
}
```
Response:
```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": { "name": "Student Name", "enroll": "0101IT221001", "branch": "it" }
}
```

### Create Blog – `POST /api/blogs`
Header: `Authorization: Bearer <jwt_token>`
```json
{
  "title": "My first blog",
  "content": "Hello from IGEC!"
}
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)
- VS Code with the **Live Server** extension

### 1. Clone the repository
```bash
git clone https://github.com/astronomyadii-maker/student-registration-portal.gitt
cd "student-registration-portal/backend"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/igec?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
```

> In MongoDB Atlas, go to **Network Access** and add your IP address, otherwise the connection will fail.

### 4. Start the backend
```bash
npm run dev
```
You should see:
```
MongoDB connected
Server running on port 5000
```

### 5. Start the frontend
Open `frontent/Registration.html` in VS Code, right-click and choose **Open with Live Server** (runs on port 5500).

---

## How to Use

1. Open the **Registration** page and create a student account.
2. Go to **Student Login** and sign in with your enrollment number and password.
3. On the **Blog** page, write and publish a blog.
4. All published blogs are visible on the same page.

---

## Security Notes

- Passwords are never stored in plain text (bcrypt hash, 10 salt rounds).
- JWT tokens expire after 7 days.
- `.env` and `node_modules` are excluded using `.gitignore`.
- Blog content is rendered using `textContent` to prevent XSS.

---

## What I Learned

- Setting up a server with Node.js and Express.js
- Designing REST APIs and using HTTP methods correctly
- Authentication with JWT and password hashing with bcrypt
- Connecting MongoDB Atlas using Mongoose
- Connecting a frontend to a backend using the Fetch API and handling CORS
- Debugging real issues (Atlas IP whitelist, wrong working directory, database naming)

---

## Future Improvements

- Edit and delete blogs
- Password reset via email
- Logout button and token expiry handling in the UI
- Deploy backend (Render/Railway) and frontend (Netlify/Vercel)

---

## Author

**Aditya Yadav**
Indira Gandhi Engineering College, Sagar (MP)
LinkedIn: www.linkedin.com/in/aditya-yadav-122bbb38a

GitHub: https://github.com/astronomyadii-maker

---

## License

This project is for educational purposes.
