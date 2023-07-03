import React from "react";
import TableFooter from "./TableFooter/TableFooter";
import TableHead from "./TableHead/TableHead";
import TableRow from "./TableRow/TableRow";
import * as SC from "./CategoriesTableStyledComponents";

export default function CategoriesTable() {
  return (
    <SC.Container>
      <SC.Table>
        <TableHead />

        <SC.TableBody>
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </SC.TableBody>

        <TableFooter />
      </SC.Table>
    </SC.Container>
  );
}
