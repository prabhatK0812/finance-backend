# Finance Data Processing and Access Control Backend

## Overview :

This is a production-ready Node.js + Express + MongoDB backend for finance records and role-based access control. Features comprehensive API design, data modeling, business logic, and security best practices.

## Features :

- ✅ User management (register/login, roles: viewer/analyst/admin, status: active/inactive)
- ✅ Role-based access control with JWT authentication
- ✅ Financial records CRUD with filtering, pagination, and validation
- ✅ Dashboard summary APIs (totals, trends, category breakdowns)
- ✅ Input validation and sanitization
- ✅ Security middleware (CORS, rate limiting, helmet)
- ✅ Structured logging and error handling
- ✅ Health check endpoint
- ✅ Clean architecture (controllers, services, utils, config)

## Tech Stack :

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express-validator
- **Password Hashing**: bcryptjs

## Installation :

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB URI and JWT secret
5. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with:

```env
MONGO_URI=mongodb://localhost:27017/finance-backend
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## API Endpoints

### Health Check

- `GET /health` - Server health status

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users (Admin Only)

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user (role/status)
- `DELETE /api/users/:id` - Delete user

### Records

- `GET /api/records` - List records (with filtering/pagination)
  - Query params: `type`, `category`, `dateFrom`, `dateTo`, `page`, `limit`
- `POST /api/records` - Create record (Admin)
- `GET /api/records/:id` - Get record by ID
- `PUT /api/records/:id` - Update record (Admin)
- `DELETE /api/records/:id` - Delete record (Admin)

### Dashboard

- `GET /api/dashboard/summary` - Get financial summary

## Role Permissions

| Role    | Records Read | Records Write | Users Management | Dashboard |
| ------- | ------------ | ------------- | ---------------- | --------- |
| Viewer  | ✅           | ❌            | ❌               | ✅        |
| Analyst | ✅           | ❌            | ❌               | ✅        |
| Admin   | ✅           | ✅            | ✅               | ✅        |

## API Response Format :

All responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // for paginated responses
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // validation errors
}
```

## Project Structure

```
finance-backend/
├── src/
│   ├── config/
│   │   └── database.js          # DB connection
│   ├── controllers/             # Route handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── recordController.js
│   │   └── dashboardController.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js             # JWT authentication
│   │   ├── roles.js            # Role-based access
│   │   ├── security.js         # CORS, rate limiting
│   │   └── validation.js       # Input validation
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   └── Record.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── recordRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/               # Business logic
│   │   └── recordService.js
│   ├── utils/                  # Utilities
│   │   ├── constants.js        # App constants
│   │   ├── response.js         # Response helpers
│   │   ├── dateHelpers.js      # Date utilities
│   │   ├── errors.js           # Custom errors
│   │   └── logger.js           # Logging utility
│   └── app.js                  # Express app setup
├── .env                        # Environment template
├── package.json
└── README.md
```

## Security Features

- **JWT Authentication**: Stateless token-based auth with 8-hour expiry
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation with express-validator
- **Error Handling**: No sensitive data leakage

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)
- `npm run lint` - Run linting (placeholder)

### Code Quality

- ES6 modules with clean imports/exports
- Consistent error handling with try/catch
- Separation of concerns (controllers, services, utils)
- Centralized constants and utilities
- Comprehensive logging

## Assumptions & Design Decisions

- **Database**: MongoDB for flexible document storage
- **Roles**: Simple enum-based (viewer/analyst/admin)
- **Authentication**: JWT-only (no sessions)
- **Validation**: Server-side only (client validation assumed)
- **Pagination**: Offset-based with configurable limits
- **Soft Delete**: Not implemented (hard delete for simplicity)
- **File Upload**: Not included (focus on core features)

## API Testing

Use tools like Postman or Insomnia. Example requests:

### Register Admin User

```bash
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123"
}
```

### Login

```bash
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Create Record (use token from login)

```bash
POST /api/records
Authorization: Bearer <token>
{
  "amount": 1000,
  "type": "income",
  "category": "Salary",
  "date": "2024-01-01"
}
```

## Deployment

1. Set `NODE_ENV=production` in environment
2. Use a process manager like PM2
3. Configure MongoDB Atlas for production database
4. Set up reverse proxy (nginx) for production

## Contributing

1. Follow the existing code structure
2. Add proper error handling and logging
3. Update README for new features
4. Test thoroughly before committing



