/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import Icon from "@chakra-ui/icon";
import StyledInput from "../../../global/StyledInput";
import * as SC from "./IconsSidebarStyledComponents";
import { FaIconsArray } from "../../../data/FaIconsArray";
import { useRecoilState } from "recoil";
import { IconBuilderAtom } from "../../../../atoms/IconBuilderAtom";
import useDebounce from "../../../../hooks/useDebounce";

export default function IconsSidebar() {
  const [iconArray, setIconArray] = useState(FaIconsArray);
  const [searchIcons, setSearchIcons] = useState("");
  const [iconBuilder, setIconBuilder] = useRecoilState(IconBuilderAtom);
  const [iconType, setIconType] = useState<"ALL" | "FILLED" | "OUTLINED">(
    "ALL"
  );
  const debouncedSearchIcons = useDebounce(searchIcons, 300);

  useEffect(() => {
    if (iconType === "FILLED") {
      setIconArray(FaIconsArray.filter((i) => !i.toString().includes("Reg")));
      return;
    }

    if (iconType === "OUTLINED") {
      setIconArray(FaIconsArray.filter((i) => i.toString().includes("Reg")));
      return;
    }

    setIconArray(FaIconsArray);
  }, [iconType]);

  return (
    <SC.Container>
      <SC.PaddingRightWrapper>
        <h1 className="title">Icons</h1>

        <SC.FormWrapper>
          <label>Search icons</label>
          <StyledInput
            value={searchIcons}
            onChange={(e) => setSearchIcons(e.target.value)}
            placeholder="Enter keywords or select category"
          />
        </SC.FormWrapper>

        <SC.TypeIconButtonsWrapper>
          <SC.TypeIconButton
            onClick={() => setIconType("ALL")}
            className={iconType === "ALL" ? "active" : ""}
          >
            All
          </SC.TypeIconButton>
          <SC.TypeIconButton
            onClick={() => setIconType("FILLED")}
            className={iconType === "FILLED" ? "active" : ""}
          >
            Filled
          </SC.TypeIconButton>
          <SC.TypeIconButton
            onClick={() => setIconType("OUTLINED")}
            className={iconType === "OUTLINED" ? "active" : ""}
          >
            Outlined
          </SC.TypeIconButton>
        </SC.TypeIconButtonsWrapper>
      </SC.PaddingRightWrapper>

      <SC.IconsListWrapper>
        {iconArray
          .filter((i) =>
            i
              .toString()
              .toLocaleLowerCase()
              .includes(debouncedSearchIcons.toString().toLocaleLowerCase())
          )
          .map((i) => (
            <SC.IconWrapper
              key={i.toString()}
              onClick={() => setIconBuilder({ ...iconBuilder, icon_name: i })}
              className={iconBuilder.icon_name === i ? "active" : ""}
            >
              <Icon as={i} />
            </SC.IconWrapper>
          ))}
      </SC.IconsListWrapper>
    </SC.Container>
  );
}
