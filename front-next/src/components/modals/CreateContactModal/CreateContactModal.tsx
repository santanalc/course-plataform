import { gql, useApolloClient } from "@apollo/client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import AsyncSelect from "react-select/async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContactsArrayAtom } from "../../../atoms/ContactsAtom";
import { VirtualAppAtom } from "../../../atoms/VirtualAppAtom";
import {
  CreateContactInput,
  CreateContactMutation,
  CreateContactMutationVariables,
  GetPlaceDetailsQuery,
  GetPlaceDetailsQueryVariables,
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
  UserTypeEnum,
} from "../../../generated/graphql";
import { GET_CONTACTS_FROM_VIRTUAL_APP_QUERY } from "../../../pages/contacts";
import { validationEmail } from "../../../utils/Validation";
import StyledButton from "../../global/StyledButton";
import StyledCheckbox from "../../global/StyledCheckbox";
import StyledIconButton from "../../global/StyledIconButton";
import StyledInput from "../../global/StyledInput";
import StyledTextArea from "../../global/StyledTextArea";

export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $contact: CreateContactInput!
    $virtualAppId: String!
  ) {
    createContact(contact: $contact, virtualAppId: $virtualAppId)
  }
`;

export const AUTOCOMPLETE_OPTIONS_QUERY = gql`
  query GetPlacesAutocompleteOptions($input: String!) {
    getPlacesAutocompleteOptions(input: $input) {
      label
      value
    }
  }
`;

export const PLACE_DETAILS_QUERY = gql`
  query GetPlaceDetails($placeId: String!) {
    getPlaceDetails(place_id: $placeId) {
      userAddress
      userCity
      userCountry
      userZipCode
      userState
    }
  }
`;

const ModalHeaderCSS = css`
  width: 100%;
  margin-bottom: 20px;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--gray-200);

  grid-gap: 24px;
`;

const ModalFooterCSS = css`
  padding: 24px;
  margin-top: 20px;

  border-top: 1px solid var(--gray-200);

  grid-gap: 16px;
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  &.empty {
    justify-content: center;
  }

  @media screen and (min-height: 900px) {
    min-height: 560px;
    max-height: 560px;
  }
`;

const ModalTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-700);
`;

const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;

  #styled-search-input {
    max-width: 240px;

    margin-right: auto;
  }
`;

const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${(props: { hasBillingAddress: boolean }) =>
      props.hasBillingAddress ? "repeat(6, 1fr)" : "repeat(5, 1fr)"} 19px 19px;
  grid-gap: 24px;

  grid-template-areas:
    "name1 name2"
    "email email"
    "phone phone"
    "billing billing"
    ${(props: { hasBillingAddress: boolean; addNotes: boolean }) => {
      if (props.hasBillingAddress) return '"shipping shipping"';
    }}
    "notes notes"
    ${(props: { hasBillingAddress: boolean; addNotes: boolean }) => {
      if (props.addNotes) return '"notes notes"';
    }}
    "label label";

  #styled-drop-image {
    padding: 20px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  grid-area: ${(props: { gridArea: string }) => props.gridArea};

  .react-tel-input .form-control {
    width: 100%;
    height: 40px;

    border: 1px solid;
    border-color: var(--gray-200);
    border-radius: 8px;

    color: var(--gray-700);

    transition: box-shadow 0.3s, border 0.3s;

    :focus {
      box-shadow: 0px 0px 6px var(--orange-400);
      border: 1px solid var(--orange-300);
    }
  }

  .react-tel-input .flag-dropdown {
    border-color: var(--gray-200);

    border-radius: 8px 0 0 8px;
  }

  .react-tel-input .country-list {
    width: 528px;
  }

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  &.flex {
    justify-content: start;
    flex-direction: row;
    grid-gap: 16px;
  }
`;

const NotesWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-gap: 8px;

  grid-area: ${(props: { gridArea: string }) => props.gridArea};

  > text {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

const StyledCheckboxWrapper = styled.button`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 8px;

  #styled-checkbox {
    width: 16px;
    height: 16px;
  }

  > text {
    font-size: 16px;
    color: "#2F2F2F";
  }
`;

const HoverText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #fb972e;
  :hover {
    cursor: pointer;
  }
`;

type CreateContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateContactModal({
  isOpen,
  onClose,
}: CreateContactModalProps) {
  const toast = useToast();
  const setContacts = useSetRecoilState(ContactsArrayAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [contact, setContact] = useState<CreateContactInput>({
    active: false,
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
    countryCode: "",
    userEmail: "",
    userEmailVerified: false,
    userFirstName: " ",
    userLastName: " ",
    userMobile: " ",
    userName: " ",
    userNotes: " ",
    userType: UserTypeEnum.Contact,
  });

  const providerRef = useRef<any>(null);

  useEffect(() => {
    if (sameAddress) {
      const billingAddress = contact.billingAddress;
      setContact({
        ...contact,
        shippingAddress: billingAddress,
      });
    }
  }, [sameAddress]);

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
        });
        const autocompleteOptions = response.data.getPlacesAutocompleteOptions;

        resolve(autocompleteOptions);
      }),
    []
  );

  useEffect(() => {
    //dynamic import of leaflet-geosearch to prevent window reference error
    (async () => {
      let { OpenStreetMapProvider } = await import("leaflet-geosearch");
      providerRef.current = new OpenStreetMapProvider();
    })();
  }, []);

  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    if (isLoading) return;

    if (!virtualApp) return;

    if (!validationEmail(contact.userEmail)) {
      toast({
        title: "Input error",
        description: "Please enter a valid email address",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // let vars = { ...contact };
    // if (virtualApp) vars = { ...contact, virtualAppId: virtualApp.id };

    try {
      let response = await client.mutate<
        CreateContactMutation,
        CreateContactMutationVariables
      >({
        mutation: CREATE_CONTACT,
        variables: {
          contact,
          virtualAppId: virtualApp.id,
        },
      });

      if (virtualApp && response.data) {
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

      onClose();
    } catch (err: any) {
      toast({
        title: "User creation error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      setError(true);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Modal
        isCentered
        autoFocus={false}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader css={ModalHeaderCSS}>
            <SpaceBetweenWrapper>
              <ModalTitle>Create New Contact</ModalTitle>
              <StyledIconButton
                icon={<FaPlay />}
                onClick={() => {}}
                tooltipLabel="Menu Manager video"
              />
            </SpaceBetweenWrapper>
          </ModalHeader>
          <ModalBody css={ModalBodyCSS}>
            <FormContent
              hasBillingAddress={
                contact.billingAddress.userAddress != "" ? true : false
              }
              addNotes={addNotes}
            >
              <FormWrapper gridArea="name1">
                <label>First Name</label>
                <StyledInput
                  value={contact.userFirstName}
                  onChange={(e) => {
                    const userFirstName = e.target.value;
                    setContact({ ...contact, userFirstName: userFirstName });
                  }}
                  placeholder="Enter first name"
                />
              </FormWrapper>

              <FormWrapper gridArea="name2">
                <label>Last Name</label>
                <StyledInput
                  value={contact.userLastName}
                  onChange={(e) => {
                    const userLastName = e.target.value;
                    setContact({ ...contact, userLastName: userLastName });
                  }}
                  placeholder="Enter last name"
                />
              </FormWrapper>

              <FormWrapper gridArea="email">
                <label>Email Address</label>
                <StyledInput
                  value={contact.userEmail}
                  onChange={(e) => {
                    const userEmail = e.target.value;
                    setContact({ ...contact, userEmail: userEmail });
                  }}
                  placeholder="Enter email"
                />
              </FormWrapper>

              <FormWrapper gridArea="phone">
                <label>Mobile number</label>
                <PhoneInput
                  country={"us"}
                  value={contact.userName}
                  onChange={(
                    userMobile,
                    country: {
                      countryCode: string;
                      dialCode: string;
                      format: string;
                      name: string;
                    }
                  ) => {
                    setContact({
                      ...contact,
                      userMobile: userMobile.slice(country.dialCode.length),
                      countryCode: `+${country.dialCode}`,
                      userName: userMobile,
                    });
                  }}
                  placeholder={"(917) 555-5555"}
                />
              </FormWrapper>

              <FormWrapper gridArea="billing">
                <label>Billing Address</label>
                <AsyncSelect
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
                  loadOptions={_.throttle(promiseOptions, 300)}
                  placeholder={"Enter billing address"}
                  onChange={async (singleValue: any) => {
                    if (singleValue) {
                      let response = await client.query<
                        GetPlaceDetailsQuery,
                        GetPlaceDetailsQueryVariables
                      >({
                        query: PLACE_DETAILS_QUERY,
                        variables: { placeId: singleValue.value },
                      });

                      const placeDetails = response.data.getPlaceDetails;

                      if (!placeDetails) return;

                      setContact({
                        ...contact,
                        billingAddress: {
                          userAddress: placeDetails?.userAddress || "",
                          userCity: placeDetails?.userCity || "",
                          userCountry: placeDetails?.userCountry || "",
                          userState: placeDetails?.userState || "",
                          userZipCode: placeDetails?.userZipCode || "",
                        },
                      });
                    }
                  }}
                />
              </FormWrapper>

              {contact.billingAddress.userAddress != "" && (
                <FormWrapper gridArea="shipping">
                  <label>Shipping Address</label>
                  <StyledCheckboxWrapper>
                    <StyledCheckbox
                      value={sameAddress}
                      onClick={() => setSameAddress(!sameAddress)}
                    />
                    <text>Same as Billing Address</text>
                  </StyledCheckboxWrapper>
                  {!sameAddress && (
                    <AsyncSelect
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
                      loadOptions={_.throttle(promiseOptions, 300)}
                      placeholder={"Enter shipping address"}
                      onChange={async (singleValue: any) => {
                        if (singleValue) {
                          let response = await client.query<
                            GetPlaceDetailsQuery,
                            GetPlaceDetailsQueryVariables
                          >({
                            query: PLACE_DETAILS_QUERY,
                            variables: { placeId: singleValue.value },
                          });

                          const placeDetails = response.data.getPlaceDetails;

                          if (!placeDetails) return;

                          setContact({
                            ...contact,
                            shippingAddress: {
                              userAddress: placeDetails?.userAddress || "",
                              userCity: placeDetails?.userCity || "",
                              userCountry: placeDetails?.userCountry || "",
                              userState: placeDetails?.userState || "",
                              userZipCode: placeDetails?.userZipCode || "",
                            },
                          });
                        }
                      }}
                    />
                  )}
                </FormWrapper>
              )}

              <FormWrapper gridArea="notes">
                <NotesWrapper gridArea="notes">
                  <text>Notes</text>
                  <HoverText
                    onClick={() => {
                      setAddNotes(!addNotes);
                    }}
                  >
                    + Add Notes
                  </HoverText>
                </NotesWrapper>
                {addNotes && (
                  <StyledTextArea
                    style={{ minHeight: 85, height: 85 }}
                    value={contact.userNotes}
                    onChange={(e) => {
                      const userNotes = e.target.value;
                      setContact({ ...contact, userNotes: userNotes });
                    }}
                    placeholder="Enter notes"
                  />
                )}
              </FormWrapper>

              <NotesWrapper gridArea="label">
                <text>Label</text>
                <Radio />
              </NotesWrapper>
            </FormContent>
          </ModalBody>
          <ModalFooter css={ModalFooterCSS}>
            <StyledButton onClick={onClose} variant="outlined">
              Cancel
            </StyledButton>
            <StyledButton onClick={handleSubmit} isLoading={isLoading}>
              Save
            </StyledButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
