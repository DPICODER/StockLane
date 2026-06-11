# StockLane

StockLane is a production-ready, enterprise-grade B2B Multi-Tenant Inventory Management backend engine. Built using **Node.js**, **Express**, and **Sequelize ORM**, the system is engineered around a modular, domain-driven architecture featuring strict data isolation, dynamic tenant routing, and an advanced Role-Based Access Control (RBAC) security model.

---

## 🏗️ Architectural Overview & Design Patterns

Unlike traditional flat MVC architectures that become unmaintainable as engineering teams scale, StockLane implements a **Modular Domain Architecture**. Each business capability is entirely self-contained within its own domain module, making the codebase highly scannable, decoupled, and microservice-ready.


```

core/                 # Shared infrastructure & global utilities
│   ├── db/           # Database configurations and Sequelize migrations
│   ├── middleware/   # Centralized express middleware (RBAC, validation, errors)
│   └── utils/        # Global helper utilities and custom error primitives
modules/              # Domain-driven feature modules
├── tenants/      # Organization onboarding & workspace routing
├── user/         # Identity profiles and lifecycle management
├── auth/         # Authentication mechanics & token issuing
├── invite/       # Multi-tenant workspace invitation pipelines
└── inventory/    # Core inventory tracking and ledger management

```

### Key Engineering Features

*   **Multi-Tenant Data Isolation:** Dynamically provisions organization workspaces utilizing automated slug generation (`generate-Tenant-Slug.js`). Core database architecture handles clean tenant partitioning to guarantee absolute cross-organization data boundaries.
*   **Decoupled Domain Layering:** Every module explicitly divides its responsibilities across three rigid architectural layers:
    *   `Routes`: Entry boundaries validating incoming payloads.
    *   `Controller`: Orchestration layer parsing requests and managing HTTP abstractions.
    *   `Service`: Pure business logic layer executing database operations, completely decoupled from Express request/response lifecycles.
*   **Granular Role-Based Access Control (RBAC):** Built a declarative matrix infrastructure mapping roles (`Owner`, `Admin`, `Manager`, `Staff`) to deterministic permission arrays, guarded by an active execution interceptor (`permissions.middleware.js`).

---

## 🛡️ Core Infrastructure Design

### 1. Robust Global Exception Handling
The engine implements a predictable, structured error pipeline bypassing standard native try-catch overheads via an explicit `asyncHandler` wrapper. Operational vs. Programmatic errors are segregated utilizing custom error primitives inherited from a base interface:


```

```
      ┌────────────────────────┐
      │       HTTP Request     │
      └───────────┬────────────┘
                  ▼
      ┌────────────────────────┐
      │  Operational Exception │
      └───────────┬────────────┘
                  ▼
      ┌────────────────────────┐
      │   AppError Extension   │
      │ (Auth / ValidationError)│
      └───────────┬────────────┘
                  ▼

```

┌─────────────────────────────────────────────┐
│          Global Error Middleware            │
│  • Normalizes payload structure             │
│  • Controls production stacktrace leakages  │
│  • Dispatches structured JSON interface     │
└─────────────────────────────────────────────┘

```

### 2. Request Validation Pipeline
To ensure strict boundary security, incoming request bodies, query strings, and route parameters are schema-validated at the network edge via a structural interceptor (`validate.middleware.js`). Malformed payloads are dropped instantly before triggering resource-intensive database layers.

---

## 📊 Domain Matrix

The system exposes a clean mapping of domain responsibilities designed for scale:

| Module | Core Responsibility | Database Triggers / Side-Effects |
| :--- | :--- | :--- |
| **Tenants** | Provisions isolated organizational workspaces. | Generates immutable cryptographic URL slugs. |
| **Auth** | Handles authentication, hashing, and state validation. | Dispatches secure, signed JWT tokens. |
| **Invite** | Manages multi-user workspace access delegation. | Generates time-bounded, single-use security tokens. |
| **User** | Aggregates individual structural identities across workspaces. | Enforces relational constraints against Auth entities. |
| **Inventory**| Core tracking engine for high-throughput logistics. | Restricts records strictly to the active tenant session context. |

---

## 🛠️ Tech Stack & Dependencies

*   **Runtime Environment:** Node.js (LTS)
*   **Application Framework:** Express.js
*   **Object-Relational Mapping (ORM):** Sequelize
*   **Database Engines:** Relational Compatibility (PostgreSQL / MySQL / MariaDB)
*   **Authentication Engine:** JSON Web Tokens (JWT) & bcrypt

---

## 🚀 Local Deployment Setup

### Prerequisites
Ensure your local environment runs Node.js v18+ and has a relational database instance online.

### 1. Clone & Install Environment
```bash
git clone <your-repository-url>
cd StockLane
npm install

```

### 2. Environment Configuration

Create a `.env` file in the project root directory and map the following credentials:

```env
PORT=5000
NODE_ENV=development

DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=stocklane_dev
DB_HOST=127.0.0.1
DB_DIALECT=postgres # mysql / mariadb

JWT_SECRET=your_super_secure_jwt_signing_key
JWT_EXPIRES_IN=1d

```

### 3. Initialize Database Migrations

Execute the programmatic migration pipeline to seed your local database architecture schema:

```bash
npx sequelizeprocli db:migrate
# OR via your package script runner if configured
npm run db:migrate

```

### 4. Boot Execution Engine

```bash
# Start production cluster execution
npm start

# Start local execution stream with hot-reloading
npm run dev

```

