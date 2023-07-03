import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;

  position: relative;

  > .number {
    font-size: 20px;
    font-weight: 700;
    color: #979797;
  }

  > .plus-button {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -8px;
    right: -8px;

    background: var(--orange-300);

    border-radius: 50%;

    cursor: pointer;

    > svg {
      width: 20px;
      height: 20px;
      color: white;
    }
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: 88px;

  padding: 0 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  border: 2px solid transparent;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  transition: all 0.3s ease-in-out;

  cursor: pointer;

  &.active {
    border-color: var(--orange-300);
  }
`;

export const TextWrapper = styled.span`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > .topic-title {
    font-size: 16px;
    font-weight: 700;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    &.empty {
      font-style: italic !important;
      color: #6b6b6b !important;
    }
  }

  > .topic-description {
    font-size: 14px;
    font-weight: 400;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    &.empty {
      font-style: italic !important;
      color: #979797 !important;
    }
  }
`;

export const MoreActionsWrapper = styled.div`
  width: 20px;
  height: 20px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: end;

  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
    color: #707070;
  }
`;
