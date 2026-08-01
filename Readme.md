# Employee Management System

A polished employee management app with a React frontend and an Express/MongoDB backend.

## Features
- Add, edit, and delete employees
- Responsive dashboard UI
- Works in demo mode without MongoDB configured
- Ready for Vercel frontend deployment

## Run locally
### Backend
```bash
cd server
npm install
cp .env.example .env
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```
## Deploy to Vercel
1. Create a Vercel project for the client folder.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. For the API, deploy the server separately or connect your own backend host.
