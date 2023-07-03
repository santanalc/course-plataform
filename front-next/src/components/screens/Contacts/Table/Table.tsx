import React from "react";
import { ContactType } from "../../../../generated/graphql";
import TableFooter from "../TableFooter/TableFooter";
import TableHead from "../TableHead/TableHead";
import TableRow from "../TableRow/TableRow";
import * as SC from "./TableStyledComponents";

type TableProps = {
  filteredContacts: ContactType[] | undefined;
};

export default function Table({ filteredContacts }: TableProps) {
  return (
    <SC.Container>
      <SC.Table>
        <TableHead />

        <SC.TableBody>
          {filteredContacts?.map((contact) => (
            <TableRow contact={contact} key={contact.id} />
          ))}
        </SC.TableBody>

        <TableFooter />
      </SC.Table>
    </SC.Container>
  );
}
