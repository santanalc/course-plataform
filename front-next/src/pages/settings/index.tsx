import React, { Fragment, useState } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import StyledIconButton from "../../components/global/StyledIconButton";
import TopBar from "../../components/global/TopBar";
import SettingsNavigation from "../../components/screens/Settings/SettingsNavigation/SettingsNavigation";
import App from "../../components/screens/Settings/Tabs/App/App";
import AppPhoneMock from "../../components/screens/Settings/Tabs/App/AppPhoneMock/AppPhoneMock";
import Profile from "../../components/screens/Settings/Tabs/Profile/Profile";
import * as SC from "./styled";

export enum SettingsTabs {
  PROFILE = "PROFILE",
  APP = "APP",
}

export default function Settings() {
  const [selected, setSelected] = useState(SettingsTabs.PROFILE);

  const [bottomNavigationColor, setBottomNavigationColor] = useState({
    value: "",
    label: "",
  });

  function handleSelected(vle: SettingsTabs) {
    setSelected(vle);
  }

  return (
    <Fragment>
      <SeoHead pageName="Settings" />
      <SC.Container>
        <TopBar
          title="Settings"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Settings video"
            />
          }
        />

        <SettingsNavigation
          selected={selected}
          handleSelected={handleSelected}
        />

        {(() => {
          switch (selected) {
            case SettingsTabs.PROFILE:
              return (
                <SC.ProfileWrapper>
                  <Profile />
                </SC.ProfileWrapper>
              );
            case SettingsTabs.APP:
              return (
                <SC.AppWrapper>
                  <App
                    bottomNavigationColor={bottomNavigationColor}
                    setBottomNavigationColor={setBottomNavigationColor}
                  />
                  <AppPhoneMock
                    bottomNavigationColor={bottomNavigationColor.label}
                  />
                </SC.AppWrapper>
              );
          }
        })()}
      </SC.Container>
    </Fragment>
  );
}
