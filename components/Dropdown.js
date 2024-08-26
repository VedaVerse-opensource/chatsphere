import React, { useState } from "react";
import Select from "react-select";

const DropdownComponent = ({ data, placeholder, onSelect, isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState("groq");

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
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
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
      },
      cursor: "pointer",
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
      cursor: "pointer",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
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
        isSearchable={true}
        isClearable={false}
        className="focus:outline-none"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default DropdownComponent;
