import React from "react";
import styled from "@emotion/styled";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from "@chakra-ui/react";
import { FaRegBell } from "react-icons/fa";
import { css } from "@emotion/react";
import DownloadCardItem from "./DownloadCardItem";
import { useRecoilValue } from "recoil";
import { HookFileUploadAtom } from "../../../../../hooks/useUploadFile";

const PopoverHeaderCSS = css`
  font-size: 16px;
  color: #222222;
  font-weight: 600;
`;

const PopoverBodyCSS = css`
  width: 100%;

  padding: 0;
`;

const DownloadCardList = styled.div`
  width: 100%;
  height: 208px;

  padding: 16px;

  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;
`;

const NotificationIconWrapper = styled.div`
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
    color: white;
  }

  > .icon-circle {
    width: 10px;
    height: 10px;

    border-radius: 50%;

    background: var(--orange-300);

    position: absolute;
    top: -2px;
    right: -2px;
  }
`;

export default function SystemNotificationsPopover() {
  const uploadFiles = useRecoilValue(HookFileUploadAtom);

  return (
    <Box zIndex={999}>
      <Popover placement="right-end">
        <PopoverTrigger>
          <NotificationIconWrapper>
            <FaRegBell />
            <span className="icon-circle" />
          </NotificationIconWrapper>
        </PopoverTrigger>
        <PopoverContent width="400px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader css={PopoverHeaderCSS} padding="8px 16px">
            System Notifications
          </PopoverHeader>
          <PopoverBody css={PopoverBodyCSS}>
            <DownloadCardList>
              {uploadFiles &&
                Object.keys(uploadFiles).map((fileId) => (
                  <DownloadCardItem
                    key={fileId}
                    fileId={fileId}
                    file={uploadFiles[fileId]}
                  />
                ))}
            </DownloadCardList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
