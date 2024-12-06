import React, { useState, useEffect } from "react";
import axios from "axios";
import LaptopDetails from "../components/laptop/LaptopDetails";
import RequestForm from "../components/request/RequestForm";
import IssueForm from "../components/issue/IssueForm";
import './employeePortal.css'; // Import the CSS file

const EmployeePortal = () => {
  const [assignedLaptop, setAssignedLaptop] = useState(null);
  const [laptopRequest, setLaptopRequest] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [laptopId, setLaptopId] = useState("");
  let user = localStorage.getItem('user')
  const [issue, setIssue] = useState({ laptopId: "", description: "", priority: "Low", reportedBy:user });

  useEffect(() => {
    fetchAssignedLaptop();
  }, []);

  const fetchAssignedLaptop = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments", {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data.length > 0) {
        setAssignedLaptop(res.data);
        setEmployeeId(res.data[0].employeeId._id);
        setLaptopId(res.data[0].laptopId._id); // Set laptopId from the fetched data
        console.log(res.data[0].laptopId._id);
        setIssue((prev) => ({ ...prev, laptopId: res.data[0].laptopId._id })); // Update issue state
      } else {
        console.log("No assigned laptops found.");
      }
    } catch (error) {
      console.error("Error fetching assigned laptop:", error);
      alert("Failed to fetch assigned laptop. Please try again.");
    }
  };

  const handleRequestLaptop = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/requests",
        {
          employeeId,
          reason: laptopRequest,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      alert("Request submitted.");
      setLaptopRequest("");
    } catch (error) {
      console.error("Error submitting laptop request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/issues", issue, {
        headers: { token: localStorage.getItem("token") },
      });
      alert("Issue reported.");
      setIssue({ laptopId: "", description: "", priority: "Low" }); // Reset issue state
    } catch (error) {
      console.error("Error reporting issue:", error.message);
      alert("Failed to report issue. Please try again.");
    }
  };

  return (
    <div className="employee-portal">
      <h1>Employee Portal</h1>

      {/* Assigned Laptop */}
      <h2>Assigned Laptop</h2>
      <LaptopDetails
        laptop={assignedLaptop}
        fetchAssignedLaptop={fetchAssignedLaptop}
      />

      {/* Request New Laptop */}
      <h2>Request New Laptop</h2>
      <RequestForm
        requestText={laptopRequest}
        setRequestText={setLaptopRequest}
        onSubmit={handleRequestLaptop}
      />

      {/* Report an Issue */}
      <h2>Report an Issue</h2>
      <IssueForm
        issue={issue}
        setIssue={setIssue}
        onSubmit={handleReportIssue}
      />
    </div>
  );
};

export default EmployeePortal;