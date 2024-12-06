import React, { useState } from "react";
import axios from "axios";
import './laptopTable.css'; // Import the CSS file
import IssueModal from "../issue/IssueModel";

const LaptopTable = ({ laptops, onEdit, onRemove }) => {
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchIssues = async (laptopId) => {
    try {
      const res = await axios.get(
        `https://laptop-management-backend-tjrg.onrender.com/api/issues/${laptopId}`,{headers:{token:localStorage.getItem('token')}}
      );
      setIssues(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching laptop issues:", error);
      alert(error.response?.data?.message || "Failed to fetch issues.");
    }
  };

  const handleViewIssues = (laptopId) => {
    fetchIssues(laptopId);
  };

  return (
    <div>
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((laptop) => (
            <tr key={laptop.id} className="table-row">
              <td className="table-cell">{laptop.brand}</td>
              <td className="table-cell">{laptop.model}</td>
              <td className="table-cell">{laptop.serialNumber}</td>
              <td className="table-cell">{laptop.status}</td>
              <td className="table-cell">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => onEdit(laptop)}
                    className="button button-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(laptop._id)}
                    className="button button-remove"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleViewIssues(laptop._id)}
                    className="button button-view"
                  >
                    View Issue
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <IssueModal issues={issues} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LaptopTable;