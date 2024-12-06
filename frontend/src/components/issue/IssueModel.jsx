import React from "react";
import './issueModel.css'; // Import the CSS file

const IssueModal = ({ issues, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Laptop Issues</h2>

        {issues.length > 0 ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id} className="issue-item">
                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
                <p>
                  <strong>Priority:</strong> {issue.priority}
                </p>
                <p>
                  <strong>Status:</strong> {issue.status}
                </p>
                <p>
                  <strong>Reported By:</strong> {issue.reportedBy}
                </p>
                <p>
                  <strong>Reported At:</strong>{" "}
                  {new Date(issue.reportedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found for this laptop.</p>
        )}

        <button onClick={onClose} className="button">
          Close
        </button>
      </div>
    </div>
  );
};

export default IssueModal;