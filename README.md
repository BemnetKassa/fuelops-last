# FuelOps

Is a software solution I(Bemnet Kassa) planned and started building to solve the nationwise fuel destribution problems like primarily black marketing of fuel and other kind of fuel distribution problem by tracking, managing and making transparent fuel operation through out the entier country.

FuelOps is a full-stack fuel management platform with:

- A Next.js frontend (`frontend`)
- An Express.js backend (`backend`)
- PostgreSQL (Neon) using Prisma ORM

## Project Structure

- `frontend`: Next.js 16 app (App Router, TypeScript, Tailwind)
- `backend`: Express API, Prisma client, role-based modules (`admin`, `auth`, `driver`, `station`)

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Express.js, JWT auth, bcrypt
- Database: PostgreSQL (Neon)
- ORM: Prisma 7 (`@prisma/client`, `@prisma/adapter-pg`)

## Prerequisites

- Node.js 20+ (Node 22 recommended)
- npm
- A PostgreSQL connection string (Neon)

## Environment Variables

Create a `.env` file inside `backend`.

Required variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: secret key for signing JWT tokens
- `PORT`: backend port (optional, defaults to `3001`)
- `NODE_ENV`: e.g. `development` or `production`

Example:

```env
DATABASE_URL="postgresql://user:password@host:port/db"
JWT_SECRET="change-this-secret"
PORT=3001
NODE_ENV=development
```

## Install Dependencies

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Prisma Setup (Backend)

From `backend`:

```bash
npx prisma generate
npx prisma migrate dev
```

If your schema is already migrated in Neon, use:

```bash
npx prisma migrate deploy
```

## Run in Development

### 1) Start backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:3001` by default.

### 2) Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

## Backend API Base Paths

- `/api/admin`
- `/api/driver`
- `/api/station`
- `/api/users`
- `/api/health`

## Notes

- Prisma commands should be run from `backend`.
- The backend now uses module-based architecture under `backend/src/modules`.
- Keep route/controller/service/repository separation for new features.
