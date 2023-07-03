import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  width: 100%;
  min-height: 72px;
  max-height: 72px;

  padding: 0 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 16px;

  border: 2px solid transparent;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  transition: all 0.3s ease-in-out;
  background-color: white;
`;

export const DragIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  cursor: grab;

  &:hover {
    svg {
      color: #bbbbbb;
    }
  }

  > svg {
    width: 32px;
    height: 32px;
    color: #cecece;

    transition: color 0.2s ease-in-out;
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
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    &.empty {
      font-style: italic !important;
      color: #979797 !important;
    }
  }
`;

export const ButtonsWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
`;

export const ArrowWrapper = styled.div`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: end;

  cursor: pointer;

  > svg {
    color: var(--orange-300);
  }
`;
