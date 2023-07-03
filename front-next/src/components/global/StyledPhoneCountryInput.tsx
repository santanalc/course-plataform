import styled from "@emotion/styled";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface ContainerProps {
  error?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: fit-content;

  .react-tel-input .flag-dropdown {
    border-color: var(--gray-200);

    border-radius: 8px 0 0 8px;

    .country-name {
      margin-left: 32px;
    }
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
  }

  .react-tel-input .country-list {
    min-width: 320px;
  }
`;

interface Props {
  error?: boolean;
  phone: string;
  handleChangeError?: (vle: boolean) => void;
  handleChangePhone: (vle: string) => void;
  handleEnterPressed?: () => void;
}

export default function StyledPhoneCountryInput(props: Props) {
  return (
    <Container error={props.error}>
      <PhoneInput
        country={"us"}
        onFocus={() => {
          props.handleChangeError && props.handleChangeError(false);
        }}
        value={props.phone}
        onChange={(e, data, _event, form) => {
          props.handleChangePhone(e);
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
