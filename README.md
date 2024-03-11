<h1 align="center">
    SCHOOL ASSESSMENT SYSTEM
</h1>

<h3 align="center">
School assessment system boilerplate
</h3>

<br>

[Video](https://www.loom.com/share/9f138b30b6274b82a81d9123edbee932)
<br><br>
# About

The School Assessment System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- **User Roles:** The system supports two user roles: Admin, Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and create assessments and track student's assessment.

- **Student:** Student can submit MCQ assessments.
## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

# Installation

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
npm start
```

Create a file called .env in the backend folder.
Inside it write this :

MONGO_URL = mongodb://127.0.0.1/school

Instead of this link write your database link.

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:5000`.

If this is not working then go to the src > redux > userRelated > userHandle.js

Write this after the import statements :

const REACT_APP_BASE_URL = "http://localhost:5000"

Now replace all process.env.REACT_APP_BASE_URL with REACT_APP_BASE_URL.

The problem here was that the .env file in the frontend was not working for other users while it works for me.
So you have to do this in the frontend. After this the project will run smoothly if not then you can contact me.

<br>

# Deployment
* Render - server side
* Netlify - client side

