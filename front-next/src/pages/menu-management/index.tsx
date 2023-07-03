import { FaPlay } from "react-icons/fa";
import TopBar from "../../components/global/TopBar";
import SeoHead from "../../components/global/SeoHead";
import StyledIconButton from "../../components/global/StyledIconButton";
import FirstColumn from "../../components/screens/MenuManagement/FirstColumn/FirstColumn";
import MenuManagementPhoneMock from "../../components/screens/MenuManagement/MenuManagementPhoneMock/MenuManagementPhoneMock";
import { Fragment } from "react";
import * as SC from "./styled";

export default function MenuManagement() {
  return (
    <Fragment>
      <SeoHead pageName="Menu Management" />
      <SC.Container>
        <TopBar
          title="Menu Management"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Menu management video"
            />
          }
        />
        <SC.Wrapper>
          <FirstColumn />
          <MenuManagementPhoneMock />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
