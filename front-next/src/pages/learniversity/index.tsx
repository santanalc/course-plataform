import React from "react";
import styled from "@emotion/styled";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import Header from "../../components/screens/Learniversity/Header/Header";
import VideoWrapper from "../../components/screens/Learniversity/VideoWrapper/VideoWrapper";

const Container = styled.main`
  width: calc(100% - 60px);
  min-height: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 72px);
  min-height: 100%;

  overflow-y: auto;
`;

export default function Learniversity() {
  return (
    <>
      <SeoHead pageName="Learniversity" />
      <Container>
        <TopBar
          title="Learniversity"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Learniversity video"
            />
          }
        />
        <Wrapper>
          <Header />
          <VideoWrapper />
        </Wrapper>
      </Container>
    </>
  );
}
