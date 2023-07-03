import styled from "@emotion/styled";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const Container = styled.div`
  width: 100%;
  height: fit-content;

  position: relative;

  .arrow {
    visibility: hidden;
  }

  .selected-flag {
    width: 100%;
  }

  .flag-dropdown {
    width: 100%;
  }

  .country-list {
    width: 100%;
  }

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

    &::placeholder {
      font-size: 14px;
      color: var(--chakra-colors-gray-400);
    }
  }
`;

const CountryField = styled.div`
  width: calc(100% - 72px);
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: start;

  background-color: white;

  position: absolute;
  top: 6px;
  left: 48px;
  z-index: 1;

  cursor: pointer;
`;

interface Props {
  phone: string;
  handleChangePhone: (vle: string) => void;
  country: string;
  handleChangeCountry: (vle: string) => void;
}

export default function StyledCountryInput(props: Props) {
  const { phone, handleChangePhone, country, handleChangeCountry } = props;

  return (
    <Container>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={(e, data, _event, _form) => {
          handleChangePhone(e);

          handleChangeCountry((data as any).name as string);
        }}
        inputClass={"country-input"}
        autocompleteSearch
      />

      <CountryField
        onClick={() => {
          const el = document.getElementsByClassName("selected-flag")[0];

          if ((el as any).onclick) {
            (el as any).onclick();
          }
          if ((el as any).click) {
            (el as any).click();
          }
        }}
      >
        {country}
      </CountryField>
    </Container>
  );
}
