# Security Incident Console

A security incident console with a React frontend, a Node.js API, and a local SQLite database.

## What it demonstrates

- React component composition and API-backed state
- TypeScript unions and interface-based data modeling
- Derived filtering without duplicated result state
- List and card views backed by the same data
- SQLite persistence and incident acknowledgement business rules
- Responsive layout and visible keyboard focus

## Run locally

Requires Node.js 24 or newer for the built-in `node:sqlite` module.

1. Run `npm install`.
2. Run `npm run dev` to start the API and Vite frontend.
3. Open the local URL printed by Vite. The frontend proxies `/api` requests to the backend on port 3001.

The API can also be run on its own with `npm start`. It listens on port 3001 by default. The SQLite database is created at `server/data/incidents.sqlite`; set `DATABASE_PATH` to use another location. The database is seeded with the sample incidents only when it is empty.

The API supports `GET /api/incidents` and `PATCH /api/incidents/:id/acknowledge`. Only active incidents can be acknowledged; unknown incidents return `404`, and invalid status transitions return `409`.

## Validate

- Run `npm run lint`.
- Run `npm run build`.
- Run `npm test` for frontend and API tests.

## Technical decision

The project uses synthetic data rather than a proprietary SDK or live security system. This keeps the demo safe and reproducible while demonstrating frontend workflows, API business logic, persistence, and accessibility.

## Product inspiration

The interaction is inspired by publicly documented Genetec Web App reporting concepts such as report filtering, list and card views, and opening a selected result in a details pane. It is an independent learning project and is not affiliated with or endorsed by Genetec.
