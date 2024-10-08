# ToDo API

A solution for ToDo List Project on [ToDo List API](https://roadmap.sh/projects/todo-list-api)

---

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 20.x or higher)
- **npm** (Node Package Manager)

---

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/omerfaruqb/todo-api
   cd todo-api
   ```

2. Install required dependencies
   ```bash
   npm install
   ```

---

### Usage

1. Start server
   ```bash
   npm start
   ```
2. The server will be running on http://localhost:3000 by default.

---

### Features

- **User Management**:
  - Create new users
  - Authenticate users via login, generating a JWT token
- **Task Management**:
  - Perform CRUD operations for tasks
- **Persistent Storage**:
  - Utilize SQLite to store user and task data

---

## Technologies Used

- **Express.js**
- **SQLite**
- **JWT Authentication**
- **RESTful API Design**
