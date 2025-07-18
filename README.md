# 🛒 Backend - Ecommerce Shopping Portal (Express.js API)

This is the **backend** API for the Ecommerce application built with **Node.js** and **Express.js**. It handles authentication, product management, user roles (admin/user), order processing, and secure interaction with the database.

---

## ⚙️ Features

- 🔐 **JWT-based authentication** with access control
- 🔑 **Password hashing** using **bcrypt**
- 📦 **RESTful API** for products, users, orders
- 🧑‍💼 Role-based access (Admin vs User)
- ⚙️ **UUID** for secure, unique identifiers (e.g., order IDs)
- 🔄 **CORS** support for frontend-backend communication
- 💾 **MongoDB + Mongoose** for database management
- 🔁 Auto-reloading during development with **Nodemon**

---

## 🧰 Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **uuid** for unique identifiers
- **cors** for cross-origin requests
- **Nodemon** for development

---

## 📦 Installation & Setup

### ✅ Prerequisites

- Node.js and npm installed
- MongoDB running locally or MongoDB Atlas cluster

### 📦 Installation

- **after going to cd backend folder enter this command it automatically install all required dependencies**
    ## npm i or npm install

  
### ▶️ Running the Application

- **After installing dependencies, start the frontend:**
  ### npm start

- **API will be running at: http://localhost:5000/api manually.**

### 🔄 Data Models

- **User Model**
name,email(_id),password (hashed),role (user/admin),gender,phno,address

- **Product Model**
proid(_id),name,description,price,category,image

- **Cart Model**
cartid(_id),userid,productid,name,quantity,price,imgage,description,cat

uuid

### 🧑‍💻 Developed By

- **Munidileep**
- **GitHub: @munidileep**
- **Email: munidileepbasabathini2000@gmail.com**
