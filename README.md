# StockLane

StockLane is a scalable multi-tenant inventory and warehouse management backend built using Node.js, Express.js, Sequelize, and MySQL.

The system is designed with SaaS-style architecture principles where multiple organizations (tenants) can operate independently within the same application while maintaining strict data isolation.

This project focuses heavily on:
- authentication & authorization
- tenant management
- invite-based onboarding
- scalable backend architecture
- validation & security
- maintainable modular code structure

---

# Features

## Authentication System
- JWT-based authentication
- Secure password hashing using bcrypt
- Login/Register functionality
- Tenant-aware authentication flow

## Multi-Tenant Architecture
- Organization-based isolation
- Unique tenant slug generation
- Tenant-owner creation during registration
- Scoped access control

## Invite System
- Invite users into tenant organizations
- Invite token generation
- Invite expiry validation
- Role-based invitation support

## Validation & Error Handling
- Joi request validation
- Centralized validation middleware
- Structured error handling
- Consistent API response handling

## Security
- Password hashing with bcrypt
- Protected routes middleware
- JWT verification
- Request body sanitization
- Validation before route execution

---

# Tech Stack

| Layer | Technology |
|------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JWT |
| Validation | Joi |
| Password Hashing | bcrypt |

---

# Project Structure

```bash
StockLane/
│
├── core/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── database/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   └── utils/
│       ├── validators/
│       ├── generate-Jwt-Token.js
│       ├── generate-Invite-Token.js
│       └── generate-Tenant-Slug.js
│
├── modules/
│   ├── auth/
│   ├── tenants/
│   ├── users/
│   └── inventory/
│
├── server.js
├── package.json
└── README.md
````

---

# Architecture Overview

StockLane follows a modular backend architecture.

Each domain is separated into its own module:

* Auth Module
* Tenant Module
* User Module
* Inventory Module

This structure improves:

* scalability
* maintainability
* code separation
* team collaboration
* feature isolation

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/DPICODER/StockLane.git
cd StockLane
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=stocklane
DB_USER=root
DB_PASSWORD=password

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

---

# Running The Project

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

# Database Setup

Ensure MySQL is running locally.

Create a database:

```sql
CREATE DATABASE stocklane;
```

The application currently uses:

```js
sequelize.sync()
```

for schema synchronization during development.

---

# API Endpoints

# Authentication

## Register Tenant Owner

```http
POST /api/auth/register
```

Creates:

* tenant organization
* owner account
* JWT access token

### Example Request

```json
{
  "company_name": "Acme Pvt Ltd",
  "name": "Varun",
  "email": "varun@example.com",
  "password": "StrongPassword123"
}
```

---

## Login

```http
POST /api/auth/login
```

### Example Request

```json
{
  "email": "varun@example.com",
  "password": "StrongPassword123"
}
```

---

# Multi-Tenant Flow

```text
Tenant registers
        ↓
Tenant organization created
        ↓
Owner account created
        ↓
JWT token generated
        ↓
Owner invites users
        ↓
Users join tenant workspace
        ↓
Tenant-scoped operations performed
```

---

# Validation Strategy

StockLane uses Joi validation schemas before route execution.

Validation occurs through middleware to ensure:

* clean request bodies
* strict field checking
* prevention of invalid payloads
* safer API handling

---

# Error Handling

The application uses centralized error middleware for:

* validation errors
* authentication failures
* database exceptions
* custom application errors

This ensures:

* cleaner controllers
* standardized responses
* easier debugging

---

# Security Practices

* bcrypt password hashing
* JWT authentication
* Protected route middleware
* Input validation
* Invite expiry verification
* Tenant-scoped authorization approach

---

# Current Development Status

## Completed

* Authentication module
* JWT implementation
* Tenant registration flow
* Invite validation system
* Middleware architecture
* Sequelize model setup

## In Progress

* Inventory module
* User role permissions
* RBAC system
* Audit logs
* Warehouse support

## Planned

* Refresh tokens
* Docker support
* Swagger/OpenAPI documentation
* Automated testing
* Redis caching
* Rate limiting
* CI/CD pipelines

---

# Future Improvements

## Recommended Production Improvements

### Database Migrations

Replace `sequelize.sync()` with Sequelize migrations for production safety.

### Refresh Token Rotation

Implement secure refresh token handling.

### RBAC

Granular permission system for:

* Owner
* Admin
* Manager
* Staff

### Audit Logging

Track:

* inventory changes
* user activity
* authentication events

### API Documentation

Add Swagger/OpenAPI support for easier integration.

### Testing

Implement:

* unit tests
* integration tests
* API testing

---

# Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

# License

This project is currently under development and does not yet have an official license.

---

# Author

Built by DPICODER

GitHub:
[https://github.com/DPICODER](https://github.com/DPICODER)

---

```
```
