import React from "react";

const ApplyButton = ({ onClick }) => {
  return (
    <div className="text-center mb-4">
      <button className="btn btn-success" onClick={onClick}>
        Appliquer
      </button>
    </div>
  );
};

export default ApplyButton;
