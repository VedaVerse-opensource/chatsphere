import React, { useState } from "react";
import Select from "react-select";

const DropdownComponent = ({ data, placeholder, onSelect, isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState("groq");

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (onSelect) {
      onSelect(selectedOption ? selectedOption.value : null);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode ? "#333" : "transparent",
      borderColor: "transparent",
      minHeight: "50px",
      borderRadius: "8px",
      boxShadow: "none", // Remove focus ring
      "&:hover": {
        borderColor: "transparent",
      },
      cursor: "pointer", // Change cursor to pointer
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
      cursor: "pointer", // Change cursor to pointer for options
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer", // Change cursor to pointer for dropdown indicator
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the indicator separator
    }),
  };

  return (
    <div className="min-w-[200px]">
      <Select
        styles={customStyles}
        options={data}
        value={selectedOption}
        placeholder={placeholder}
        onChange={handleChange}
        isSearchable={false} // Disable search functionality
        isClearable={false} // Remove the clear (x) option
        className="focus:outline-none" // Remove focus outline
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default DropdownComponent;
