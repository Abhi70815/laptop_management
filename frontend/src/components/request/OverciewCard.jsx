import React from "react";
import './OverviewCard.css'; // Import the CSS file

const OverviewCard = ({ label, value, bgColor }) => {
  return (
    <div
      className={`overview-card ${bgColor ? bgColor : ""}`}
      style={{ backgroundColor: bgColor || "#ebf8ff" }} // Fallback for background color
    >
      <h2>{label}</h2>
      <p>{value}</p>
    </div>
  );
};

export default OverviewCard;