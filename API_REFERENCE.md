# 🧾 API Reference – Haaflah Backend

Welcome to the **Haaflah Backend API Documentation**.  
This document outlines the available endpoints within the **Event Management Platform** built for **Hacktoberfest**.  

**Base URL:**  
```
https://haaflah-backend.onrender.com
```

---

## 🧍‍♂️ Organizer Onboarding

### 1️⃣ Register an Organizer

**Endpoint:**  
```
POST {{api_url}}/auth/register
```

**Description:**  
Allows a new organizer to sign up and create an account on the platform.

**Request Body:**
```json
{
  "name": "Hammed",
  "email": "hammed@gmail.com",
  "password": "hammed123"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "d4751fee-fe8f-4077-ae6f-3d8ccb8b6cf9",
    "name": "Hammed",
    "email": "hammed@gmail.com",
    "role": "organizer",
    "createdAt": "2025-10-22T10:58:30.826Z",
    "updatedAt": "2025-10-22T10:58:30.826Z"
  }
}
```

### 2️⃣ Organizer Login

**Endpoint:**  
```
POST {{api_url}}/auth/login
```

**Description:**  
Authenticates an existing organizer and returns a JWT token for accessing protected routes.

**Request Body:**
```json
{
  "email": "hammed@gmail.com",
  "password": "hammed123"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "d4751fee-fe8f-4077-ae6f-3d8ccb8b6cf9",
    "name": "Hammed",
    "email": "hammed@gmail.com",
    "role": "organizer",
    "createdAt": "2025-10-22T10:58:30.826Z",
    "updatedAt": "2025-10-22T10:58:30.826Z"
  }
}
```

### 3️⃣ Forgot Password

**Endpoint:**  
```
POST {{api_url}}/auth/forgot-password
```

**Description:**  
Sends a password reset link to the organizer’s registered email.

**Request Body:**
```json
{
  "email": "hammed@gmail.com"
}
```

**Response:**
```json
{
  "message": "Password reset link sent to your email"
}
```

✅ **Notes:**
- A reset link is sent to the provided email.  
- The reset link will later be used for the password reset endpoint (coming soon).

---

## 🗂️ Event Creation and Editing *(In Progress)*

### Overview  
Endpoints under this module will allow authenticated organizers to create, edit, and manage events.

### Planned Endpoints:
| Endpoint | Method | Description | Auth Required |
|-----------|---------|--------------|----------------|
| `/events` | `POST` | Create a new event | ✅ |
| `/events/:id` | `PUT` | Edit existing event details | ✅ |
| `/events/:id` | `DELETE` | Delete an event | ✅ |
| `/events` | `GET` | Get all events created by the organizer | ✅ |

### Example (Upcoming):
```json
POST /events
{
  "title": "Tech Conference 2025",
  "date": "2025-11-05",
  "venue": "Lagos Civic Centre",
  "description": "An annual tech innovation summit for developers and startups."
}
```


- All responses follow standard JSON format.  
- Error responses typically look like:
```json
{
  "error": "Invalid credentials"
}
```
- All authenticated routes require:
  ```
  Authorization: Bearer <token>
  ```