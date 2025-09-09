# Project Light IT

## Overview

This repository is a monorepo containing a Dockerized backend service and a frontend app, orchestrated via a single `docker-compose.yml`. This README focuses on the backend service, migrations, infrastructure, and email notifications. The frontend is intentionally omitted for now.

- **Monorepo**: `backend/` and `frontend/` under one root
- **Containerized**: Services run with Docker Compose
- **Database**: PostgreSQL 15.3
- **ORM & Migrations**: TypeORM (0.3.x)
- **Backend Framework**: NestJS (v11)
- **API Docs**: Swagger UI at `/docs`
- **Email**: SendGrid integration for confirmation emails


## Quick Start (with Docker)

You can use the provided script or run the commands manually.


### Manual commands


1) Copy file .env.example to .env

2) Update SENDGRID_API_KEY and SENDGRID_FROM with the received values

```bash
# 3) Build images
docker compose build --no-cache

# 4) Run database migrations (in a temporary backend container)
docker compose run --rm backend npm run migration:run

# 5) Start services
docker compose up -d
```

Once running:
- Backend API: `http://localhost:${PORT}` (defaults to 3000)
- Swagger UI: `http://localhost:${PORT}/docs`


## Repository Structure

- `backend/`: NestJS API, TypeORM config, migrations, email and notifications modules
- `frontend/`: Single Page Application made with Vite, React, Zustand, Radix, Axios and Styled-Components.
- `docker-compose.yml`: Orchestrates `db`, `backend`, and `frontend` services

## Prerequisites

- Docker and Docker Compose
- A SendGrid API key (if email delivery is needed)

## Environment Configuration

The system reads variables from root-level `.env` (and optionally `.env.local`). These values are used by Docker Compose and the backend configuration.

Minimum required variables:

```env
# App
PORT=3000
NODE_ENV=development

# Postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mydb
DB_HOST=localhost

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM=no-reply@example.com
```

## Services (Docker Compose)

`docker-compose.yml` defines:
- **db**: `postgres:15.3`, persists data in the named volume `pgdata`
- **backend**: Built from `backend/Dockerfile`, exposes `${PORT}:3000`, mounts `./backend/uploads` to `/app/uploads`

Uploads directory is persisted on the host under `backend/uploads`.

## Backend Details

- Framework: NestJS 11
- Validation: `class-validator` with a global `ValidationPipe`
- ORM: TypeORM 0.3.x
- DB: PostgreSQL
- API Docs: Swagger at `/docs` configured in `backend/src/main.ts`
- Static files: Serving uploads under `/uploads` via `ServeStaticModule`

### Migrations

TypeORM data source and migrations are configured in `backend/src/config/typeorm.config.ts`. Scripts available in `backend/package.json`:

```bash
# Generate a new migration
npm run migration:generate

# Apply migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

When using Docker, run them via `docker compose run --rm backend <script>` as shown above.


### Patients Module (high level)

- Endpoints: Create, read, update, and soft-delete patients
- On create (POST), a confirmation email is sent to the provided `email`
- Uploads: Accepts only JPEG images and stores them under `backend/uploads/` with a public URL at `/uploads/<filename>`
- Unique constraint: Ensures email uniqueness; returns conflict if duplicated

### Running the Backend Locally (without Docker)

```bash
# From backend/
cp ../.env.example ../.env  # if you maintain examples
npm install

# Ensure Postgres is running locally and env vars match your DB
npm run migration:run
npm run start:dev
```

Then open:
- API: `http://localhost:3000`
- Docs: `http://localhost:3000/docs`

## Frontend Details

- Vite: 7.1
- React: 19.1
- UI: Radix
- Styles: styled-components
- State management: Zustand
- HTTP Client: Axios