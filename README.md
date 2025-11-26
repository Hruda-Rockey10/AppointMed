# AppointMed - Doctor Appointment System

A modern, full-stack MERN application for booking doctor appointments, managing profiles, and admin controls.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Redux Toolkit, React Router v6
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs

## 📂 Project Structure

```
AppointMed/
├── client/                 # Frontend application (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices (state management)
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service layer
│   │   └── styles/         # Global styles (Tailwind)
├── server/                 # Backend application (Node + Express)
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth & error handling
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
└── README.md               # Project documentation
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd AppointMed
```

### 2. Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
NODE_MODE=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application

**Frontend:**
```bash
cd client
npm run dev
```

**Backend:**
```bash
cd server
npm run dev
```

## 🎨 Tailwind CSS v4

This project uses Tailwind CSS v4.
- **No CSS Modules:** All styling is done via utility classes.
- **Global Styles:** Defined in `client/src/styles/index.css`.
- **Configuration:** `client/tailwind.config.js` and `client/postcss.config.js`.

## 📝 API Endpoints

### Auth
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/register` - User registration

### User
- `POST /api/v1/user/getUserData` - Get user profile
- `POST /api/v1/user/apply-doctor` - Apply for doctor account
- `POST /api/v1/user/book-appointment` - Book an appointment

### Admin
- `GET /api/v1/admin/getAllUsers` - Get all users
- `GET /api/v1/admin/getAllDoctors` - Get all doctors
- `POST /api/v1/admin/changeAccountStatus` - Approve/Reject doctor

### Doctor
- `POST /api/v1/doctor/getDoctorInfo` - Get doctor details
- `POST /api/v1/doctor/updateProfile` - Update doctor profile
- `GET /api/v1/doctor/doctor-appointments` - Get appointments
