import React from "react";
import VideoList from "../VideoList/VideoList";
import * as SC from "./VideoWrapperStyledComponents";

export default function VideoWrapper() {
  return (
    <SC.Container>
      <VideoList title="Option 1" />
      <VideoList title="Option 2" />
      <VideoList title="Option 3" />
    </SC.Container>
  );
}
