/** @jsxImportSource @emotion/react */
import { gql, useApolloClient } from "@apollo/client";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { SingleValue } from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserAtom } from "../../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  GetProfileQuery,
  GetProfileQueryVariables,
  UpdateVirtualAppMutation,
  UpdateVirtualAppMutationVariables,
} from "../../../../../generated/graphql";
import { validationEmail } from "../../../../../utils/Validation";
import StyledButton from "../../../../global/StyledButton";
import StyledIconButton from "../../../../global/StyledIconButton";
import StyledInput from "../../../../global/StyledInput";
import StyledPhoneCountryInput from "../../../../global/StyledPhoneCountryInput";
import StyledSelect from "../../../../global/StyledSelect";
import { LANGUAGES } from "./ProfileHelpers";
import StyledShimmer from "../../../../global/StyledShimmer";
import * as SC from "./ProfileStyledComponents";

export const GET_PROFILE = gql`
  query GetProfile($virtualAppId: String!) {
    getVirtualApp(virtualAppId: $virtualAppId) {
      companyName
      companyNiche
      companyHelpEmail
      companyHelpCenter
      companyCountryCode
      companyPhoneNumber
      companyZipCode
      companyCity
      companyAddress
      companyCountry
      companyState
      appOwnerName
    }
  }
`;

export const UPDATE_VIRTUAL_APP = gql`
  mutation UpdateVirtualApp(
    $virtualAppId: String!
    $data: UpdateVirtualAppInput!
  ) {
    updateVirtualApp(virtualAppId: $virtualAppId, data: $data)
  }
`;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [appOwnerName, setAppOwnerName] = useState("");
  const [languages, setLanguages] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNiche, setCompanyNiche] = useState("");
  const [companyHelpEmail, setCompanyHelpEmail] = useState("");
  const [companyHelpDomain, setCompanyHelpDomain] = useState("");
  const [companyHelpNumber, setCompanyHelpNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyPostalCode, setCompanyPostalCode] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [user, setUser] = useRecoilState(UserAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();
  const toast = useToast();
  const [appOwnerNameError, setAppOwnerNameError] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyNicheError, setCompanyNicheError] = useState(false);
  const [companyHelpEmailError, setCompanyHelpEmailError] = useState(false);
  const [companyHelpDomainError, setCompanyHelpDomainError] = useState(false);
  const [companyHelpNumberError, setCompanyHelpNumberError] = useState(false);
  const [companyAddressError, setCompanyAddressError] = useState(false);
  const [companyCityError, setCompanyCityError] = useState(false);
  const [companyStateError, setCompanyStateError] = useState(false);
  const [companyPostalCodeError, setCompanyPostalCodeError] = useState(false);
  const [companyCountryError, setCompanyCountryError] = useState(false);

  function languagesOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setLanguages(newValue?.value!);
  }

  useEffect(() => {
    if (!virtualApp?.id) return;

    (async () => {
      try {
        let response = await client.query<
          GetProfileQuery,
          GetProfileQueryVariables
        >({
          query: GET_PROFILE,
          variables: { virtualAppId: virtualApp?.id },
        });

        const data = response.data.getVirtualApp;
        if (data) {
          setAppOwnerName(data.appOwnerName || "");
          setCompanyName(data.companyName || "");
          setCompanyNiche(data.companyNiche || "");
          setCompanyHelpEmail(data.companyHelpEmail || "");
          setCompanyHelpDomain(data.companyHelpCenter || "");
          setCompanyHelpNumber(data.companyPhoneNumber?.toString() || "");
          setCompanyAddress(data.companyAddress || "");
          setCompanyCity(data.companyCity || "");
          setCompanyState(data.companyState || "");
          setCompanyPostalCode(data.companyZipCode || "");
          setCompanyCountry(data.companyCountry || "");
          setIsLoading(false);
        }
      } catch (e) {}
    })();
  }, [virtualApp?.id]);

  function validationProfile() {
    if (!virtualApp || !user) return false;

    let hasError = false;

    if (!appOwnerName) {
      setAppOwnerNameError(true);
      hasError = true;
    }
    if (!companyName) {
      setCompanyNameError(true);
      hasError = true;
    }
    if (!companyNiche) {
      setCompanyNicheError(true);
      hasError = true;
    }
    if (!companyHelpEmail || !validationEmail(companyHelpEmail)) {
      setCompanyHelpEmailError(true);
      hasError = true;
    }
    if (!companyHelpDomain) {
      setCompanyHelpDomainError(true);
      hasError = true;
    }
    if (!companyHelpNumber) {
      setCompanyHelpNumberError(true);
      hasError = true;
    }
    if (!companyAddress) {
      setCompanyAddressError(true);
      hasError = true;
    }
    if (!companyCity) {
      setCompanyCityError(true);
      hasError = true;
    }
    if (!companyState) {
      setCompanyStateError(true);
      hasError = true;
    }
    if (!companyPostalCode) {
      setCompanyPostalCodeError(true);
      hasError = true;
    }
    if (!companyCountry) {
      setCompanyCountryError(true);
      hasError = true;
    }

    if (hasError) {
      toast({
        title: "Form error",
        description: "Fields invalids",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoadingSave(false);

      return false;
    }

    const data = {
      appOwnerName: appOwnerName,
      companyName: companyName,
      companyNiche: companyNiche,
      companyHelpEmail: companyHelpEmail,
      companyHelpCenter: companyHelpDomain,
      companyPhoneNumber: parseInt(companyHelpNumber, 10),
      companyAddress: companyAddress,
      companyCity: companyCity,
      companyState: companyState,
      companyZipCode: companyPostalCode,
      companyCountry: companyCountry,
    };

    return data;
  }

  async function updateProfile() {
    const data = await validationProfile();

    if (!data || !virtualApp?.id) return;

    await client.mutate<
      UpdateVirtualAppMutation,
      UpdateVirtualAppMutationVariables
    >({
      mutation: UPDATE_VIRTUAL_APP,
      variables: {
        data: data,
        virtualAppId: virtualApp?.id,
      },
    });

    toast({
      title: `The virtual app was successfully edited`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setLoadingSave(false);
  }

  return (
    <SC.Container>
      <SC.HeaderWrapper>
        <h1 className="title">Profile</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quasi
          molestias iure quisquam, doloremque consectetur porro suscipit ducimus
          accusamus dolorum. Eligendi quam earum ab dolor, accusantium tempore
          beatae dolorum libero?
        </p>
      </SC.HeaderWrapper>

      <SC.Content>
        <SC.AvatarContainer>
          <SC.AvatarWrapper>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/ryan-florence"
            />
            <span className="icon-wrapper">
              <StyledIconButton
                variant="filled"
                icon={<FaCamera />}
                onClick={() => {}}
              />
            </span>
          </SC.AvatarWrapper>
          {isLoading ? (
            <StyledShimmer
              style={{ width: "80px", margin: "16px 0 8px" }}
              className="shimmer"
            />
          ) : (
            <h1 className="avatar-name">{appOwnerName}</h1>
          )}
          {isLoading ? (
            <StyledShimmer style={{ width: "128px" }} className="shimmer" />
          ) : (
            <p className="avatar-email">{user?.email}</p>
          )}
        </SC.AvatarContainer>

        <div className="divider" />
        <h1 className="title">Basic Information</h1>
        <p className="description">
          Lorem ipsum dolor sit amet. Quod quasi molestias iure quisquam,
          doloremque consectetur porro suscipit ducimus accusamus dolorum.
        </p>

        <SC.FormContent>
          <SC.FormWrapper>
            <label>App Owner Name</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "160px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                value={appOwnerName}
                onChange={(e) => setAppOwnerName(e.target.value)}
                placeholder="Enter your app owner name"
              />
            ) : (
              <p className="result">{appOwnerName}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Email Address</label>

            {isLoading ? (
              <StyledShimmer style={{ width: "280px" }} className="shimmer" />
            ) : (
              <p className="result">{user?.email}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper dontHaveBorderBottom>
            <label>Cell Number</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : (
              <p className="result">{user?.phone}</p>
            )}
          </SC.FormWrapper>

          {/* <SC.FormWrapper dontHaveBorderBottom>
            <label>Languages</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "160px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledSelect
                onChange={languagesOnChange}
                options={LANGUAGES}
                placeholder="Select a language"
              />
            ) : (
              <p className="result">{languages}</p>
            )}
          </SC.FormWrapper> */}
        </SC.FormContent>

        <div className="divider" />
        <h1 className="title">Company</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
          quam earum ab dolor, accusantium tempore beatae dolorum libero?
        </p>

        <SC.FormContent>
          <SC.FormWrapper>
            <label>Name</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyNameError}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setCompanyNameError(false);
                }}
                placeholder="Enter your company name"
              />
            ) : (
              <p className="result">{companyName}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Business Niche</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "160px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyNicheError}
                value={companyNiche}
                onChange={(e) => {
                  setCompanyNiche(e.target.value);
                  setCompanyNicheError(false);
                }}
                placeholder="Enter your business niche"
              />
            ) : (
              <p className="result">{companyNiche}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Help Email</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyHelpEmailError}
                value={companyHelpEmail}
                onChange={(e) => {
                  setCompanyHelpEmail(e.target.value);
                  setCompanyHelpEmailError(false);
                }}
                placeholder="help@companyname.com"
              />
            ) : (
              <p className="result">{companyHelpEmail}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Help Center</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "180px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyHelpDomainError}
                value={companyHelpDomain}
                onChange={(e) => {
                  setCompanyHelpDomain(e.target.value);
                  setCompanyHelpDomainError(false);
                }}
                placeholder="https://companydomain.com/help"
              />
            ) : (
              <p className="result">{companyHelpDomain}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Help Number</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledPhoneCountryInput
                error={companyHelpNumberError}
                phone={companyHelpNumber}
                handleChangePhone={(e) => {
                  setCompanyHelpNumber(e);
                  setCompanyHelpNumberError(false);
                }}
              />
            ) : (
              <p className="result">{companyHelpNumber}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Address</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "180px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyAddressError}
                value={companyAddress}
                onChange={(e) => {
                  setCompanyAddress(e.target.value);
                  setCompanyAddressError(false);
                }}
                placeholder="Enter your company address"
              />
            ) : (
              <p className="result">{companyAddress}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>City</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyCityError}
                value={companyCity}
                onChange={(e) => {
                  setCompanyCity(e.target.value);
                  setCompanyCityError(false);
                }}
                placeholder="Enter your company city"
              />
            ) : (
              <p className="result">{companyCity}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>State</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "160px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyStateError}
                value={companyState}
                onChange={(e) => {
                  setCompanyState(e.target.value);
                  setCompanyStateError(false);
                }}
                placeholder="Enter your company state"
              />
            ) : (
              <p className="result">{companyState}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Postal Code</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "200px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyPostalCodeError}
                value={companyPostalCode}
                onChange={(e) => {
                  setCompanyPostalCode(e.target.value);
                  setCompanyPostalCodeError(false);
                }}
                placeholder="Enter your company postal code"
              />
            ) : (
              <p className="result">{companyPostalCode}</p>
            )}
          </SC.FormWrapper>

          <SC.FormWrapper dontHaveBorderBottom>
            <label>Country</label>
            {isLoading ? (
              <StyledShimmer style={{ width: "180px" }} className="shimmer" />
            ) : isEditing ? (
              <StyledInput
                error={companyCountryError}
                value={companyCountry}
                onChange={(e) => {
                  setCompanyCountry(e.target.value);
                  setCompanyCountryError(false);
                }}
                placeholder="Enter your company country"
              />
            ) : (
              <p className="result">{companyCountry}</p>
            )}
          </SC.FormWrapper>
        </SC.FormContent>

        <div className="divider" />

        <SC.ButtonsWrapper>
          {isEditing ? (
            <>
              <StyledButton
                onClick={() => setIsEditing(false)}
                variant="outlined"
              >
                Cancel
              </StyledButton>
              <StyledButton
                isLoading={loadingSave}
                onClick={() => {
                  if (loadingSave) return;

                  setLoadingSave(true);
                  updateProfile();
                }}
              >
                Save changes
              </StyledButton>
            </>
          ) : (
            <StyledButton onClick={() => setIsEditing(true)}>
              Edit profile
            </StyledButton>
          )}
        </SC.ButtonsWrapper>
      </SC.Content>
    </SC.Container>
  );
}
