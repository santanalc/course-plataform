import React, { Fragment } from "react";
import SeoHead from "../../components/global/SeoHead";
import FirstColumn from "../../components/screens/TestDrive/FirstColumn/FirstColumn";
import SecondColumn from "../../components/screens/TestDrive/SecondColumn/SecondColumn";
import * as SC from "./styled";

export default function TestDrive() {
  return (
    <Fragment>
      <SeoHead pageName="Test Drive" />
      <SC.Container>
        <FirstColumn />
        <SecondColumn />
      </SC.Container>
    </Fragment>
  );
}
