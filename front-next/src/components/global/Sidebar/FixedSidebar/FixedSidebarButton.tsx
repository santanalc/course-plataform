import styled from "@emotion/styled";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { Tooltip } from "@chakra-ui/tooltip";

const SidebarButtonContainer = styled.li`
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  cursor: pointer;

  transition: background 0.2s ease-in-out;

  img {
    transform: scale(0.8);
  }

  &:hover {
    background: #2f75b6;
  }

  &.active {
    &::after {
      content: "";
      width: 4px;
      height: 56px;
      background: #fff;
      position: absolute;
      right: 0px;
      top: 0;
    }
  }
`;

interface SidebarButtonProps {
  tooltipLabel: string;
  path: string;
  src: string;
}

export default function FixedSidebarButton({
  tooltipLabel,
  path,
  src,
}: SidebarButtonProps) {
  const router = useRouter();

  return (
    <Tooltip hasArrow placement="right" label={tooltipLabel}>
      <SidebarButtonContainer
        onClick={() => router.push(path)}
        className={router.asPath === path ? "active" : ""}
      >
        <img src={src} alt={tooltipLabel} />
      </SidebarButtonContainer>
    </Tooltip>
  );
}
