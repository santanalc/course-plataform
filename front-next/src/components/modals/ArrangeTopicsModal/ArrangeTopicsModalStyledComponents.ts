import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--gray-200);
`;

export const ModalFooterCSS = css`
  padding: 24px;

  grid-gap: 16px;

  border-top: 1px solid var(--gray-200);
`;

export const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;
  max-height: 400px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  @media screen and (min-height: 900px) {
    min-height: 560px;
    max-height: 560px;
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 500px;
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 24px;
  }

  ul {
    position: relative;
    width: 450px;
  }

  li {
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
    position: relative;
    background: white;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: default;
  }

  .refresh {
    padding: 10px;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-700);
`;

export const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;
