/** @jsxImportSource @emotion/react */
import StyledInput from "../../../global/StyledInput";
import StyledButton from "../../../global/StyledButton";
import * as SC from "./ContactsNavigationStyledComponents";
import { FaSlidersH, FaTrashAlt } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { Tooltip } from "@chakra-ui/tooltip";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchContentAtom } from "../../../../atoms/ContentAtom";
import { useDisclosure } from "@chakra-ui/react";
import CreateContactModal from "../../../modals/CreateContactModal/CreateContactModal";
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import CSV from "../../../../../public/contacts/CSV";
import Tags from "../../../../../public/contacts/Tags";
import Circle from "../../../../../public/contacts/Circle";
import Note from "../../../../../public/contacts/Note";
import Block from "../../../../../public/contacts/Block";
import Remove from "../../../../../public/contacts/Remove";
import Fly from "../../../../../public/contacts/Fly";
import {
  ContactsArrayAtom,
  SelectedContacts,
} from "../../../../atoms/ContactsAtom";
import { gql, useApolloClient } from "@apollo/client";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
} from "../../../../generated/graphql";
import { GET_CONTACTS_FROM_VIRTUAL_APP_QUERY } from "../../../../pages/contacts";

type ContactsNavigationProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  totalContacts: number;
  filteredContacts: number;
};

export const DELETE_MULTIPLE_CONTACTS = gql`
  mutation DeleteMultipleContacts($contactIds: [String!]!, $virtualAppId: String!) {
    deleteMultipleContacts(contactIds: $contactIds, virtualAppId: $virtualAppId)
  }
`;

export default function ContactsNavigation({
  isFilterOpen,
  setIsFilterOpen,
  totalContacts,
  filteredContacts,
}: ContactsNavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contacts, setContacts] = useRecoilState(ContactsArrayAtom);
  const [search, setSearch] = useRecoilState(SearchContentAtom);
  const selectedContacts = useRecoilValue(SelectedContacts);

  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);

  async function deleteMultipleContacts(ids: string[]) {
    try {
      let response = await client.mutate({
        mutation: DELETE_MULTIPLE_CONTACTS,
        variables: { ids: ids, virtualAppId: virtualApp?.id },
      });

      if (virtualApp && response) {
        let contactsResponse = await client.query<
          GetVirtualAppQuery,
          GetVirtualAppQueryVariables
        >({
          query: GET_CONTACTS_FROM_VIRTUAL_APP_QUERY,
          variables: { virtualAppId: virtualApp.id },
          fetchPolicy: "no-cache",
        });
        if (contactsResponse.data.getVirtualApp) {
          setContacts((contactsResponse.data.getVirtualApp as any).contacts);
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function openFilterHandle() {
    setIsFilterOpen(true);
  }

  function closeAndClearFilterHandle() {
    setIsFilterOpen(false);
  }

  function searchLabel(filteredContacts: number, totalContacts: number) {
    if (filteredContacts === 0) return "No contact found";
    if (totalContacts === 0) return "No contacts to show";
    return `Showing ${filteredContacts} of ${totalContacts} contacts`;
  }

  const popoverButtonsArray = [
    {
      theme: "orange",
      onClick: () => {},
      label: "Export to CSV",
      icon: <CSV />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Apply or remove tags",
      icon: <Tags />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Apply or remove labels",
      icon: <Circle />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Add a note",
      icon: <Note />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Resend confirmation",
      icon: <Fly />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Unsubscribe",
      icon: <Remove />,
    },
    {
      theme: "orange",
      onClick: () => {},
      label: "Block",
      icon: <Block />,
    },
    {
      theme: "red",
      onClick: () => {
        const selectedContactsIds = selectedContacts.map((contact) =>
          contact.id ? contact.id : ""
        );
        deleteMultipleContacts(selectedContactsIds);
      },
      label: "Delete",
      icon: <FaTrashAlt />,
    },
  ];

  return (
    <SC.Container>
      <span className="search-label">
        {searchLabel(filteredContacts, totalContacts)}
      </span>

      <span>
        <StyledInput
          placeholder="Search by contact email"
          hasIcon
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          handleClearInput={() => setSearch("")}
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

        <Popover placement="left-start">
          <PopoverTrigger>
            <SC.IconButtonPlay type="button" variant="outlined">
              <BsThreeDots />
            </SC.IconButtonPlay>
          </PopoverTrigger>
          <PopoverContent minWidth="240px" width="fit-content" padding="4px">
            <SC.PopoverTitle>Bulk actions</SC.PopoverTitle>
            {popoverButtonsArray.map((p) => (
              <SC.PopoverButton
                key={p.label}
                onClick={p.onClick}
                css={p.theme === "orange" ? SC.OrangeCSS : SC.RedCSS}
              >
                {p.icon}
                <p>{p.label}</p>
              </SC.PopoverButton>
            ))}
          </PopoverContent>
        </Popover>
        <StyledButton onClick={onOpen} size="sm">
          New
        </StyledButton>
        <CreateContactModal isOpen={isOpen} onClose={onClose} />
      </span>
    </SC.Container>
  );
}
