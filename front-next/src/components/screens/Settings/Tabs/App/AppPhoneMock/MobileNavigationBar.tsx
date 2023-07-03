/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import * as SC from "./AppPhoneMockStyledComponents";
import { css } from "@emotion/react";
import {
  SettingsAppBackgroundColorAtom,
  SettingsAppTitleBarColorAtom,
} from "../../../../../../atoms/SettingsAppAtom";
import { useRecoilValue } from "recoil";

type MobileNavigationBarProps = {
  bottomNavigationColor: string;
};

export default function MobileNavigationBar({
  bottomNavigationColor,
}: MobileNavigationBarProps) {
  const titleBarColor = useRecoilValue(SettingsAppTitleBarColorAtom);
  const backgroundColor = useRecoilValue(SettingsAppBackgroundColorAtom);

  const returnCSS = useCallback(
    (currentSelected: string) => {
      const LightTheme = css`
        background: ${backgroundColor};
        filter: brightness(1.25);
      `;

      const DarkTheme = css`
        background: ${backgroundColor};
        filter: brightness(0.5);
      `;

      const MediumTheme = css`
        background: ${backgroundColor};
        filter: brightness(0.75);
      `;

      const TitleColor = css`
        background: ${titleBarColor};
      `;

      switch (currentSelected) {
        case "Light Theme":
          return LightTheme;
        case "Medium Theme":
          return MediumTheme;
        case "Dark Theme":
          return DarkTheme;
        case "Title Color":
          return TitleColor;
        default:
          return TitleColor;
      }
    },
    [bottomNavigationColor, titleBarColor, backgroundColor]
  );

  return (
    <SC.MobileNavigationBarBackground css={returnCSS(bottomNavigationColor)} />
  );
}
