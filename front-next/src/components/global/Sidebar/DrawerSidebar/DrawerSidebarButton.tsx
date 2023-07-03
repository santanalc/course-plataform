import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";

const DrawerButton = styled.li`
  width: 100%;
  height: 40px;

  padding: 0 16px;

  border-radius: 32px;

  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;

  cursor: pointer;

  transition: background 0.2s ease-in-out;

  img {
    transform: scale(0.72);
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  &.active {
    background: rgba(255, 255, 255, 0.08);
  }
`;

type DrawerSidebarButtonProps = {
  label: string;
  path: string;
  src: string;
};

export default function DrawerSidebarButton({
  label,
  path,
  src,
}: DrawerSidebarButtonProps) {
  const router = useRouter();

  return (
    <DrawerButton
      onClick={() => router.push(path)}
      className={router.asPath === path ? "active" : ""}
    >
      <img src={src} alt={label} />
      <span>{label}</span>
    </DrawerButton>
  );
}
