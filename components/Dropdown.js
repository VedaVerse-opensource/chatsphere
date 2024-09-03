import React, { useState, useEffect } from "react";
import Select from "react-select";

const DropdownComponent = ({ data, placeholder, onSelect, isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsWithState, setOptionsWithState] = useState([]);

  useEffect(() => {
    const updatedOptions = data.map(provider => ({
      ...provider,
      options: provider.options.map(option => ({
        ...option,
        isDisabled: !localStorage.getItem(option.value),
      })),
    }));
    setOptionsWithState(updatedOptions);
  }, [data]);

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    if (onSelect) {
      onSelect(selectedOption ? selectedOption.name : null);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkMode ? "#444444" : "#efefef",
      borderColor: state.isFocused ? "#e73529" : "transparent",
      borderRadius: "10px",
      padding: "5px 10px",
      minHeight: "50px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(231, 53, 41, 0.3)" : "none",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#e73529",
      },
      cursor: "pointer",
    }),
    placeholder: base => ({
      ...base,
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: "16px",
      fontWeight: "500",
    }),
    singleValue: base => ({
      ...base,
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: "16px",
      fontWeight: "500",
    }),
    menu: base => ({
      ...base,
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      borderRadius: "10px",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      marginTop: "5px",
    }),
    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#d9d9d9" : isDarkMode ? "#ffffff" : "#000000",
      padding: "10px 15px",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      transition: "background-color 0.2s ease",
    }),
    dropdownIndicator: base => ({
      ...base,
      color: isDarkMode ? "#ffffff" : "#e73529",
      padding: "0px 8px",
      transition: "color 0.3s ease",
      "&:hover": {
        color: isDarkMode ? "#ffffff" : "#e73529",
      },
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menuList: base => ({
      ...base,
      padding: "0",
    }),
    group: base => ({
      ...base,
      padding: "10px 0",
    }),
    groupHeading: base => ({
      ...base,
      // backgroundColor: isDarkMode ? "#444444" : "#efefef",
      color: isDarkMode ? "#ffffff" : "#e73529",
      padding: "8px 15px",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "5px",
    }),
  };

  return (
    <div className='min-w-[200px]'>
      <Select
        styles={customStyles}
        options={optionsWithState}
        value={selectedOption}
        placeholder={placeholder}
        onChange={handleChange}
        isSearchable={true}
        isClearable={false}
        className='focus:outline-none'
        classNamePrefix='react-select'
        formatGroupLabel={data => (
          <div>
            <strong>{data.label}</strong>
          </div>
        )}
        isOptionDisabled={option => option.isDisabled}
      />
    </div>
  );
};

export default DropdownComponent;
