import React from "react";
import { useRecoilValue } from "recoil";
import MobileStatusBar from "../../../../../../../public/global/MobileStatusBar";
import { VirtualAppAtom } from "../../../../../../atoms/VirtualAppAtom";
import * as SC from "./CoursePhoneMockStyledComponents";
import CustomizeCoursePhone from "./CustomizeCoursePhone/CustomizeCoursePhone";

export default function CoursePhoneMock() {
  const virtualApp = useRecoilValue(VirtualAppAtom);

  return (
    <SC.Container>
      <SC.MobileImageWrapper>
        <SC.MobileImage src="/global/mobile-mock.png" alt="Mobile" />
        <SC.ContentWrapper color={virtualApp?.titleBarColor!}>
          <MobileStatusBar color={virtualApp?.titleBarColor!} />
          <SC.StatusBar color={virtualApp?.titleBarColor!}>
            Preview
          </SC.StatusBar>
          <CustomizeCoursePhone />
        </SC.ContentWrapper>
      </SC.MobileImageWrapper>
    </SC.Container>
  );
}
