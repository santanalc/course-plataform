import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import { useRouter } from "next/dist/client/router";
import Vimeo from "@u-wave/react-vimeo";

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

  div,
  iframe {
    width: 100%;
    height: 100%;
  }
`;

export default function Learniversity() {
  const router = useRouter();
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoName = "Video Name";
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      setVideoURL(
        videoURL
          ? "https://player.vimeo.com/video/598614145"
          : "https://player.vimeo.com/video/598614145"
      );
      setIsLoading(false);
    })();
  }, []);

  if (!id) return null;

  return (
    <>
      <SeoHead pageName={`Learniversity - ${videoName}`} />
      <Container>
        <TopBar
          title={`Learniversity - ${videoName}`}
          onClickButtonBack={() => router.push("/learniversity")}
        />
        <Wrapper>
          {isLoading ? (
            <Spinner size="lg" color="orange.50" />
          ) : (
            <Vimeo
              paused={true}
              showTitle={false}
              video={"https://vimeo.com/90509568"}
              color="fb972e"
            />
          )}
        </Wrapper>
      </Container>
    </>
  );
}
