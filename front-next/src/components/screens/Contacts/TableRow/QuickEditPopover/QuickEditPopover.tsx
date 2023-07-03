import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { parsePhoneNumber } from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ContactType } from "../../../../../generated/graphql";
import StyledButton from "../../../../global/StyledButton";
import StyledInput from "../../../../global/StyledInput";
import StyledPhoneCountryInput from "../../../../global/StyledPhoneCountryInput";
import * as SC from "./QuickEditStyledComponents";

type QuickEditPopoverProps = {
  isPopoverOpen: boolean;
  onPopoverClose: () => void;
  onPopoverOpen: () => void;
  contact: ContactType;
};

export default function QuickEditPopover({
  isPopoverOpen,
  onPopoverClose,
  onPopoverOpen,
  contact,
}: QuickEditPopoverProps) {
  const [firstName, setFirstName] = useState(contact.userFirstName || "");
  const [lastName, setLastName] = useState(contact.userLastName || "");
  const [phone, setPhone] = useState("");
  const [emailAddress, setEmailAddress] = useState(contact.userEmail || "");

  useEffect(() => {
    if (contact.userMobile) {
      const newPhone = (contact?.countryCode + contact?.userMobile).replace(
        /\D/g,
        ""
      );

      const parsedPhone = parsePhoneNumber("+" + newPhone);

      if (!parsedPhone) return;

      const displayPhone = parsedPhone.formatNational();
      setPhone("+" + parsedPhone.countryCallingCode + " " + displayPhone);
    }
  }, []);

  return (
    <Popover
      placement="right-start"
      isOpen={isPopoverOpen}
      onClose={onPopoverClose}
    >
      <Tooltip hasArrow placement="top" label="Edit">
        <PopoverTrigger>
          <SC.IconButton onClick={onPopoverOpen}>
            <FaPencilAlt />
          </SC.IconButton>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent width="400px">
        <PopoverArrow />
        <PopoverHeader css={SC.PopoverHeaderCSS}>Quick Edit</PopoverHeader>
        <PopoverCloseButton top="1rem" right="32px" />
        <PopoverBody css={SC.PopoverBodyCSS}>
          <SC.FormContainer>
            <SC.FormWrapper>
              <label>First Name</label>
              <StyledInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </SC.FormWrapper>

            <SC.FormWrapper>
              <label>Last Name</label>
              <StyledInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </SC.FormWrapper>
          </SC.FormContainer>

          <SC.FormWrapper>
            <label>Phone</label>
            <StyledPhoneCountryInput
              error={false}
              phone={phone}
              handleChangePhone={(value) => setPhone(value)}
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Email Address</label>
            <StyledInput
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter email address"
            />
          </SC.FormWrapper>
        </PopoverBody>
        <PopoverFooter css={SC.PopoverFooterCSS}>
          <StyledButton
            onClick={onPopoverClose}
            size="sm"
            variant="outlined"
            color="gray"
          >
            Cancel
          </StyledButton>
          <StyledButton size="sm" variant="filled" color="orange">
            Save
          </StyledButton>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
