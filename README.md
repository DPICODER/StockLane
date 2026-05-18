# StockLane

StockLane is a scalable multi-tenant inventory and warehouse management backend built using Node.js, Express.js, Sequelize, and PostgreSQL.

The system is designed with SaaS-style architecture principles where multiple organizations (tenants) can operate independently within the same application while maintaining strict data isolation.

This project focuses heavily on:
- Authentication & authorization
- Multi-tenant architecture
- Invite-based onboarding
- Role-based access control (RBAC)
- Schema migration management
- Validation & security
- Maintainable modular code structure

---

# Features

## Authentication System
- JWT-based authentication
- Secure password hashing using bcrypt
- Login & tenant registration
- Tenant-aware authentication flow
- Account status enforcement (active / inactive / suspended)

## Multi-Tenant Architecture
- Organization-based data isolation
- Unique tenant slug generation
- Tenant-owner account created on registration
- Tenant-scoped access control across all routes

## Invite System
- Invite users into a tenant organization
- Cryptographically secure token generation (32 bytes)
- Invite expiry validation
- Role-based invitation support (TENANT_ADMIN / STAFF)
- Invite status lifecycle: pending → accepted / revoked / expired

## Role-Based Access Control (RBAC)
- Centralized permissions registry
- Role-to-permission policy mapping
- Reusable `requirePermission` middleware
- Layered authorization: authentication → permission check → route handler
- Roles: SUPER_ADMIN / TENANT_ADMIN / STAFF

## User Management
- List all members within a tenant
- Update member profile information
- Soft deactivation via auth account status
- Tenant-scoped member operations

## Validation & Error Handling
- Joi request validation schemas
- Centralized validation middleware
- Custom error class hierarchy (AppError → AuthError / NotFoundError / ValidationError)
- Structured error responses with dev/prod mode awareness

## Database Migrations
- Sequelize CLI migrations as schema source of truth
- No `sequelize.sync()` in production
- Full migration history committed to version control
- Up/down support for safe rollbacks

---

# Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Migrations | Sequelize CLI |
| Authentication | JWT |
| Validation | Joi |
| Password Hashing | bcrypt |

---

# Project Structure

```bash
StockLane/
│
├── core/
│   ├── db/
│   │   ├── database.js               # Sequelize runtime connection
│   │   ├── config.js                 # Sequelize CLI config (env-aware)
│   │   ├── migrations/               # Schema migration files
│   │   └── seeders/                  # Seeders (future use)
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT verification
│   │   ├── permissions.middleware.js  # RBAC permission guard
│   │   ├── error.middleware.js        # Centralized error handler
│   │   └── validate.middleware.js     # Joi validation middleware
│   │
│   └── utils/
│       ├── validators/
│       │   ├── auth.validator.js
│       │   └── invitation.validator.js
│       ├── errors/
│       │   ├── AppError.js
│       │   ├── AuthError.js
│       │   ├── NotFoundError.js
│       │   └── ValidationError.js
│       ├── asyncHandler.js
│       ├── generate-Jwt-Token.js
│       ├── generate-Invite-Token.js
│       ├── generate-Tenant-Slug.js
│       ├── invite-expiry.js
│       ├── permissions.js             # Permissions registry
│       ├── roles.js                   # Roles constants
│       └── rolePermissions.js         # Role-to-permission mapping
│
├── modules/
│   ├── auth/
│   │   ├── auth.model.js
│   │   ├── auth.service.js
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   │
│   ├── tenants/
│   │   ├── tenant.model.js
│   │   ├── tenant.service.js
│   │   ├── tenant.controller.js
│   │   └── tenant.routes.js
│   │
│   ├── user/
│   │   ├── user.model.js
│   │   ├── user.service.js
│   │   ├── user.controller.js
│   │   └── user.routes.js
│   │
│   ├── invite/
│   │   ├── invite.model.js
│   │   ├── invite.service.js
│   │   ├── invite.controller.js
│   │   └── invite.routes.js
│   │
│   └── inventory/                     # In progress
│       ├── inventory.model.js
│       ├── inventory.service.js
│       ├── inventory.controller.js
│       └── inventory.routes.js
│
├── .sequelizerc                        # Sequelize CLI path config
├── server.js
├── package.json
└── README.md
```

---

# Architecture Overview

StockLane follows a modular backend architecture. Each domain is separated into its own module with its own model, service, controller, and routes.

```
Request
   ↓
authMiddleware        (verify JWT)
   ↓
requirePermission     (check role has permission)
   ↓
validate              (Joi schema validation)
   ↓
controller            (handle request/response)
   ↓
service               (business logic)
   ↓
model                 (database operation)
```

---

# RBAC Overview

```
SUPER_ADMIN
  └── tenant:view

TENANT_ADMIN
  ├── invite:create
  ├── invite:view
  ├── member:update
  ├── member:deactivate
  └── tenant:update

STAFF
  └── invite:view
```

---

# Multi-Tenant Flow

```
Tenant registers
      ↓
Tenant organization created
      ↓
Owner account created (TENANT_ADMIN)
      ↓
JWT token issued
      ↓
Owner invites staff via email token
      ↓
Staff accepts invite → account created
      ↓
All operations scoped to tenant
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/DPICODER/StockLane.git
cd StockLane
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
APP_PORT=3000

DB_HOST=localhost
DB_NAME=stocklane
DB_USER=root
DB_PASS=password

JWT_SECRET=your_super_secret_key
```

## 4. Database Setup

Ensure PostgreSQL is running and create the database:

```sql
CREATE DATABASE stocklane;
```

Run migrations to set up the schema:

```bash
npm run db:migrate
```

---

# Running The Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# Migration Commands

```bash
# Run all pending migrations
npm run db:migrate

# Check migration status
npm run db:migrate:status

# Undo last migration
npm run db:migrate:undo
```

> Schema changes are always made via a new migration file. Never edit an existing migration.

---

# API Endpoints

## Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register a new tenant + owner account | No |
| POST | `/api/v1/auth/login` | Login and receive JWT | No |

### Register

```http
POST /api/v1/auth/register
```

```json
{
  "email": "varun@example.com",
  "password": "StrongPass123",
  "company": "Acme Pvt Ltd",
  "name": "Varun",
  "phone": "9999999999",
  "plan": "free"
}
```

### Login

```http
POST /api/v1/auth/login
```

```json
{
  "email": "varun@example.com",
  "password": "StrongPass123"
}
```

---

## Invites

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/invite` | Create an invite | TENANT_ADMIN |
| GET | `/api/v1/invite/:token` | Get invite details by token | No |
| POST | `/api/v1/invite/:token/accept` | Accept invite and create account | No |

### Create Invite

```http
POST /api/v1/invite
Authorization: Bearer <token>
```

```json
{
  "email": "staff@example.com",
  "role": "STAFF",
  "expiryDuration": 7
}
```

### Accept Invite

```http
POST /api/v1/invite/:token/accept
```

```json
{
  "name": "John Doe",
  "password": "StrongPass123",
  "phone": "9999999999"
}
```

---

## Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/user` | List all tenant members | TENANT_ADMIN |
| PATCH | `/api/v1/user/:id` | Update member info | TENANT_ADMIN |
| DELETE | `/api/v1/user/:id` | Deactivate a member | TENANT_ADMIN |

---

## Tenants

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/tenant` | List all active tenants | SUPER_ADMIN |

---

# Database Schema

```
tenant
  id, slug, name, plan, status, createdAt, updatedAt

auth
  id, email, password_hash, role, status, tenant_id, last_login, createdAt, updatedAt

user
  id, name, phone, tenant_id, auth_id, createdAt, updatedAt

invites
  id, email, tenant_id, role, token, status, expires_at, invited_by, accepted_at, createdAt, updatedAt
```

---

# Development Status

## Completed

- Authentication module (register, login, JWT)
- Multi-tenant registration flow
- Invite system (create, accept, expiry, token validation)
- RBAC (permissions registry, role mapping, middleware guards)
- User management routes (list, update, deactivate)
- Tenant listing (SUPER_ADMIN scoped)
- Sequelize CLI migrations (sync() removed)
- Custom error hierarchy
- Centralized validation middleware
- Soft delete foundation (auth status field)

## In Progress

- Inventory module (core domain)
- Auth status check in authMiddleware (inactive user blocking)
- Email delivery for invite links

## Planned

- Refresh token rotation
- Rate limiting (express-rate-limit)
- Helmet.js + payload size limits
- Structured logging (winston/pino)
- Redis caching
- DB indexes
- Swagger/OpenAPI documentation
- Automated testing (jest + supertest)
- Docker support
- CI/CD pipeline

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

GitHub: [https://github.com/DPICODER](https://github.com/DPICODER)
