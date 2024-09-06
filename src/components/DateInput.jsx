import React from "react";

const DateInput = ({ date, onDateChange }) => {
  return (
    <div className="mb-3">
      <input
        type="date"
        className="form-control"
        value={date.toISOString().slice(0, 10)}
        onChange={onDateChange}
      />
    </div>
  );
};

export default DateInput;
