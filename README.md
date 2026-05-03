# Zenvest

Zenvest is a full-stack stock trading dashboard built as a learning project. It includes a public landing site, an authenticated trading dashboard, and a Node.js/MongoDB backend for users, holdings, positions, orders, and portfolio data.

## Features

- Public React landing page
- Separate React dashboard app
- User authentication flow
- Holdings, positions, orders, funds, and watchlist screens
- Buy action workflow
- Express and MongoDB backend
- Environment-based backend configuration

## Project Structure

```text
Zenvest/
  backend/     Express API and MongoDB models
  frontend/    Public landing website
  dashboard/   Authenticated trading dashboard
```

## Local Setup

Install dependencies for each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../dashboard
npm install
```

Create a backend environment file:

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` with your MongoDB connection string:

```text
MONGO_URL=your_mongodb_connection_string
PORT=3002
```

Run the apps:

```bash
cd backend
npm start
```

```bash
cd frontend
npm start
```

```bash
cd dashboard
npm start
```

## Deployment

The public frontend is configured for Netlify using `netlify.toml`.

Netlify settings:

```text
Base directory: frontend
Build command: npm run build
Publish directory: build
```

The backend should be deployed separately on a Node hosting platform such as Render or Railway, with `MONGO_URL` configured in environment variables.

## Notes

This project was created for learning and portfolio use. It is not a real brokerage or financial trading platform.
