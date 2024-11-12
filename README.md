# LIBRARY MANAGEMENT SERVER API

# Description

This Node.js API facilitates library management with CRUD operations for books and members, borrowing/returning functionality, and overdue book tracking.

# Live URL

- [Server API URL](https://library-management-api-kappa.vercel.app/)

# Technology Stack & Packages

- Express JS
- TypeScript
- PostgreSQL
- Prisma ORM

# Setup Instructions

1. Clone: `git clone https://github.com/Mashud05052001/library-management-prisma-server.git`
2. Install: `npm install`
3. Configure: Update PostgreSQL connection in `.env`
4. Migrate: `npx prisma migrate dev`
5. Start: `npm run dev`

# Features

- Book Management (CRUD)
- Member Management (CRUD)
- Borrowing/Returning System
- Overdue Book Tracking
- Error Handling
- Used transaction on proper places.
