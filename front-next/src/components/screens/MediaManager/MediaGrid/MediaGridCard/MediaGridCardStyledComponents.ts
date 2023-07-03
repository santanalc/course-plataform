import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 208px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;

  &:hover {
    .media-card-icon-button {
      opacity: 1;
    }
  }
`;

export const AssetWrapper = styled.div`
  width: 100%;
  height: 176px;

  padding: 24px;

  background: var(--gray-100);
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const Illustration = styled.img``;

export const LabelWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    color: var(--blue-300);
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const IconButton = styled.button`
  width: 32px;
  height: 32px;

  opacity: 0;

  position: absolute;
  top: 16px;
  right: 16px;

  flex-shrink: 0;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  transition: all 0.2s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-600);

    transition: color 0.2s ease-in-out;
  }

  &:hover {
    background: var(--orange-300);

    svg {
      color: white;
    }
  }
`;
