import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import StyledCheckbox from "../StyledCheckbox";

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

const PopoverButtonCheckbox = styled.span`
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

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--orange-100);
  }
`;

interface ButtonCheckbox {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLabel: string;
}

type StyledPopoverFilterCheckboxProps = {
  title: string;
  buttons: ButtonCheckbox[];
  placeholder?: string;
};

export default function StyledPopoverFilterCheckbox({
  title,
  buttons,
  placeholder = "Select a filter",
}: StyledPopoverFilterCheckboxProps) {
  return (
    <Popover placement="bottom">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <TriggerWrapper>
              <Trigger id="styled-popover-filter-checkbox">
                {buttons.filter((p) => p.value === true).length > 0 && (
                  <span className="circle">
                    {buttons.filter((p) => p.value === true).length}
                  </span>
                )}

                {buttons.filter((p) => p.value === true).length === 0
                  ? placeholder
                  : buttons.filter((p) => p.value === true).length === 1
                  ? `Filter selected`
                  : `Filters selected`}
              </Trigger>

              {isOpen ? <FaCaretUp /> : <FaCaretDown />}
            </TriggerWrapper>
          </PopoverTrigger>

          <PopoverContent minWidth="208px" width="fit-content" padding="4px">
            <PopoverTitle>{title}</PopoverTitle>
            {buttons.map((b) => (
              <PopoverButtonCheckbox
                key={b.buttonLabel}
                className={b.value ? "checked" : ""}
                onClick={() => b.setValue(!b.value)}
              >
                <StyledCheckbox
                  value={b.value}
                  onClick={() => b.setValue(!b.value)}
                />
                {b.buttonLabel}
              </PopoverButtonCheckbox>
            ))}
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
