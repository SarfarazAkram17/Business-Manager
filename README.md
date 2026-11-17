<div align="center">

# Business Manager

**A modern, full-stack web app for tracking sales, expenses, inventory and profit.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-4169E1?logo=postgresql&logoColor=white)

</div>

---

## Overview

Business Manager gives small businesses a single place to record what they sell, what they spend and what they have in stock, then see the result as live profit figures, charts and monthly reports. Each account is fully isolated, so every user only ever sees their own data.

## Features

- **Authentication**: register and sign in with email and password. Passwords are hashed with bcrypt and sessions are stored in PostgreSQL.
- **Dashboard**: revenue, profit, expenses, net profit, total sales and items sold, filterable by day, week, month or year, with an area chart and recent sales.
- **Sales**: create, edit and delete sales with quantity, buy and sell price, notes and images. Profit is calculated automatically as `(sell price − buy price) × quantity`. Products can be picked straight from inventory, and sales can be filtered by date range.
- **Expenses**: track spending by category (Rent, Utilities, Supplies, Marketing, Salary, Transport, Other) with date filtering.
- **Inventory**: manage products with images, prices and stock quantity in a card grid with an image lightbox.
- **Reports**: monthly reports with a daily chart, top products and full sales and expense lists.
- **Settings**: business name, three dark themes (Amethyst, Emerald, Ocean) and 50+ currencies. Preferences are saved to your account and applied instantly.
- **PDF export**: download your sales, expenses and inventory for a chosen period.
- **Responsive UI**: collapsible sidebar, custom calendar and mobile-friendly layouts.

## Tech Stack

| Layer    | Technology                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| Frontend | React 19, Vite 7, TypeScript, Tailwind CSS 4, shadcn/ui (Radix), TanStack Query, Wouter, Recharts, Framer Motion, jsPDF |
| Backend  | Node.js, Express 5, TypeScript, Zod, express-session, bcryptjs, Pino                                                    |
| Database | PostgreSQL with Drizzle ORM and `connect-pg-simple` session store                                                       |
| Hosting  | Vercel (client), Render (server), any managed PostgreSQL such as Neon                                                   |

## Project Structure

```
business-manager/
├── client/                  # React + Vite single-page app
│   ├── public/
│   ├── src/
│   │   ├── api/             # Typed API client and React Query hooks
│   │   ├── components/      # Layout, dialogs and shadcn/ui components
│   │   ├── contexts/        # Auth and settings providers
│   │   ├── hooks/
│   │   ├── lib/             # Utilities and runtime config (API URL)
│   │   ├── pages/           # Dashboard, Sales, Expenses, Inventory, Reports, Settings
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── vercel.json
│   └── vite.config.ts
│
└── server/                  # Express REST API
    ├── src/
    │   ├── db/              # Drizzle connection and table schemas
    │   ├── lib/             # Logger
    │   ├── middlewares/     # Auth guard
    │   ├── routes/          # auth, sales, expenses, inventory, dashboard, reports, settings, user
    │   ├── validators/      # Zod request schemas
    │   ├── app.ts           # Express app (CORS, sessions, routes)
    │   └── index.ts         # Entry point
    ├── .env.example
    └── drizzle.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database (local, or a free hosted one such as [Neon](https://neon.tech))

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/business-manager.git
cd business-manager
```

### 2. Set up the server

```bash
cd server
cp .env.example .env     # then edit .env with your values
npm install
npm run db:push          # create the database tables
npm run dev              # API running on http://localhost:8080
```

### 3. Set up the client

Open a second terminal:

```bash
cd client
cp .env.example .env     # VITE_API_URL=http://localhost:8080
npm install
npm run dev              # App running on http://localhost:5173
```

Open <http://localhost:5173>, create an account and start adding data.

## Environment Variables

### Server (`server/.env`)

| Variable         | Required | Description                                                    |
| ---------------- | :------: | -------------------------------------------------------------- |
| `DATABASE_URL`   |   Yes    | PostgreSQL connection string                                   |
| `SESSION_SECRET` |   Yes    | Long random string used to sign session cookies                |
| `CLIENT_URL`     |   Yes    | Allowed frontend origin(s), comma-separated, no trailing slash |
| `PORT`           |    No    | Server port, defaults to `8080`                                |
| `NODE_ENV`       |    No    | Set to `production` when deployed                              |

Generate a secure session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Client (`client/.env`)

| Variable       | Required | Description                                                 |
| -------------- | :------: | ----------------------------------------------------------- |
| `VITE_API_URL` |   Yes    | Backend origin, with no trailing slash and no `/api` suffix |

> Vite embeds `VITE_*` variables at build time. Redeploy the client after changing them.

## Available Scripts

### Server

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start with auto-reload                  |
| `npm run build`     | Compile TypeScript to `dist/`           |
| `npm start`         | Run the compiled server                 |
| `npm run typecheck` | Type-check without emitting             |
| `npm run db:push`   | Sync the Drizzle schema to the database |

### Client

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the Vite dev server       |
| `npm run build`     | Type-check and build to `dist/` |
| `npm run preview`   | Preview the production build    |
| `npm run typecheck` | Type-check without emitting     |

## API Overview

All endpoints are prefixed with `/api` and, except for health and auth, require a signed-in session.

| Area      | Endpoints                                                                      |
| --------- | ------------------------------------------------------------------------------ |
| Health    | `GET /healthz`                                                                 |
| Auth      | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| Sales     | `GET/POST /sales`, `GET/PATCH/DELETE /sales/:id`                               |
| Expenses  | `GET/POST /expenses`, `PATCH/DELETE /expenses/:id`                             |
| Inventory | `GET/POST /inventory`, `PATCH/DELETE /inventory/:id`                           |
| Dashboard | `GET /dashboard/stats`, `GET /dashboard/chart`, `GET /dashboard/recent-sales`  |
| Reports   | `GET /reports/monthly`, `GET /reports/available-years`                         |
| Settings  | `GET/PATCH /settings`                                                          |
| User data | `DELETE /user/data`                                                            |

## Deployment

The client and server deploy separately. Deploy the server first so you have its URL for the client.

### Server on Render

1. Run `npm run db:push` once from your machine with `DATABASE_URL` pointing at the production database.
2. In Render, choose **New → Web Service** and connect your repository.
3. Configure the service:

   | Setting           | Value                                   |
   | ----------------- | --------------------------------------- |
   | Root Directory    | `server`                                |
   | Build Command     | `npm ci --include=dev && npm run build` |
   | Start Command     | `npm start`                             |
   | Health Check Path | `/api/healthz`                          |

4. Add environment variables: `DATABASE_URL`, `SESSION_SECRET`, `NODE_ENV=production` and `CLIENT_URL` (set after the client is deployed).
5. Deploy. Your API is now available at `https://<service-name>.onrender.com`.

### Client on Vercel

1. In Vercel, choose **Add New → Project** and import your repository.
2. Set **Root Directory** to `client`. The Vite preset is detected automatically (build `npm run build`, output `dist`).
3. Add the environment variable `VITE_API_URL=https://<service-name>.onrender.com`.
4. Deploy.
5. Copy the Vercel URL into `CLIENT_URL` on Render and redeploy the server.

### Notes

- **Cross-site cookies:** with the client and server on different domains, the session cookie is cross-site (`SameSite=None; Secure`). Safari and some privacy-focused browsers block this. For full compatibility, host both on one parent domain, for example `app.example.com` and `api.example.com`.
- **Cold starts:** Render's free tier sleeps when idle, so the first request after a pause can take up to a minute.

## Security

- Passwords are hashed with bcrypt and never stored in plain text.
- Session cookies are `HttpOnly`, and `Secure` with `SameSite=None` in production.
- CORS only allows the origins listed in `CLIENT_URL`.
- Request bodies are validated with Zod.
- Every record is scoped to the authenticated user.
- Secrets live in environment variables. Never commit `.env` files.