import React from "react";
import './RequestForm.css'; // Import the CSS file

const RequestForm = ({ requestText, setRequestText, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="request-form">
      <textarea
        value={requestText}
        onChange={(e) => setRequestText(e.target.value)}
        placeholder="Reason for requesting a new laptop..."
        className="request-textarea"
        required
      ></textarea>
      <button
        type="submit"
        className="request-button"
      >
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;