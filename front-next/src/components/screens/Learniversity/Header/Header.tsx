import React, { useState, useEffect } from "react";
import { SingleValue } from "react-select";
import StyledInput from "../../../global/StyledInput";
import StyledSelect from "../../../global/StyledSelect";
import * as SC from "./HeaderStyledComponents";

const CATEGORIES = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
];

export default function Header() {
  const [categories, setCategories] = useState("");

  function categoriesOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setCategories(newValue?.value!);
  }

  return (
    <SC.BigContainer>
      <SC.BigSearchWrapper>
        <h1 className="title">What do you want to learn today?</h1>
        <StyledInput placeholder="Search" hasIcon />
      </SC.BigSearchWrapper>

      <StyledSelect
        onChange={categoriesOnChange}
        options={CATEGORIES}
        placeholder="Categories"
      />
    </SC.BigContainer>

    // <SC.SmallContainer>
    //   <StyledInput placeholder="Search" hasIcon />

    //   <StyledSelect
    //     onChange={categoriesOnChange}
    //     options={CATEGORIES}
    //     placeholder="Categories"
    //   />
    // </SC.SmallContainer>
  );
}
