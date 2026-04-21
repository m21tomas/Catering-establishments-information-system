# Catering Establishments Information System

A full-stack web application designed to manage canteen data, menus, and customer orders. The system features a robust role-based access control and handles complex data types, including image uploads for establishments.

## 🚀 Technical Stack

* **Backend:** Java 17, Spring Boot 2.7.1, Spring Security.
* **Database:** H2 Database (In-memory for development/testing).
* **ORM:** Hibernate / JPA.
* **Frontend:** React, Axios, Bootstrap.
* **Security:** BCrypt password encoding, Role-based authorization.
* **File Handling:** Apache Tika for media type validation.

## ✨ Key Features

* **Multi-role Authentication:** Distinct interfaces and permissions for `ADMIN` and `USER` roles.
* **Canteen Management:** Full CRUD operations for canteens, including automatic image renaming and storage.
* **Order Workflow:** Users can browse canteens, view menus, add dishes to a cart, and submit orders.
* **Security Filters:** Custom security filter chain protecting REST endpoints.
* **Data Initialization:** Automatic database seeding on startup for testing purposes.

## 🛠️ Local Setup Instructions

### 1. Prerequisites
* Java 17
* Node.js & npm
* An IDE (Eclipse, IntelliJ, or VS Code)

### 2. Backend Setup
1. Open the `Maitinimas-back` folder in your IDE.
2. Ensure the `src/main/resources/application.properties` is configured either for H2 or postgreSQL.
3. Run `MaitinimasApplication.java`.
4. The API will be available at `http://localhost:8080`.
5. H2 Console: `http://localhost:8080/console` (JDBC URL: `jdbc:h2:mem:testdb`).

### 3. Frontend Setup
1. Navigate to the `Maitinimas-front` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
4. The application will open at `http://localhost:3000`.

## 🔑 Test Credentials

| Role | Email / Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@admin.lt` | `admin@admin.lt` |
| **User** | `user@user.lt` | `user@user.lt` |
