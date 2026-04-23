# Littol Udemy

A full-stack course management web application — a lightweight Udemy-inspired platform where users can browse, create, manage, and search courses with a clean dashboard interface.

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Access & refresh token auth |
| bcrypt | Password hashing |
| Multer | File uploads (thumbnails, profile images) |
| cookie-parser | HTTP-only refresh token cookie |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS 4 | Styling |
| Zustand | Global state management |
| React Router v7 | Client-side routing |
| Axios | HTTP client |

---

## Features

- **Authentication** — Register, log in, log out with JWT access tokens and rotating refresh tokens stored in HTTP-only cookies
- **Protected Routes** — All authenticated pages are guarded on both client and server
- **Course Management** — Full CRUD: create, read, update, and delete courses with thumbnail uploads
- **Course Discovery** — Search courses by keyword and filter by category/level with pagination
- **User Profile** — View and edit profile details including profile picture upload
- **Dashboard** — Metrics overview cards summarising course data

---

## Project Structure

```
littol_udemy/
├── littol_backend/         # Express REST API
│   └── src/
│       ├── auth/           # JWT token helpers
│       ├── config/         # Environment config
│       ├── controllers/    # Request handlers
│       ├── database/       # MongoDB connection
│       ├── middlewares/    # Auth, file upload, error handling
│       ├── models/         # Mongoose schemas (User, Course)
│       ├── repositories/   # DB query layer
│       ├── routes/         # API route definitions
│       └── services/       # Business logic layer
│
└── littol_frontend/        # React + Vite SPA
    └── src/
        ├── components/     # Reusable UI components
        ├── hooks/          # Custom React hooks
        ├── pages/          # Route-level page components
        ├── services/       # Axios API service functions
        ├── store/          # Zustand global state
        └── utils/          # Helpers & ProtectedRoute
```

---

## API Reference

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Log in, receive access token |
| POST | `/refresh` | Refresh access token via cookie |
| POST | `/logout` | Log out, clear refresh token |

### Courses — `/api/course`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/getCourses` | — | List all courses (paginated) |
| GET | `/getCourse/:id` | ✓ | Get a single course |
| POST | `/createCourse` | ✓ | Create a course with thumbnail |
| PUT | `/updateCourse/:id` | ✓ | Update a course |
| DELETE | `/deleteCourse/:id` | ✓ | Delete a course |
| GET | `/searchCourse?q=` | ✓ | Search courses by keyword |
| GET | `/filterCourse` | — | Filter courses by category/level |

### Profile — `/api/profile`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/profile` | ✓ | Get current user profile |
| PUT | `/edit-profile` | ✓ | Update profile & picture |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend Setup

```bash
cd littol_backend
npm install
```

Create a `.env` file in `littol_backend/`:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/littol_db
FRONTEND_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Start the development server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd littol_frontend
npm install
```

Create a `.env` file in `littol_frontend/`:

```env
VITE_BACKEND_SERVER_AUTH=http://localhost:5000/api/auth
VITE_BACKEND_SERVER_COURSE=http://localhost:5000/api/course
VITE_BACKEND_SERVER_PROFILE=http://localhost:5000/api/profile
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Data Models

### User
| Field | Type | Notes |
|---|---|---|
| fullname | String | Optional display name |
| email | String | Unique, required |
| passwordHash | String | bcrypt hashed |
| profilePicFilePath | String | Uploaded image path |
| refreshToken | String | Rotating JWT refresh token |

### Course
| Field | Type | Notes |
|---|---|---|
| title | String | Required |
| description | String | Required |
| instructor | String | Required |
| category | String | Required |
| level | String | `Beginner` / `Intermediate` / `Advanced` |
| thumbnailFilePath | String | Uploaded image path |
