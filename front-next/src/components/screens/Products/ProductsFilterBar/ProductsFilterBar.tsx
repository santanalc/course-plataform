/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction } from "react";
import StyledInput from "../../../global/StyledInput";
import StyledButton from "../../../global/StyledButton";
import * as SC from "./ProductsFilterBarStyledComponents";
import { useRouter } from "next/dist/client/router";
import { Tooltip } from "@chakra-ui/react";
import { FaSlidersH } from "react-icons/fa";
import { MdClose } from "react-icons/md";

type ProductsFilterBarProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProductsFilterBar({
  isFilterOpen,
  setIsFilterOpen,
}: ProductsFilterBarProps) {
  const router = useRouter();

  function openFilterHandle() {
    setIsFilterOpen(true);
  }

  function closeAndClearFilterHandle() {
    setIsFilterOpen(false);
  }

  return (
    <SC.Container>
      <span className="search-label">Showing 25 of 251 products</span>

      <SC.Wrapper>
        <StyledInput
          placeholder="Search by product name"
          hasIcon
          value=""
          onChange={(e) => {}}
          handleClearInput={() => {}}
        />
        <Tooltip
          hasArrow
          placement="top"
          label={isFilterOpen ? "Close filter" : "Open filter"}
        >
          <SC.StyledButtonFilter
            onClick={
              isFilterOpen ? closeAndClearFilterHandle : openFilterHandle
            }
          >
            {!isFilterOpen && <FaSlidersH />}
            {false && <div className="circle">5</div>}
            <p>Filter</p>
            {isFilterOpen && <MdClose />}
          </SC.StyledButtonFilter>
        </Tooltip>
        <StyledButton onClick={() => router.push("/products/add")} size="sm">
          New
        </StyledButton>
      </SC.Wrapper>
    </SC.Container>
  );
}
