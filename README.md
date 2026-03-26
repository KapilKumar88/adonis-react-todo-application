# Adonis React Todo Application

A full-stack Todo application built with **AdonisJS 6 (TypeScript)** for the backend and **React (Vite, TypeScript, shadcn-ui, Tailwind CSS)** for the frontend.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
	- [Backend Setup (AdonisJS)](#backend-setup-adonisjs)
	- [Frontend Setup (React)](#frontend-setup-react)
- [Development Scripts](#development-scripts)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Best Practices](#best-practices)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## Project Structure

```
.
├── client/   # React frontend (Vite, shadcn-ui, Tailwind CSS)
└── server/   # AdonisJS 6 backend (TypeScript, Lucid ORM)
```

---

## Tech Stack

- **Backend:** AdonisJS 6, TypeScript, Lucid ORM, VineJS (validation)
- **Frontend:** React, Vite, TypeScript, shadcn-ui, Tailwind CSS

---

## Setup Instructions

### Backend Setup (AdonisJS)

1. **Install dependencies:**
	 ```sh
	 cd server
	 npm install
	 ```

2. **Configure environment:**
	 - Copy `.env.example` to `.env` and update values as needed.

3. **Run migrations and seeders:**
	 ```sh
	 node ace migration:run
	 node ace db:seed
	 ```

4. **Start the backend server:**
	 ```sh
	 npm run dev
	 ```
	 The server runs by default on [http://localhost:3333](http://localhost:3333).

---

### Frontend Setup (React)

1. **Install dependencies:**
	 ```sh
	 cd client
	 npm install
	 ```

2. **Configure environment:**
	 - If needed, copy `.env.example` to `.env` and update values.

3. **Start the frontend dev server:**
	 ```sh
	 npm run dev
	 ```
	 The app runs by default on [http://localhost:5173](http://localhost:5173).

---

## Development Scripts

### Backend (from `/server`):

- `npm run dev` — Start AdonisJS server with HMR
- `npm run build` — Build for production
- `npm run test` — Run backend tests
- `npm run lint` — Lint backend code

### Frontend (from `/client`):

- `npm run dev` — Start Vite dev server
- `npm run build` — Build frontend for production
- `npm run test` — Run frontend tests (Vitest)
- `npm run lint` — Lint frontend code

---

## Environment Variables

### Backend (`/server/.env.example`):

```
# Node
TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=development

# App
LOG_LEVEL=info
APP_KEY=
APP_URL=http://${HOST}:${PORT}

# Session
SESSION_DRIVER=cookie

# CORS (configure allowed origins for API access)
# CORS_ORIGIN=http://localhost:5173,http://localhost:3000

MAIL_MAILER=smtp
MAIL_FROM_NAME=Your name
MAIL_FROM_ADDRESS=app@yourdomain.com
SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=

# storage drive configuration
DRIVE_DISK=fs
```

### Frontend (`/client/.env.example`):

```
# (Currently empty. Add frontend environment variables as needed.)
```

---

## API Documentation

- The backend API is documented using OpenAPI (Swagger).
- See `/server/swagger/openapi.yaml` for the full API schema.
- Example API base URL: `http://localhost:3333/api/v1`

**Authentication:**
- Uses Bearer token authentication for protected routes.

**Sample User Schema:**
```yaml
User:
	type: object
	properties:
		fullName:
			type: string
			nullable: true
			example: John Doe
		email:
			type: string
			format: email
			example: john@example.com
		initials:
			type: string
			example: JD
		bio:
			type: string
			nullable: true
			example: Software developer
		profileImage:
			type: string
			nullable: true
			example: http://localhost:3333/uploads/profiles/sample.png
		roles:
			type: object
			properties:
				name:
					type: string
					example: editor
				displayName:
					type: string
					nullable: true
					example: Editor
				permissions:
					type: array
					items:
						type: string
					example: ["users:create", "todos:update"]
```

---

## Best Practices

- **AdonisJS:**
	- Use thin controllers, move business logic to services.
	- Validate all input with VineJS.
	- Use Lucid ORM for DB access.
	- Follow TypeScript-first conventions.
- **React:**
	- Use hooks for state and effects.
	- Keep components modular.
	- Use TanStack Query for data fetching.
	- Follow shadcn-ui and Tailwind CSS conventions for UI.

---

## Testing

- **Backend:** Use AdonisJS built-in testing tools (`node ace test`).
- **Frontend:** Use Vitest (`npm run test` in `/client`).

---

## Deployment

- **Backend:** Build and deploy the `/server` directory as a Node.js app.
- **Frontend:** Build the `/client` app with `npm run build` and serve the static files.

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bugfix.
2. Follow the code style and best practices for AdonisJS and React.
3. Write clear commit messages and update documentation as needed.
4. Ensure all tests pass before submitting a pull request.
5. Submit a pull request describing your changes.

---

## Items Pending

-> Settings page implementation 
-> Redis
-> Query optimization
-> deployment

---
