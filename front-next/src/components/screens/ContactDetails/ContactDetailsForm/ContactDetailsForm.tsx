import { useApolloClient } from "@apollo/client";
import { Avatar } from "@chakra-ui/react";
import gql from "graphql-tag";
import { parsePhoneNumber } from "libphonenumber-js";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaCamera, FaTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import AsyncSelect from "react-select/async";
import { useRecoilValue } from "recoil";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  ContactType,
  GetContactByIdQuery,
  GetContactByIdQueryVariables,
  GetPlaceDetailsQuery,
  GetPlaceDetailsQueryVariables,
} from "../../../../generated/graphql";
import StyledButton from "../../../global/StyledButton";
import StyledIconButton from "../../../global/StyledIconButton";
import StyledInput from "../../../global/StyledInput";
import StyledTextArea from "../../../global/StyledTextArea";
import {
  AUTOCOMPLETE_OPTIONS_QUERY,
  PLACE_DETAILS_QUERY,
} from "../../../modals/CreateContactModal/CreateContactModal";
import * as SC from "./ContactDetailsFormStyledComponents";

export const GET_CONTACT_QUERY = gql`
  query GetContactById($contactId: String!, $virtualAppId: String!) {
    getContactById(contactId: $contactId, virtualAppId: $virtualAppId) {
      billingAddress {
        userAddress
        userCity
        userCountry
        userState
        userZipCode
      }
      id
      createdAt
      active
      countryCode
      userFirstName
      userLastName
      userImage
      userEmail
      userMobile
      userName
      shippingAddress {
        userAddress
        userCity
        userCountry
        userState
        userZipCode
      }
    }
  }
`;

export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact(
    $contactId: String!
    $virtualAppId: String!
    $updateFields: CreateContactInput!
  ) {
    updateContact(
      contactId: $contactId
      virtualAppId: $virtualAppId
      updateFields: $updateFields
    )
  }
`;

const INITIAL_STATE_CONTACT: ContactType = {
  active: false,
  contactId: "",
  countryCode: "",
  userEmail: "",
  userFirstName: "",
  userImage: "",
  userLastName: "",
  userMobile: "",
  userName: "",
  userNotes: "",
  billingAddress: {
    userAddress: "",
    userCity: "",
    userCountry: "",
    userState: "",
    userZipCode: "",
  },
  shippingAddress: {
    userAddress: "",
    userCity: "",
    userCountry: "",
    userState: "",
    userZipCode: "",
  },
};

export default function ContactDetailsForm() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const id = router.query.slug ? router.query.slug : "";
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [contact, setContact] = useState<ContactType>(INITIAL_STATE_CONTACT);
  const client = useApolloClient();
  const [phone, setPhone] = useState("");

  const promiseOptions = useCallback(
    (inputValue: string) =>
      new Promise<
        {
          value: string;
          label: string;
        }[]
      >(async (resolve) => {
        let response = await client.query<any>({
          query: AUTOCOMPLETE_OPTIONS_QUERY,
          variables: { input: inputValue },
          //fetchPolicy: "no-cache",
        });
        const autocompleteOptions = response.data.getPlacesAutocompleteOptions;

        resolve(autocompleteOptions);
      }),
    []
  );

  useEffect(() => {
    (async () => {
      if (virtualApp) {
        let response = await client.query<
          GetContactByIdQuery,
          GetContactByIdQueryVariables
        >({
          query: GET_CONTACT_QUERY,
          variables: { contactId: id as string, virtualAppId: virtualApp.id },
        });

        const contactData = response.data.getContactById;

        if (contactData) {
          setContact(contactData as ContactType);
        }

        if (contactData?.countryCode && contactData?.userMobile) {
          const phone = (
            contactData.countryCode + contactData.userMobile
          ).replace(/\D/g, "");

          const parsedPhone = parsePhoneNumber("+" + phone);
          if (!parsedPhone) return;

          const displayPhone = parsedPhone.formatNational();
          setPhone("+" + parsedPhone.countryCallingCode + " " + displayPhone);
        }
      }
    })();
  }, [virtualApp]);

  async function onChangeAsyncSelect(
    singleValue: any,
    type: "billing" | "shipping"
  ) {
    if (singleValue) {
      let response = await client.query<
        GetPlaceDetailsQuery,
        GetPlaceDetailsQueryVariables
      >({
        query: PLACE_DETAILS_QUERY,
        variables: { placeId: singleValue.value },
      });

      const placeDetails = response.data.getPlaceDetails;

      switch (type) {
        case "billing":
          setContact({
            ...contact,
            billingAddress: {
              userAddress: placeDetails ? placeDetails.userAddress : "",
              userCity: placeDetails ? placeDetails.userCity : "",
              userCountry: placeDetails ? placeDetails.userCountry : "",
              userState: placeDetails ? placeDetails.userState : "",
              userZipCode: placeDetails ? placeDetails.userZipCode : "",
            },
          });
          break;
        case "shipping":
          setContact({
            ...contact,
            shippingAddress: {
              userAddress: placeDetails ? placeDetails.userAddress : "",
              userCity: placeDetails ? placeDetails.userCity : "",
              userCountry: placeDetails ? placeDetails.userCountry : "",
              userState: placeDetails ? placeDetails.userState : "",
              userZipCode: placeDetails ? placeDetails.userZipCode : "",
            },
          });
          break;
      }
    }
  }

  return (
    <SC.Container>
      {isEditing ? (
        <StyledButton
          onClick={async () => {
            setIsEditing(false);
            if (virtualApp) {
              let response = await client.mutate({
                mutation: UPDATE_CONTACT_MUTATION,
                variables: {
                  updateContactId: id,
                  virtualAppId: virtualApp.id,
                  updateFields: { ...contact },
                },
              });
            }
          }}
          variant="filled"
        >
          Save
        </StyledButton>
      ) : (
        <StyledButton onClick={() => setIsEditing(true)} variant="outlined">
          Edit
        </StyledButton>
      )}

      <SC.AvatarWrapper>
        <Avatar
          size="2xl"
          name="Ryan Florence"
          src="https://bit.ly/ryan-florence"
          border="none"
        />
        <span className="icon-wrapper">
          <StyledIconButton
            variant="filled"
            icon={<FaCamera />}
            onClick={() => {}}
          />
        </span>
        <h1 className="contact-name">{`${contact.userFirstName} ${contact.userLastName}`}</h1>
        <p className="contact-email">{contact.userEmail}</p>
      </SC.AvatarWrapper>

      <div className="line margin-40" />

      <SC.FormContent>
        <SC.FormHeader>
          <SC.FormHeaderText>
            <h1 className="title">Basic Information</h1>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </SC.FormHeaderText>
        </SC.FormHeader>

        <div className="line margin-20" />

        <SC.FormListWrapper>
          <SC.FormWrapper>
            <h3 className="label">First Name</h3>
            {isEditing ? (
              <StyledInput
                placeholder="Enter contact first name"
                value={contact.userFirstName || ""}
                onChange={(e) => {
                  setContact({ ...contact, userFirstName: e.target.value });
                }}
              />
            ) : (
              <p className="information">{contact.userFirstName}</p>
            )}
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Last Name</h3>
            {isEditing ? (
              <StyledInput
                placeholder="Enter contact last name"
                value={contact.userLastName || ""}
                onChange={(e) => {
                  setContact({ ...contact, userLastName: e.target.value });
                }}
              />
            ) : (
              <p className="information">{contact.userLastName}</p>
            )}
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Email Address</h3>
            {isEditing ? (
              <StyledInput
                placeholder="Enter contact email"
                value={contact.userEmail || ""}
                onChange={(e) => {
                  setContact({ ...contact, userEmail: e.target.value });
                }}
              />
            ) : (
              <p className="information">{contact.userEmail}</p>
            )}
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Mobile Phone</h3>
            <p className="information">{phone}</p>
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Notes</h3>
            {isEditing ? (
              <StyledTextArea
                placeholder="Enter notes"
                value={contact.userNotes || ""}
                onChange={(e) => {
                  setContact({ ...contact, userNotes: e.target.value });
                }}
              />
            ) : (
              <p className="information">{contact.userNotes}</p>
            )}
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Label</h3>

            <p className="information empty">No labels added</p>
          </SC.FormWrapper>
        </SC.FormListWrapper>
      </SC.FormContent>

      <div className="line margin-40" />

      <SC.FormContent>
        <SC.FormHeader>
          <SC.FormHeaderText>
            <h1 className="title">Billing & Shipping Address</h1>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </SC.FormHeaderText>
        </SC.FormHeader>

        <div className="line margin-20" />

        <SC.FormListWrapper>
          <SC.FormWrapper>
            <h3 className="label">Billing</h3>
            {isEditing ? (
              <AsyncSelect
                defaultInputValue={contact.billingAddress.userAddress || ""}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary50: "#fdedd4",
                    primary25: "#fdedd4",
                    primary: "#fb972e",
                  },
                })}
                noOptionsMessage={() => "No option was found"}
                menuPlacement="auto"
                className="react-select-container"
                classNamePrefix="react-select"
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                loadOptions={_.throttle(promiseOptions, 300)} //promiseOptions}
                placeholder={"Enter billing address"}
                onChange={async (singleValue: any) => {
                  onChangeAsyncSelect(singleValue, "billing");
                }}
              />
            ) : (
              <p className="information">
                {contact.billingAddress.userAddress}
              </p>
            )}
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Shipping</h3>
            {isEditing ? (
              <AsyncSelect
                defaultInputValue={contact.shippingAddress.userAddress || ""}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary50: "#fdedd4",
                    primary25: "#fdedd4",
                    primary: "#fb972e",
                  },
                })}
                noOptionsMessage={() => "No option was found"}
                menuPlacement="auto"
                className="react-select-container"
                classNamePrefix="react-select"
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                loadOptions={_.throttle(promiseOptions, 300)} //promiseOptions}
                placeholder={"Enter shipping address"}
                onChange={async (singleValue: any) => {
                  onChangeAsyncSelect(singleValue, "shipping");
                }}
              />
            ) : (
              <p className="information">
                {contact.shippingAddress.userAddress}
              </p>
            )}
          </SC.FormWrapper>
        </SC.FormListWrapper>
      </SC.FormContent>

      <div className="line margin-40" />

      <SC.FormContent>
        <SC.FormHeader>
          <SC.FormHeaderText>
            <h1 className="title">Tags & Courses</h1>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </SC.FormHeaderText>
        </SC.FormHeader>

        <div className="line margin-20" />

        <SC.FormListWrapper>
          <SC.FormWrapper>
            <h3 className="label">Tags</h3>
            <SC.TagListWrapper>
              <SC.TagCard>
                <p>Sample tag</p>
                <MdClose />
              </SC.TagCard>
              <SC.TagCard>
                <p>Sample tag</p>
                <MdClose />
              </SC.TagCard>
            </SC.TagListWrapper>
          </SC.FormWrapper>

          <div className="line margin-20" />

          <SC.FormWrapper>
            <h3 className="label">Course</h3>
            <p className="information">No courses added to contact</p>
          </SC.FormWrapper>
        </SC.FormListWrapper>
      </SC.FormContent>

      <div className="line margin-40" />

      <SC.FormContent>
        <SC.DeleteContactButton>
          <FaTrashAlt />
          <p className="button-label">Delete contact</p>
        </SC.DeleteContactButton>
      </SC.FormContent>
    </SC.Container>
  );
}
