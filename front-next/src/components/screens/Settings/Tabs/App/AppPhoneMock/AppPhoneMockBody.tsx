import React, { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { IconBuilderBackgroundColorAtom } from "../../../../../../atoms/IconBuilderAtom";
import { SettingsAppBackgroundColorAtom } from "../../../../../../atoms/SettingsAppAtom";
import * as SC from "./AppPhoneMockStyledComponents";

export default function AppPhoneMockBody(props: PropsWithChildren<{}>) {
  const backgroundColor = useRecoilValue(SettingsAppBackgroundColorAtom);

  return <SC.Body color={backgroundColor}>{props.children}</SC.Body>;
}
