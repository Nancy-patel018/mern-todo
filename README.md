# Simple MERN Todo App

This workspace contains a minimal MERN (MongoDB, Express, React, Node) todo app.

Structure:
- server/ - Express + Mongoose API
- client/ - React app created with Create React App structure

## Quick start

1. Start MongoDB (e.g., using Docker or local mongod)

2. Server

- cd server
- copy `.env.example` to `.env` and edit if needed
- npm install
- npm run dev

Server runs at http://localhost:5000

3. Client

- cd client
- npm install
- npm start

Client runs at http://localhost:3000 and expects API at http://localhost:5000/api


Notes
- This is intentionally minimal. Add validation, error handling, and tests as needed.
