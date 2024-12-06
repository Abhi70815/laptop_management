import React from "react";
import './issueForm.css'; // Import the CSS file

const IssueForm = ({ issue, setIssue, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <textarea
        value={issue.description}
        onChange={(e) => setIssue({ ...issue, description: e.target.value })}
        placeholder="Describe the issue..."
        className="textarea"
        required
      ></textarea>
      <select
        value={issue.priority}
        onChange={(e) => setIssue({ ...issue, priority: e.target.value })}
        className="select"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button type="submit" className="button">
        Report Issue
      </button>
    </form>
  );
};

export default IssueForm;