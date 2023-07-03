import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SingleValue } from "react-select";
import StyledSelect from "../../../../../global/StyledSelect";
import { ROWS_PER_PAGE } from "./TableFooterHelpers";
import * as SC from "./TableFooterStyledComponents";

export default function TableFooter() {
  const [rowsPerPage, setRowsPerPage] = useState("");

  function rowsPerPageOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setRowsPerPage(newValue?.value!);
  }

  return (
    <SC.TableStructure>
      <SC.SelectWrapper>
        <p>Rows per page:</p>
        <StyledSelect
          onChange={rowsPerPageOnChange}
          options={ROWS_PER_PAGE}
          defaultValue={ROWS_PER_PAGE[0]}
          isClearable={false}
          placeholder=""
        />
      </SC.SelectWrapper>

      <SC.ContactsPerPageWrapper>
        <p>1-25 of 31</p>

        <SC.ButtonsWrapper>
          <button onClick={() => {}} disabled={true}>
            <IoIosArrowBack />
          </button>

          <button onClick={() => {}} disabled={false}>
            <IoIosArrowForward />
          </button>
        </SC.ButtonsWrapper>
      </SC.ContactsPerPageWrapper>
    </SC.TableStructure>
  );
}
