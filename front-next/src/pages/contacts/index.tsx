/** @jsxImportSource @emotion/react */
import React, { Fragment, useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaPlay } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ContactsArrayAtom,
  IsLoadingContactsAtom,
} from "../../atoms/ContactsAtom";
import { SearchContentAtom } from "../../atoms/ContentAtom";
import { VirtualAppAtom } from "../../atoms/VirtualAppAtom";
import SeoHead from "../../components/global/SeoHead";
import StyledIconButton from "../../components/global/StyledIconButton";
import TopBar from "../../components/global/TopBar";
import CreateContactModal from "../../components/modals/CreateContactModal/CreateContactModal";
import ContactsNavigation from "../../components/screens/Contacts/ContactsNavigation/ContactsNavigation";
import ContactsSidebarFilter from "../../components/screens/Contacts/ContactsSidebarFilter/ContactsSidebarFilter";
import EmptyContactList from "../../components/screens/Contacts/EmptyContactList/EmptyContactList";
import Table from "../../components/screens/Contacts/Table/Table";
import {
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
} from "../../generated/graphql";
import useDebounce from "../../hooks/useDebounce";
import * as SC from "./styled";

export const GET_CONTACTS_FROM_VIRTUAL_APP_QUERY = gql`
  query GetContactsFromVirtualApp($virtualAppId: String!) {
    getVirtualApp(virtualAppId: $virtualAppId) {
      contacts {
        id
        userFirstName
        userLastName
        createdAt
        countryCode
        userMobile
        active
        userEmail
      }
    }
  }
`;

export default function Contacts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const client = useApolloClient();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const search = useRecoilValue(SearchContentAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [contacts, setContacts] = useRecoilState(ContactsArrayAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingContactsAtom);
  const debouncedSearch = useDebounce(search, 300);

  async function getContactsFromVirtualApp(virtualAppId: string) {
    let contactsResponse = await client.query<
      GetVirtualAppQuery,
      GetVirtualAppQueryVariables
    >({
      query: GET_CONTACTS_FROM_VIRTUAL_APP_QUERY,
      variables: { virtualAppId },
      fetchPolicy: "no-cache",
    });
    if (contactsResponse.data.getVirtualApp) {
      setContacts((contactsResponse.data.getVirtualApp as any).contacts);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!virtualApp) return;
    getContactsFromVirtualApp(virtualApp.id);
  }, [virtualApp]);

  let filteredContacts = contacts?.filter((contact) =>
    contact?.userEmail
      ?.toLowerCase()
      .trim()
      .includes(debouncedSearch as string)
  );

  //! TODO: Paula - loading effect
  if (isLoading) {
    return null;
  }

  return (
    <Fragment>
      <SeoHead pageName="Contacts" />
      <SC.Container>
        <TopBar
          title="Contacts"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Contacts video"
            />
          }
        />
        {contacts?.length! >= 1 ? (
          <Fragment>
            <ContactsNavigation
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              totalContacts={contacts?.length || 0}
              filteredContacts={filteredContacts?.length!}
            />
            <SC.Wrapper>
              {filteredContacts?.length! >= 1 ? (
                <Table filteredContacts={filteredContacts} />
              ) : (
                <EmptyContactList
                  title="No contacts to show"
                  description="Sorry, we couldn’t find contacts that match your search.<br/>Please try again or create a new contact instead."
                  buttonLabel="Create new contact"
                  buttonOnClick={onOpen}
                />
              )}
            </SC.Wrapper>
          </Fragment>
        ) : (
          <SC.ListWrapper>
            <EmptyContactList
              title="Empty contact list"
              description="Your contact list is empty. Would you like to create a new contact?"
              buttonLabel="Create contact"
              buttonOnClick={onOpen}
            />
            <CreateContactModal isOpen={isOpen} onClose={onClose} />
          </SC.ListWrapper>
        )}
        <ContactsSidebarFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <CreateContactModal isOpen={isOpen} onClose={onClose} />
      </SC.Container>
    </Fragment>
  );
}
