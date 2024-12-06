import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [laptops, setLaptops] = useState([]);
  const [issues, setIssues] = useState([]);

  const login = (userData) => setUser (userData);
  const logout = () => {
    setUser (null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchLaptops = async () => {
    try {
      const res = await axios.get("https://laptop-management-backend-tjrg.onrender.com/api/laptops", {
        headers: { token: localStorage.getItem("token") },
      });
      setLaptops(res.data);
    } catch (error) {
      console.error("Error fetching laptops:", error);
    }
  };

  const fetchIssues = async () => {
    try {
      const res = await axios.get("https://laptop-management-backend-tjrg.onrender.com/api/issues", {
        headers: { token: localStorage.getItem("token") },
      });
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchLaptops();
    fetchIssues();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser ,
        fetchLaptops,
        laptops,
        setLaptops,
        fetchIssues,
        issues,
        setIssues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);