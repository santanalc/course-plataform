import React, { useState } from "react";
import StyledCheckbox from "../../../global/StyledCheckbox";
import * as SC from "./TableHeadStyledComponents";
import { FaSort } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  ContactsArrayAtom,
  SelectedContacts,
} from "../../../../atoms/ContactsAtom";

export default function TableHead() {
  const [state, setState] = useState(false);
  const [contacts, setContacts] = useRecoilState(ContactsArrayAtom);
  const [selectedContacts, setSelectedContacts] =
    useRecoilState(SelectedContacts);

  return (
    <SC.THead>
      <span className="title">
        <StyledCheckbox
          value={state}
          onClick={() => {
            setState(!state);
            //check for negative state instead of positive because state will update only on next render
            setSelectedContacts(state ? [] : contacts || []);
          }}
        />
        <p className="table-head-title">Contact</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Labels</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Email Address</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Phone Number</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Status</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Date Created</p>
        <FaSort />
      </span>

      <span className="title actions">
        <p className="table-head-title">Actions</p>
      </span>
    </SC.THead>
  );
}
