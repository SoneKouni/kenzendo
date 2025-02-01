import React from "react";

const FilterButton = ({ column, value, onFilter, text, isSelected }) => {
  return (
    <button
      onClick={onFilter}
      style={{
        margin: "0 5px",
        padding: "5px 10px",
        backgroundColor: isSelected ? "#007bff" : "#ffffff",
        color: isSelected ? "#ffffff" : "#000000",
        border: "1px solid #007bff",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default FilterButton;
