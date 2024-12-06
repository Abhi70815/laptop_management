import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css'; // Import the CSS file
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Corrected toast messages
    toast.info(" Admin:-  Admin@gmail.com, Password: 1234");
    toast.info(" Guest:-  Email: Guest@gmail.com, Password: 1234");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://laptop-management-backend-tjrg.onrender.com/api/users/login", {
        email,
        password,
      });
      login(res.data.user);
      localStorage.setItem('user', res.data.user.name);
      localStorage.setItem('token', res.data.token);
      navigate(res.data.user.isAdmin ? "/admin" : "/employee");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-container">
         <ToastContainer />
      <form
        onSubmit={handleLogin}
        className="login-form"
      >
        <h2>Login for All</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
         Login
        </button>
      </form>
    </div>
  );
};

export default Login;