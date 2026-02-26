# 🏥 Hospital Management System (HMS)

A modern, full-stack Hospital Management System designed to streamline medical records, patient management, and administrative tasks. Built with performance, scalability, and ease of use in mind.

---

## 🚀 Features

- **🔐 Secure Authentication**: JWT-based login and registration for staff and admins.
- **👨‍💼 Admin Dashboard**: Comprehensive oversight of hospital statistics and management.
- **📋 Patient Management**: Effortlessly manage patient records, histories, and personal details.
- **🛡️ Role-Based Access Control**: Different permissions for Admins, Doctors, and Staff.
- **🎨 Modern UI**: Responsive design built with React 19 and Tailwind CSS 4.
- **🐳 Dockerized**: Fully containerized for consistent development and deployment.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (ODM: [Mongoose](https://mongoosejs.com/))
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

---

## 📂 Project Structure

```text
HMS/
├── Backend/            # Express.js server and API routes
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main entry point
├── src/                # React frontend source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Individual page views
│   ├── store/          # Redux state configuration
│   └── App.jsx         # Main application component
├── docker-compose.yml  # Docker orchestration
└── vite.config.js      # Frontend build configuration
```

---

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)
- [Docker](https://www.docker.com/products/docker-desktop) (Optional, for containerized setup)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/Mohitsp54/Hospital_Management_System.git
cd Hospital_Management_System/HMS
```

#### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

#### 3. Frontend Setup

```bash
# Return to the HMS root directory
cd ..
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

### 🐳 Docker Setup

Run the entire system using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `mongodb://localhost:27017`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
