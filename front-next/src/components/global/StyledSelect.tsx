import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";

interface StyledSelectProps {
  onChange?: (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  onChangeMulti?: (
    newValue: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
  options: {
    value: any;
    label: any;
  }[];
  placeholder: string;
  defaultValue?: {
    value: string;
    label: string;
  };
  isMulti?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
}

export default function StyledSelect(props: StyledSelectProps) {
  const {
    onChange,
    options,
    placeholder,
    defaultValue,
    isMulti = false,
    onChangeMulti,
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    error,
  } = props;

  const customStyles = {
    multiValue: (provided: any) => {
      const display = "none";
      return { ...provided, display };
    },
  };

  if (isMulti) {
    return (
      <Select
        key={defaultValue?.label || "key"}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary50: "#fdedd4",
            primary25: "#fdedd4",
            primary: "#fb972e",
          },
        })}
        noOptionsMessage={() => "No option was found"}
        styles={customStyles}
        isMulti
        menuPlacement="auto"
        className="react-select-container"
        classNamePrefix="react-select"
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        defaultValue={defaultValue}
        value={defaultValue}
        onChange={onChangeMulti}
        options={options}
        placeholder={placeholder}
        closeMenuOnSelect={false}
      />
    );
  }

  return (
    <Select
      key={defaultValue?.label || "key"}
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary50: "#fdedd4",
          primary25: "#fdedd4",
          primary: "#fb972e",
        },
      })}
      styles={{
        control: (styles) =>
          error
            ? {
                ...styles,
                borderColor: "#c41700",
                boxShadow: "0px 0px 6px #c417004d !important",
              }
            : styles,
      }}
      noOptionsMessage={() => "No option was found"}
      menuPlacement="auto"
      className="react-select-container"
      classNamePrefix="react-select"
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={false}
      isSearchable={true}
      defaultValue={defaultValue?.label === "" && defaultValue?.value === "" ? undefined : defaultValue}
      value={defaultValue?.label === "" && defaultValue?.value === "" ? undefined : defaultValue}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}
