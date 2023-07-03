import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { IoCartOutline, IoPlayOutline } from "react-icons/io5";
import MobileStatusBar from "../../../../../../../public/global/MobileStatusBar";
import { SettingsAppTitleBarColorAtom } from "../../../../../../atoms/SettingsAppAtom";
import AppPhoneMockBody from "./AppPhoneMockBody";
import MobileNavigationBar from "./MobileNavigationBar";
import * as SC from "./AppPhoneMockStyledComponents";

type AppPhoneMockContentProps = {
  children: ReactNode;
  bottomNavigationColor: string;
};

export default function AppPhoneMockContent({
  children,
  bottomNavigationColor,
}: AppPhoneMockContentProps) {
  const titleBarColor = useRecoilValue(SettingsAppTitleBarColorAtom);

  return (
    <SC.ContentWrapper color={titleBarColor}>
      <MobileStatusBar color={titleBarColor} />
      <SC.StatusBar color={titleBarColor}>App Colors Preview</SC.StatusBar>

      <AppPhoneMockBody>{children}</AppPhoneMockBody>

      <SC.MobileNavigationBarWrapper>
        <MobileNavigationBar bottomNavigationColor={bottomNavigationColor} />
        <AiOutlineHome />
        <IoPlayOutline />
        <AiOutlineHeart />
        <BsChat />
        <IoCartOutline />
      </SC.MobileNavigationBarWrapper>
    </SC.ContentWrapper>
  );
}
