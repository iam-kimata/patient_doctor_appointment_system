import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users'
import DoctorDashboard from './pages/Doctor/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/dashboard" element={<DoctorDashboard />} />
    </Routes>
  );
};

export default App;
