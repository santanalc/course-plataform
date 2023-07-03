import { Progress, Spinner } from "@chakra-ui/react";
import React from "react";
import * as SC from "./CardStyledComponents";

type Props = {
  fileName: string;
};

export default function LoadingCard({ fileName }: Props) {
  return (
    <SC.Container waiting={true}>
      <SC.ProgressInfoWrapper>
        <SC.FirstColumnWrapper>
          <h2 className="file-name">{fileName}</h2>
          <Progress width="100%" size="sm" value={0} css={SC.ProgressCSS} />
          <SC.StatusWrapper>
            <p className="file-size"></p>
            <p className="progress-label">Waiting to upload</p>
          </SC.StatusWrapper>
        </SC.FirstColumnWrapper>
        <SC.DownloadStatusWrapper>
          <Spinner
            className="hidden-on-hover"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.300"
            size="md"
          />
        </SC.DownloadStatusWrapper>
      </SC.ProgressInfoWrapper>
    </SC.Container>
  );
}
