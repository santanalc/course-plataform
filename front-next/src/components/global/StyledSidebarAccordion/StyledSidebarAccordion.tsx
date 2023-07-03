import React, { Fragment, ReactNode, useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as SC from "./StyledSidebarAccordionStyledComponents";

type StyledSidebarAccordionProps = {
  title: string;
  children: ReactNode;
  selectedFilters: number;
};

export default function StyledSidebarAccordion({
  title,
  children,
  selectedFilters,
}: StyledSidebarAccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [hasFilterSelected, setHasFilterSelected] = useState(false);

  useEffect(() => {
    if (selectedFilters === 0) return setHasFilterSelected(false);
    return setHasFilterSelected(true);
  }, [selectedFilters]);

  return (
    <Fragment>
      <SC.Container onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
        {hasFilterSelected ? (
          <span className="selected-placeholder">
            <div className="circle">{selectedFilters}</div>
            <p>{title}</p>
          </span>
        ) : (
          <p>{title}</p>
        )}

        {isAccordionOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </SC.Container>

      <SC.FilterContainer isAccordionOpen={isAccordionOpen}>
        <SC.FilterWrapper isAccordionOpen={isAccordionOpen}>
          {children}
        </SC.FilterWrapper>
      </SC.FilterContainer>
    </Fragment>
  );
}
