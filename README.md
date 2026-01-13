# VibeHub – Full Stack Web Application

VibeHub is a full stack web application consisting of a user-facing frontend, an admin dashboard, and a backend REST API. It is built using React for the frontend and Spring Boot for the backend with MySQL as the database.

This project demonstrates real-world full stack development including UI, API design, database integration, and application deployment structure.

---

## Tech Stack

Frontend (User & Admin):

* React.js
* JavaScript
* HTML
* CSS
* React Router DOM
* Vite

Backend:

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Maven

---

## Project Structure

vibehub
├── vibehub-frontend
├── vibehub-admin
└── vibehub-backend

---

## Prerequisites

Make sure the following software is installed:

* Node.js
* npm
* Java JDK 17 or higher
* Maven
* MySQL

---

## Frontend Setup (VibeHub Frontend and Admin)

These steps must be done for both `vibehub-frontend` and `vibehub-admin`.

## Step 1 – Go to the project folder

Open terminal in the frontend or admin folder.

```
cd vibehub-frontend
```

or

```
cd vibehub-admin
```

---

## Step 2 – Install dependencies

Run the following commands:

```
npm install
npm install react-router-dom
```

This will download all required npm packages.

---

## Step 3 – Run the frontend

Start the React application using:

```
npm run dev
```

The application will be available in your browser on the port shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## Backend Setup (Spring Boot)

## Step 1 – Go to backend folder

```
cd vibehub-backend
```

---

## Step 2 – Configure MySQL

Open `application.properties` or `application.yml` and update:

```
spring.datasource.url=jdbc:mysql://localhost:3306/vibehub
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Make sure the `vibehub` database exists in MySQL.

---

## Step 3 – Run the backend

Run the Spring Boot application:

```
mvn spring-boot:run
```

The backend server will start on:

```
http://localhost:8080
```

---

## How the Application Works

The React frontend and admin dashboard send requests to the Spring Boot backend through REST APIs. The backend processes the requests, interacts with the MySQL database, and returns JSON responses to the frontend.

---

## Important Notes

* Do not upload `node_modules`, `target`, or `.env` files to GitHub
* Always start the backend before running the frontend
* Use separate login for Admin and User if applicable

---

## Author

Balaji Kanthan
Java Full Stack Developer (React, Spring Boot, MySQL)
