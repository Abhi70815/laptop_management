import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = localStorage.getItem('user');
  
  return (
    <nav className="navbar">
      <div className="navbar-title">Laptop Management</div>
      <div className="user-info">
        {user && (
          <>
            <span className="user-name">{user[0]}</span>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="logout-button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;