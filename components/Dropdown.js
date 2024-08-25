import React, { useState } from "react";

const DropdownComponent = ({ data, placeholder, onSelect, isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (onSelect) {
      onSelect(selectedOption.value);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode ? "#333" : "transparent",
      borderColor: isDarkMode ? "transparent" : "transparent",
      minHeight: "50px",
      borderRadius: "8px",
      boxShadow: state.isFocused ? null : null,
    }),
    placeholder: (base) => ({
      ...base,
      color: isDarkMode ? "white" : "black",
      fontSize: "16px",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "white" : "black",
      fontSize: "16px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#333" : "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#444"
          : "#f0f0f0"
        : isDarkMode
        ? "#333"
        : "white",
      color: isDarkMode ? "white" : "black",
    }),
  };

  return (
    <div style={{ minWidth: 200 }}>
      <select
        styles={customStyles}
        options={data}
        value={selectedOption}
        placeholder={placeholder}
        onChange={handleChange}
        isClearable
      />
    </div>
  );
};

export default DropdownComponent;
