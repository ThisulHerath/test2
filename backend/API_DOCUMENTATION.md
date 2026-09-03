# Campus Event Manager - API Documentation (Person 1)

This document provides the API contract for the Campus Event Manager backend. Frontend developers (**Person 2** and **Person 3**) can integrate their React applications using these specified endpoints and payload formats.

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`

---

## Data Models

### Event Object
```json
{
  "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Hackathon 2026",
  "description": "Annual campus codefest and building competition.",
  "date": "2026-10-15T09:00:00.000Z",
  "location": "Main Auditorium",
  "category": "Competition",
  "capacity": 100,
  "registrations": 12,
  "createdAt": "2026-09-03T12:00:00.000Z",
  "updatedAt": "2026-09-03T12:30:00.000Z"
}
```

#### Allowed Categories:
- `Workshop`
- `Competition`
- `Seminar`
- `Social`
- `Other`

---

## API Endpoints

### 1. Get All Events
Retrieves a list of all events. Supports optional query parameters for search and filtering.

- **HTTP Method**: `GET`
- **Endpoint**: `/api/events`
- **Query Parameters (Optional)**:
  - `search` *(string)*: Search term matching title, description, or location (case-insensitive regex).
  - `category` *(string)*: Filter by event category (`Workshop`, `Competition`, `Seminar`, `Social`, `Other`). Use `All` or omit to get all categories.

#### Example Request:
```http
GET /api/events?search=code&category=Competition
```

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "title": "Hackathon 2026",
      "description": "Annual campus codefest and building competition.",
      "date": "2026-10-15T09:00:00.000Z",
      "location": "Main Auditorium",
      "category": "Competition",
      "capacity": 100,
      "registrations": 12,
      "createdAt": "2026-09-03T12:00:00.000Z",
      "updatedAt": "2026-09-03T12:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Event by ID
Retrieves details for a specific event by its ID.

- **HTTP Method**: `GET`
- **Endpoint**: `/api/events/:id`

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Hackathon 2026",
    "description": "Annual campus codefest and building competition.",
    "date": "2026-10-15T09:00:00.000Z",
    "location": "Main Auditorium",
    "category": "Competition",
    "capacity": 100,
    "registrations": 12,
    "createdAt": "2026-09-03T12:00:00.000Z",
    "updatedAt": "2026-09-03T12:30:00.000Z"
  }
}
```

#### Error Responses:
- **`400 Bad Request`** (Invalid ID format):
  ```json
  {
    "success": false,
    "message": "Invalid ID format"
  }
  ```
- **`404 Not Found`** (Event not found):
  ```json
  {
    "success": false,
    "message": "Event not found"
  }
  ```

---

### 3. Create Event
Creates a new event.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/events`
- **Request Body**:
  ```json
  {
    "title": "React & Node Workshop",
    "description": "Hands-on MERN stack web application development workshop.",
    "date": "2026-11-20T14:00:00.000Z",
    "location": "Lab 3, CS Department",
    "category": "Workshop",
    "capacity": 50
  }
  ```

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
    "title": "React & Node Workshop",
    "description": "Hands-on MERN stack web application development workshop.",
    "date": "2026-11-20T14:00:00.000Z",
    "location": "Lab 3, CS Department",
    "category": "Workshop",
    "capacity": 50,
    "registrations": 0,
    "createdAt": "2026-09-03T12:35:00.000Z",
    "updatedAt": "2026-09-03T12:35:00.000Z"
  }
}
```

#### Error Responses:
- **`400 Bad Request`** (Validation failure):
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": [
      "Title is required and must be a non-empty string.",
      "Capacity must be a positive number greater than 0."
    ]
  }
  ```

---

### 4. Update Event
Updates an existing event by ID.

- **HTTP Method**: `PUT`
- **Endpoint**: `/api/events/:id`
- **Request Body** (partial or full updates):
  ```json
  {
    "capacity": 75,
    "location": "Auditorium B"
  }
  ```

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
    "title": "React & Node Workshop",
    "description": "Hands-on MERN stack web application development workshop.",
    "date": "2026-11-20T14:00:00.000Z",
    "location": "Auditorium B",
    "category": "Workshop",
    "capacity": 75,
    "registrations": 0,
    "createdAt": "2026-09-03T12:35:00.000Z",
    "updatedAt": "2026-09-03T12:40:00.000Z"
  }
}
```

#### Error Responses:
- **`400 Bad Request`** (Capacity lower than current registrations):
  ```json
  {
    "success": false,
    "message": "Capacity cannot be set lower than current registrations (12)."
  }
  ```

---

### 5. Delete Event
Deletes an event by ID.

- **HTTP Method**: `DELETE`
- **Endpoint**: `/api/events/:id`

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d2"
  }
}
```

---

### 6. Register for Event
Increments the registration count for an event. Prevents registration if capacity is full.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/events/:id/register`
- **Request Body**: Empty `{}`

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "message": "Successfully registered for the event!",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Hackathon 2026",
    "description": "Annual campus codefest and building competition.",
    "date": "2026-10-15T09:00:00.000Z",
    "location": "Main Auditorium",
    "category": "Competition",
    "capacity": 100,
    "registrations": 13,
    "createdAt": "2026-09-03T12:00:00.000Z",
    "updatedAt": "2026-09-03T12:45:00.000Z"
  }
}
```

#### Error Responses:
- **`400 Bad Request`** (Capacity reached):
  ```json
  {
    "success": false,
    "message": "Event has reached maximum capacity. Registration closed."
  }
  ```
- **`404 Not Found`** (Event not found):
  ```json
  {
    "success": false,
    "message": "Event not found"
  }
  ```
