import { gql, useApolloClient } from "@apollo/client";
import { Avatar, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import { parsePhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import {
  FaCopy,
  FaEllipsisH,
  FaPencilAlt,
  FaRedo,
  FaTrashAlt,
} from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import FaCopyFilled from "../../../../../public/contacts/FaCopyFilled";
import {
  ContactsArrayAtom,
  SelectedContacts,
} from "../../../../atoms/ContactsAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  ContactType,
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
} from "../../../../generated/graphql";
import { GET_CONTACTS_FROM_VIRTUAL_APP_QUERY } from "../../../../pages/contacts";
import StyledCheckbox from "../../../global/StyledCheckbox";
import { useDialog } from "../../../global/StyledDialog/StyledDialogHooks";
import StyledPopover from "../../../global/StyledPopover";
import QuickEditPopover from "./QuickEditPopover/QuickEditPopover";
import * as SC from "./TableRowStyledComponents";

type TableRowProps = {
  contact: ContactType;
};

export const DELETE_CONTACT = gql`
  mutation DeleteContact($contactId: String!, $virtualAppId: String!) {
    deleteContact(contactId: $contactId, virtualAppId: $virtualAppId)
  }
`;

export default function TableRow(props: TableRowProps) {
  const setContacts = useSetRecoilState(ContactsArrayAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [selectedContacts, setSelectedContacts] =
    useRecoilState(SelectedContacts);

  const [isMouseHover, setIsMouseHover] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onPopoverOpen = () => setIsPopoverOpen(!isPopoverOpen);
  const onPopoverClose = () => setIsPopoverOpen(false);

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const dialog = useDialog();
  const router = useRouter();

  const client = useApolloClient();
  async function deleteContact(id: string) {
    try {
      let response = await client.mutate({
        mutation: DELETE_CONTACT,
        variables: { id: id, virtualAppId: virtualApp?.id },
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

  async function handleDelete(id: string) {
    dialog.confirm({
      title: `Delete Contact`,
      hasImage: true,
      img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
      description: `Are you sure you want to delete the contact <b>"${fullName}"</b>?`,
      okButtonLabel: "Delete",
      onOkPressed: async () => {
        await deleteContact(id);
      },
      hasCheckbox: true,
      okButtonColor: "#c41700",
    });
  }

  const POPOVER_BUTTONS_CONTACTS = [
    {
      icon: <FaPencilAlt />,
      theme: "orange",
      popoverButtonLabel: "Edit contact",
      onClick: () =>
        router.push({
          pathname: "/contact_details/[id]",
          query: { id: props.contact.id },
        }),
    },
    {
      icon: <FaRedo />,
      theme: "orange",
      popoverButtonLabel: "Resend mobile confirmation",
      onClick: () => {},
    },
    {
      icon: <FaRedo />,
      theme: "orange",
      popoverButtonLabel: "Resend email confirmation",
      onClick: () => {},
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Delete contact",
      onClick: () => {
        handleDelete(props.contact.id as string);
      },
    },
  ];

  useEffect(() => {
    setFullName(
      `${props.contact.userFirstName || ""} ${
        props.contact.userLastName || ""
      }`.trim()
    );

    if (props.contact.userMobile) {
      const phone = (
        props.contact.countryCode + props.contact.userMobile
      ).replace(/\D/g, "");

      const parsedPhone = parsePhoneNumber("+" + phone);
      if (!parsedPhone) return;

      const displayPhone = parsedPhone.formatNational();
      setPhone("+" + parsedPhone.countryCallingCode + " " + displayPhone);
    }
  }, []);

  return (
    <SC.TR>
      <span className="first-column">
        <StyledCheckbox
          value={
            selectedContacts.find((c) => c == props.contact) ? true : false
          }
          onClick={() => {
            const isSelected = selectedContacts.find((c) => c == props.contact)
              ? true
              : false;
            let newSelectedContacts: ContactType[] = [];

            if (!isSelected) {
              newSelectedContacts = [...selectedContacts, props.contact];
            } else {
              newSelectedContacts = selectedContacts.filter(
                (item) => item != props.contact
              );
            }
            setSelectedContacts(newSelectedContacts);
          }}
        />
        <Avatar
          size="sm"
          name="Kent Dodds"
          src={
            props.contact.userImage
              ? props.contact.userImage
              : "https://bit.ly/kent-c-dodds"
          }
        />
        <p>{fullName}</p>
      </span>

      <p className="second-column">Test</p>

      <span
        onMouseEnter={() => setIsMouseHover(true)}
        onMouseLeave={() => setIsMouseHover(false)}
        className="third-column"
      >
        <p>{props.contact.userEmail}</p>

        {(isMouseHover || isPopoverOpen) && (
          <SC.IconButtonWrapper>
            <Tooltip hasArrow placement="top" label="Copy">
              <SC.IconButton>
                <FaCopy />
              </SC.IconButton>
            </Tooltip>
            <Tooltip hasArrow placement="top" label="Custom copy">
              <SC.IconButton>
                <FaCopyFilled />
              </SC.IconButton>
            </Tooltip>

            <QuickEditPopover
              contact={props.contact}
              isPopoverOpen={isPopoverOpen}
              onPopoverClose={onPopoverClose}
              onPopoverOpen={onPopoverOpen}
            />
          </SC.IconButtonWrapper>
        )}
      </span>

      <p className="fourth-column">{phone}</p>

      <span className="fifth-column Confirmed">Confirmed</span>

      <p className="sixth-column">
        {dayjs(props.contact.createdAt).format("MMM D, YYYY [@] h:mm a")}
      </p>

      <StyledPopover
        hasIcon
        popoverPlacement="end-start"
        popoverTrigger={
          <span className="seventh-column">
            <FaEllipsisH />
          </span>
        }
        popoverButtons={POPOVER_BUTTONS_CONTACTS}
      />
    </SC.TR>
  );
}
