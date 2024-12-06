import React, { useState, useEffect } from "react";
import axios from "axios";
import './RequestList.css'; // Import the CSS file

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests", { headers: { token: localStorage.getItem("token") } });
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status }, { headers: { token: localStorage.getItem('token') } }
      );
      alert(res.data.message);
      fetchRequests(); // Refresh requests
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="request-list">
      <h2 className="mb-4">Laptop Requests</h2>
      {requests.length > 0 ? (
        <table className="request-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>
                  {request.employeeId.name} ({request.employeeId.email})
                </td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  <button
                    onClick={() => updateRequestStatus(request._id, "Approved")}
                    className="request-button approve"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request._id, "Rejected")}
                    className="request-button reject"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default RequestList;