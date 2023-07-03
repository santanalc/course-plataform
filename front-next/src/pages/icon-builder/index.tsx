import React, { Fragment } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import InfoBar from "../../components/screens/IconBuilder/InfoBar/InfoBar";
import StyleSidebar from "../../components/screens/IconBuilder/StyleSidebar/StyleSidebar";
import IconBuilderContent from "../../components/screens/IconBuilder/IconBuilderContent/IconBuilderContent";
import IconsSidebar from "../../components/screens/IconBuilder/IconsSidebar/IconsSidebar";
import * as SC from "./styled";

export default function IconBuilder() {
  return (
    <Fragment>
      <SeoHead pageName="Icon Builder" />
      <SC.Container>
        <TopBar
          title="Icon Builder"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Icon builder video"
            />
          }
        />
        <InfoBar />
        <SC.Wrapper>
          <StyleSidebar />
          <IconBuilderContent />
          <IconsSidebar />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
