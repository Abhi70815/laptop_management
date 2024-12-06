import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import '../pages/admin.css'; // Import the CSS file
import OverviewCard from "../components/request/OverciewCard";
import EmployeeTable from "../components/Employee/EmployeeTable";
import LaptopTable from "../components/laptop/LaptopTable";
import LaptopEditModal from "../components/laptop/LaptopEditModal";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        assigned: 0,
        available: 0,
        maintenance: 0,
    });
    const [laptops, setLaptops] = useState([]);
    const [editLaptop, setEditLaptop] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchLaptops();
        fetchEmployees();
    }, []);

    const fetchStats = async () => {
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(res.data);
    };

    const fetchLaptops = async () => {
        const res = await axios.get("http://localhost:5000/api/laptops/", {
            headers: { token: localStorage.getItem("token") },
        });
        setLaptops(res.data);
    };

    const fetchEmployees = async () => {
        const res = await axios.get("http://localhost:5000/api/employees", {
            headers: { token: localStorage.getItem("token") },
        });
        setEmployees(res.data);
    };

    const handleRemoveEmployee = async (id) => {
        if (window.confirm("Are you sure you want to remove this employee?")) {
            await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                headers: { token: localStorage.getItem("token") },
            });
            fetchEmployees();
        }
    };

    const handleEdit = (laptop) => {
        setEditLaptop(laptop);
    };

    const handleRemove = async (id) => {
        if (window.confirm("Are you sure you want to delete this laptop?")) {
            await axios.delete(`http://localhost:5000/api/laptops/${id}`, {
                headers: { token: localStorage.getItem("token") },
            });
            fetchLaptops();
        }
    };

    const handleSave = async () => {
        await axios.put(
            `http://localhost:5000/api/laptops/${editLaptop._id}`,
            editLaptop, { headers: { token: localStorage.getItem('token') } }
        );
        setEditLaptop(null);
        fetchLaptops();
        fetchStats();
    };

    const handleCloseModal = () => {
        setEditLaptop(null);
    };

    return (
        <div className="admin-dashboard">
            <div className="button-container">
            <h1>Admin Dashboard</h1>
                <button onClick={() => navigate("/add-employee")} className="button button-blue">Add Employee</button>
                <button onClick={() => navigate("/add-laptop")} className="button button-green">Add Laptop</button>
                <button onClick={() => navigate("/assign-laptop")} className="button button-purple">Assign Laptop</button>
                <button onClick={() => navigate("/requests")} className="button button-purple">View Requests</button>
                <button onClick={() => navigate("/create-issue")} className="button button-red">Create Issue</button>
            </div>
            <div className="admin-content">
                <div className="overview-cards">
                    <OverviewCard label="Total Laptops" value={stats.total} />
                    <OverviewCard label="Assigned" value={stats.assigned} />
                    <OverviewCard label="Available" value={stats.available} />
                    <OverviewCard label="Under Maintenance" value={stats.maintenance} />
                </div>
                <h2>Employee List</h2>
                <EmployeeTable employees={employees} onRemove={handleRemoveEmployee} />
                <h2>All Laptops</h2>
                <LaptopTable laptops={laptops} onEdit={handleEdit} onRemove={handleRemove} />
                <LaptopEditModal laptop={editLaptop} onClose={handleCloseModal} onSave={handleSave} setLaptop={setEditLaptop} />
            </div>
        </div>
    );
};

export default AdminDashboard;