import React from "react";
import * as SC from "./TableHeadStyledComponents";
import { FaSort } from "react-icons/fa";

export default function TableHead() {
  return (
    <SC.THead>
      <span className="title">
        <p className="table-head-title">Type</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Category</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Tag</p>
        <FaSort />
      </span>

      <span className="title">
        <p className="table-head-title">Users Tagged</p>
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
