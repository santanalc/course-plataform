/** @jsxImportSource @emotion/react */
import { Input, Tooltip } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { IconNameAtom } from "../../../../atoms/IconBuilderAtom";
import useClickOutside from "../../../../hooks/useClickOutside";
import * as SC from "./InfoBarStyledComponents";

export default function InfoBar() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [iconName, setIconName] = useRecoilState(IconNameAtom);
  const wrapperRef = useClickOutside(() => {
    setIsInputActive(false);
  });

  return (
    <SC.Container id="infor-bar-icon-builder">
      {isInputActive ? (
        <Input
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
          css={css`
            max-width: 320px;
            :focus {
              box-shadow: 0 4px 6px -6px var(--orange-400);
              border-bottom: 1px solid var(--orange-300);
            }
          `}
          variant="flushed"
          placeholder="Flushed"
        />
      ) : (
        <Tooltip hasArrow placement="top" label="Click to change icon name">
          <h1 onClick={() => setIsInputActive(true)} className="icon-name">
            {iconName ? iconName : "Untitled layered icon"}
          </h1>
        </Tooltip>
      )}

      <SC.ButtonWrapper>
        <RiArrowGoBackFill />
        <RiArrowGoForwardFill />
        <p>Changes saved</p>
      </SC.ButtonWrapper>
    </SC.Container>
  );
}
