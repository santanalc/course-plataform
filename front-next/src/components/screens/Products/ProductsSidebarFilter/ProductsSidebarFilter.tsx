import React, { useState } from "react";
import StyledSidebarAccordion from "../../../global/StyledSidebarAccordion/StyledSidebarAccordion";
import * as SC from "./ProductsSidebarFilterStyledComponents";

type ProductsSidebarFilterProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductsSidebarFilter({
  isFilterOpen,
  setIsFilterOpen,
}: ProductsSidebarFilterProps) {
  const [isFilterSelected, setIsFilterSelected] = useState(true);

  return (
    <SC.Container
      onMouseLeave={() => setIsFilterOpen(false)}
      isFilterOpen={isFilterOpen}
    >
      <SC.Header>
        {isFilterSelected ? (
          <SC.SelectedPlaceholderWrapper>
            <span className="selected-placeholder">
              <div className="circle">2</div>
              <p>Filter selected</p>
            </span>

            <div className="clear-all-button">Clear All</div>
          </SC.SelectedPlaceholderWrapper>
        ) : (
          <p className="placeholder">Enter your search criteria below.</p>
        )}
      </SC.Header>

      <StyledSidebarAccordion title="By Status" selectedFilters={0}>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
      </StyledSidebarAccordion>
      <StyledSidebarAccordion title="By Label" selectedFilters={2}>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
      </StyledSidebarAccordion>
      <StyledSidebarAccordion title="By Label" selectedFilters={0}>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
      </StyledSidebarAccordion>
      <StyledSidebarAccordion title="By Label" selectedFilters={0}>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
      </StyledSidebarAccordion>
    </SC.Container>
  );
}
