import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const TriggerWrapper = styled.span`
  min-width: 208px;
  width: fit-content;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  svg {
    width: 20px;
    height: 20px;

    color: var(--gray-300);

    position: absolute;
    right: 16px;
  }

  .circle {
    width: 16px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    font-weight: 500;
    color: white;

    border-radius: 50%;

    background: var(--orange-300);
  }
`;

const Trigger = styled.span`
  width: 100%;
  height: 40px;

  border: 1px solid;
  border-color: var(--gray-200);
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;

  padding: 16px;
  color: var(--gray-700);

  background: white;

  transition: box-shadow 0.3s, border 0.3s;

  :focus {
    box-shadow: 0px 0px 6px var(--orange-400);
    border: 1px solid var(--orange-300);
  }
`;

const PopoverTitle = styled.h1`
  width: 100%;

  padding: 8px 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--gray-400);
`;

const PopoverButtonRadio = styled.span`
  width: 100%;
  height: 40px;

  padding: 0 16px;
  border-radius: 4px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;

  font-size: 14px;
  font-weight: 400;
  color: var(--gray-700);

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--orange-100);
  }

  .css-1kgxlt9[aria-checked="true"],
  .css-1kgxlt9[data-checked],
  .css-1rggdzb[aria-checked="true"],
  .css-1rggdzb[data-checked] {
    background: var(--orange-300);
    border-color: var(--orange-300);
  }
`;

interface ButtonRadio {
  buttonLabel: string;
}

type StyledPopoverFilterRadioProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  buttons: ButtonRadio[];
};

export default function StyledPopoverFilterRadio({
  value,
  setValue,
  title,
  buttons,
}: StyledPopoverFilterRadioProps) {
  return (
    <Popover placement="bottom">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <TriggerWrapper>
              <Trigger id="styled-popover-filter-radio">{value}</Trigger>
              {isOpen ? <FaCaretUp /> : <FaCaretDown />}
            </TriggerWrapper>
          </PopoverTrigger>
          <PopoverContent minWidth="208px" width="fit-content" padding="4px">
            <PopoverTitle>{title}</PopoverTitle>
            <RadioGroup onChange={setValue} value={value}>
              {buttons.map((b) => (
                <PopoverButtonRadio key={b.buttonLabel}>
                  <Radio
                    color="orange"
                    width="100%"
                    height="100%"
                    value={b.buttonLabel}
                  >
                    {b.buttonLabel}
                  </Radio>
                </PopoverButtonRadio>
              ))}
            </RadioGroup>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
