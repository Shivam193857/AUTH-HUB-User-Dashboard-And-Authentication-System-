# 🔐 AuthHub – User Dashboard & Authentication System

AuthHub is a simple **MERN stack web application** that enables users to **sign up, log in, view, update, and delete their profile** securely.  
The project demonstrates complete **user authentication and dashboard management** with JWT-based authorization, image uploads via Cloudinary, and secure password hashing using bcrypt.js.
The use case is to provide a secure and reusable foundation for any application that needs user login functionality.
After signing up and logging in, users can access their personal dashboard, where their information is fetched securely from MongoDB using JWT authentication.
It’s useful as a starting point for applications like admin panels, employee portals, or student dashboards.

---

## Features

- 🧑‍💻 **User Authentication**
  - Register new users with name, email, and password.
  - Login with JWT token-based authentication.
  - Passwords hashed using **bcrypt.js** for security.

- 🖼️ **Profile Management**
  - View personal dashboard after login.
  - Update profile details (name, email, picture).
  - Upload profile picture using **Cloudinary API**.
  - Delete account permanently from the system.

- 🔒 **Protected Routes**
  - Backend routes secured using JWT middleware.
  - Only authenticated users can access profile and update features.
 
- ⚙️ **Tech Stack**
  - **Frontend:** React, Chakra UI, Axios, Vite
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB (via Mongoose)
  - **Authentication:** JWT + bcrypt.js
  - **Cloud Image Storage:** Cloudinary
  - **API testing:** – Postman
    
##  App Preview
<img width="1290" height="742" alt="Screenshot from 2025-10-31 12-01-41" src="https://github.com/user-attachments/assets/d7b439aa-13fb-4c16-b8fe-468b7613a771" />
<img width="1290" height="742" alt="Screenshot from 2025-10-31 12-01-54" src="https://github.com/user-attachments/assets/1f302d99-62a5-47b4-8ede-e535ab37428c" />

## ⚡ Installation & Setup
### 🖥️ Clone the repository
```bash
git clone https://github.com/<your-username>/AuthHub-User-Dashboard-And-Authentication-System.git
cd AuthHub-User-Dashboard-And-Authentication-System
```
📦 Install dependencies



Install for both backend and frontend:
# Backend
```bash
cd backend
npm install
```

# Frontend
```bash
cd ../frontend
npm install
```
▶️ Running the Application
Step 1: Run the Backend Server

```
cd backend
npx nodemon server.js
```
Step 2: Run the Frontend App
```
cd frontend
npm run dev
```
you can copy the URL and open in the browser
---
👨‍💻 **Author**

Shivam @Shivam193857
A passionate developer exploring full-stack and AI-powered web applications.
