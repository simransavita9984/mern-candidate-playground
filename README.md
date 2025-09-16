# Candidate Playground 

A simple MERN app that stores my candidate profile in MongoDB and exposes APIs + a minimal frontend to search projects by skills.

## 🌐 Live Demo
[Live Link](https://mern-candidate-playground.onrender.com/) 

## Features
- CRUD APIs for profile, skills, projects, work
- Query endpoints: search by skill, top skills, search
- MongoDB with Mongoose models
- Seed data using `backend/seedData.js`
- Minimal React UI calling hosted API
- Health check endpoint

## Tech Stack
- MongoDB (Atlas)
- Express.js + Node.js
- React.js

## Database
- Schema defined in `backend/models/*`
- Seed data available in `backend/seedData.js`

## API Endpoints
- `GET /health` 
- `GET /profile`
- `POST /profile`
- `PUT /profile/:id`
- `GET /projects?skill=python`
- `GET /skills/top`
- `GET /search?q=...`

## API Testing
- I tested all API endpoints using **Postman**.  
- Verified CRUD operations for profile, projects, and skills.  
- Checked query endpoints like `/projects?skill=python` and `/search?q=...`.  
- Confirmed `GET /health` endpoint for liveness.  

### Online API Docs
View the live Postman documentation here: [Postman Docs](https://simran-savita-s-team.postman.co/workspace/Simran-Savita's-Workspace~754ce820-207d-48bb-87a7-417b5c2224d8/request/47949641-1d0f414a-f32e-4207-b8ec-c80c8d1d2e50?action=share&creator=47949641&ctx=documentation)

