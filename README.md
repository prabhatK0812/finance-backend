# 💰 Finance Data Processing & Access Control Backend

A production-ready backend system built using Node.js, Express, and MongoDB for managing financial records with secure Role-Based Access Control (RBAC).

---

## 🚀 Features

- User Management (Register/Login, roles: viewer/analyst/admin, status: active/inactive)
- JWT-based Authentication & Role-based Authorization
- Financial Records CRUD with filtering & pagination
- Dashboard APIs (summary, trends, category breakdown)
- Input validation & sanitization
- Security: Helmet, CORS, Rate Limiting, bcrypt
- Structured logging & centralized error handling
- Health check endpoint
- Clean architecture (controllers, services, utils, config)

---

## 🛠️ Tech Stack

- Node.js (ES6)
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- Helmet, CORS, Rate Limiting

---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd finance-backend
npm install
cp .env.example .env
npm run dev

p Nginx
