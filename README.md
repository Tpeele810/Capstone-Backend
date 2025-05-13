# Job Application Tracker - Backend

This is the backend API server for the Job Application Tracker app. It's built using **Express.js**, **MongoDB**, and **Mongoose** and provides secure user authentication and CRUD operations for job applications.

## 🛠️ Features

- User registration and login with JWT-based authentication
- Create, read, update, delete job applications
- Middleware protection for private routes

## 🚀 Project Structure

backend/
├── models/           # Mongoose models (User, Application)
├── routes/           # Express route files
├── middleware/       # Auth middleware
├── index.mjs         # Entry point
└── .env              # Environment config

## Authentication

Uses JWT tokens stored in Authorization headers

Protected routes require Authorization: Bearer <token>


## 📄 API Endpoints

Method	Endpoint	        Description
POST	/auth/register	    Register a new user
POST	/auth/login	        Authenticate a user
GET	    /applications	    Get all applications
POST	/applications	    Add a new application
PUT	    /applications/:id	Update an application
DELETE	/applications/:id	Delete an application