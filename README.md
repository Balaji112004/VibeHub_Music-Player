VibeHub – Full Stack Web Application

VibeHub is a full-stack web application consisting of:

A User Frontend (React.js)

An Admin Dashboard (React.js)

A Backend API (Spring Boot + MySQL)

The system enables users to interact with the platform while administrators can manage content and operations through a secure admin panel.

Technology Stack
Frontend (User & Admin)

React.js

JavaScript

HTML5

CSS3

React Router DOM

Vite

Backend

Java

Spring Boot

Spring Data JPA

Hibernate

MySQL

Maven

Project Structure
vibehub/
│
├── vibehub-frontend/     # User-facing React application
├── vibehub-admin/        # Admin dashboard React application
└── vibehub-backend/      # Spring Boot backend

Prerequisites

Ensure the following software is installed:

Node.js (v16+ recommended)

npm

Java JDK 17+

Maven

MySQL

Frontend Setup (User & Admin)

Perform the following steps for both:

vibehub-frontend

vibehub-admin

Step 1: Navigate to the project folder
cd vibehub-frontend


or

cd vibehub-admin

Step 2: Install dependencies
npm install
npm install react-router-dom


This will download all required node_modules for the React application.

Step 3: Run the frontend
npm run dev


The application will start and be accessible in your browser at:

http://localhost:5173


(or the port shown in the terminal)

Backend Setup (Spring Boot)
Step 1: Navigate to backend folder
cd vibehub-backend

Step 2: Configure MySQL

Update application.properties or application.yml with your database credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/vibehub
spring.datasource.username=your_username
spring.datasource.password=your_password


Ensure the database vibehub exists in MySQL.

Step 3: Run the backend
mvn spring-boot:run


The backend server will start at:

http://localhost:8080

How the System Works

The Frontend and Admin Panel communicate with the Spring Boot REST API

The Spring Boot backend processes requests and interacts with the MySQL database

Data is exchanged in JSON format via RESTful APIs

Important Notes

Do not commit node_modules/, target/, or .env files to GitHub

Ensure backend is running before using frontend or admin dashboard

Use separate browsers or sessions for Admin and User login

Author

Balaji Kanthan
Java Full Stack Developer (React + Spring Boot)
