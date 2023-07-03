import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {
  StepOptionsAtom,
  StepOptionsProps,
} from "../../../../atoms/TestDriveAtom";
import PhonesMock from "./PhonesMock/PhonesMock";
import * as SC from "./SecondColumnStyledComponents";

export default function SecondColumn() {
  const testDriveStep = useRecoilValue(StepOptionsAtom);

  const returnBody = useCallback(
    (currentSelected: StepOptionsProps) => {
      switch (currentSelected) {
        case "NEW_PASSCODE":
          return (
            <iframe
              src="https://player.vimeo.com/video/412040423"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        case "TERMS_OF_SERVICE":
          return (
            <iframe
              src="https://player.vimeo.com/video/412040423"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        case "APP_SETUP":
          return <PhonesMock />;
        default:
          return <img src="/test-drive/troy-video.png" alt="Video Troy" />;
      }
    },
    [testDriveStep]
  );

  return (
    <SC.Container>
      <SC.LogoWrapper>
        <img src="/test-drive/logo-text-white.svg" alt="Learnistic" />
        <img src="/test-drive/test-drive-text.svg" alt="Test Drive" />
      </SC.LogoWrapper>
      {returnBody(testDriveStep)}
      <SC.HelpDeskWrapper>
        <p className="white">Having troubles?</p>
        <p className="yellow">Contact HelpDesk</p>
      </SC.HelpDeskWrapper>
    </SC.Container>
  );
}
