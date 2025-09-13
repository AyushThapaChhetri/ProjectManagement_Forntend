
# FocusTrack

A Kanban-style task management web application built with the PERN (PostgreSQL, Express.js, React, Node.js) stack. FocusTrack enables teams to create, edit, and prioritize tasks with drag-and-drop functionality, while emphasizing a clean, responsive frontend built with React and Chakra UI. The app supports role-based authorization, secure authentication, and scalable backend logic via the Repository Pattern.


## Features

(Frontend-Focused Highlights)

- Kanban Board Management: Drag-and-drop tasks between columns, with real-time updates and mobile-optimized CSS for seamless interaction.
- Task Creation & Editing: Inline editing, deadline prioritization, and reusable components for forms (e.g., signup, project/task modals) with validation and error handling.
- User & Project Handling: Fetch and assign users to tasks/projects, with pagination, editable tables, and local storage for offline persistence.
- Authentication & Authorization: Secure login/signup with schema validation, role-based access, and centralized error handling for API calls.
- Navigation & Routing: Sidebar with deep linking, React Router for SPA navigation, and responsive layouts (fixed mobile issues like input focus on Safari).
- Additional UI Enhancements: Contact/About pages, reusable components (e.g., for login/signup), and deployment optimizations for Vercel.

(Backend Notes for Completeness)

- Role-Based Authorization and secure user authentication.
- Repository Pattern in Node.js for scalable logic.
- Backend APIs documented with Swagger UI.

## Tech Stack

**Client:** React, Chakra UI (for styling and components), TypeScript (with config fixes for typings).

**Server:** Node.js (Express), PostgreSQL, Repository Pattern.

**Other:** Vercel (for deployment with SPA routing), Local Storage (for state persistence), Axios/Fetch (for API integration).

## Prerequisites
- Node.js 18+ (with npm(backend) or yarn(Frontend))
- PostgreSQL (for backend database)
- Git
## Installation

1. Clone the Repository:
```bash
git clone https://github.com/AyushThapaChhetri/ProjectManagement_Forntend.git
cd FocusTrack
```

2. Set Up Virtual Environment:
```bash
cd client  # or frontend directory if separate
npm install  # or yarn install
```
3. Install Dependencies:
```bash
cd server  # or backend directory
npm install
```
4. Configure Environment:
- Create .env files in frontend/backend directories (e.g., REACT_APP_API_URL for frontend, DATABASE_URL for backend).
- Do not commit .env files—use .env.example as a template.
```bash

```





5. Database Setup:

```bash
cd server
npm run migrate
```

6. Create Superuser (for admin access):
```bash
python manage.py createsuperuser
```

7. Run the Frontend Development Server:

```bash
(Terminal 1)
cd client
npm start
```

8. Run the Backend Server:
```bash
(Terminal 2)
cd server
npm run dev
```



## Usage/Examples

- Login/Signup: Access auth pages to create an account or log in with secure validation.
- Dashboard: View projects via sidebar; select a project to load Kanban board with tasks.
- Manage Tasks: Create/edit tasks, drag between columns (To Do, In Progress, Done), assign users, and set deadlines.
- Projects: Add/edit/delete projects; join via UID with error-handled API calls.
- Users: Admin views for user management with pagination and delete functionality.

Explore the app's responsive design on mobile—boards adapt with fixed scroll and CSS overflows.