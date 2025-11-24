# AppointMed Revamp

This project has been revamped with a modern tech stack.

## Structure

- **client_v2**: The frontend built with React, Vite, Tailwind CSS v4, and Redux Toolkit.
- **server.js**: The backend entry point.
- **controllers**, **models**, **routes**: Backend logic for user, doctor, and admin operations.
- **config**: Database configuration.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    cd client_v2
    npm install
    ```

2.  **Run the App:**
    From the root directory:
    ```bash
    npm run dev
    ```
    This will start both the backend (port 8080) and the new frontend (port 5173).

## Features

-   **User Role**: Book appointments, apply to be a doctor, view notifications.
-   **Doctor Role**: Manage appointments, update profile.
-   **Admin Role**: Manage users and doctors.
