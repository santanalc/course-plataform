import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface ContainerProps {
  error?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;

  position: relative;

  ${(props) =>
    props.error &&
    css`
      .react-tel-input .form-control {
        border: 1px solid #c41700 !important;
        box-shadow: 0px 0px 6px #c417004d !important;
      }
    `}

  .country-input {
    width: 100%;
    padding: 12px 12px 12px 10px;
  }

  .arrow {
    visibility: hidden;
  }

  .selected-flag {
    visibility: hidden;
  }

  .flag-dropdown {
    visibility: hidden;
  }

  .country-list {
    visibility: hidden;
  }

  .react-tel-input .form-control {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: var(--gray-200);
    border-radius: 8px;
    padding: 16px;
    color: var(--gray-700);
    background: white;
    opacity: 1;
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

interface Props {
  error?: boolean;
  country: string;
  phone: string;
  handleChangeError?: (vle: boolean) => void;
  handleChangePhone: (vle: string) => void;
  handleChangeCountry: (vle: string) => void;
  handleEnterPressed?: () => void;
}

export default function StyledPhoneInput(props: Props) {
  return (
    <Container error={props.error}>
      <PhoneInput
        onFocus={() => {
          props.handleChangeError && props.handleChangeError(false);
        }}
        country={"us"}
        value={props.phone}
        onChange={(e, data, _event, form) => {
          props.handleChangePhone(e);
          if (props.country === "Canada") {
            props.handleChangeCountry("Canada");
          } else props.handleChangeCountry((data as any).name as string);
        }}
        onKeyDown={(evt) => {
          if (evt.key === "Enter" && props.handleEnterPressed) {
            props.handleEnterPressed();
          }
        }}
        inputClass={"country-input"}
        autocompleteSearch
      />
    </Container>
  );
}
