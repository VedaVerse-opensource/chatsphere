import React, { useState, useEffect } from "react";
import Select from "react-select";

const DropdownComponent = ({ data, placeholder, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(() => {
    if (typeof window !== "undefined") {
      const storedModel = localStorage.getItem("selectedModel");
      if (storedModel) {
        const option = data
          .flatMap(group => group.options)
          .find(opt => opt.name === storedModel);
        return option || null;
      }
      return null;
    }
  });
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
      onSelect(selectedOption ? selectedOption.name : "Select Model");
    }
  };

  return (
    <div className='min-w-[120px] sm:min-w-[160px] md:min-w-[200px]'>
      <Select
        options={optionsWithState}
        value={selectedOption}
        placeholder={placeholder}
        onChange={handleChange}
        isSearchable={true}
        isClearable={false}
        classNamePrefix='react-select'
        formatGroupLabel={data => (
          <div className='font-bold text-primary dark:text-primary'>
            {data.label}
          </div>
        )}
        isOptionDisabled={option => option.isDisabled}
        styles={{
          control: provided => ({
            ...provided,
            boxShadow: "none",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent",
            color: state.isDisabled ? "#cfd6e3" : "#000",
            cursor: state.isDisabled ? "not-allowed" : "default",
          }),
        }}
        className='react-select-container'
        classNames={{
          control: () =>
            "bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-colors",
          placeholder: () => "text-gray-500 dark:text-gray-400",
          singleValue: () => "text-gray-900 dark:text-white",
          menu: () =>
            "bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg mt-1 shadow-lg",
          option: ({ isFocused, isSelected, isDisabled }) =>
            `py-2 px-3 ${
              isDisabled
                ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                : isFocused
                ? "bg-gray-100 dark:bg-gray-700"
                : isSelected
                ? "bg-primary text-white"
                : ""
            } ${
              isSelected && !isFocused ? "bg-primary/10 dark:bg-primary/20" : ""
            }`,
          groupHeading: () =>
            "text-primary dark:text-primary text-sm font-semibold py-2 px-3",
          indicatorSeparator: () => "bg-gray-300 dark:bg-gray-600",
          dropdownIndicator: () =>
            "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
          clearIndicator: () =>
            "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
        }}
      />
    </div>
  );
};

export default DropdownComponent;
