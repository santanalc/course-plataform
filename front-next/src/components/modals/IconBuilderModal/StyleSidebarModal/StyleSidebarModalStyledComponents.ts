import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 16px 24px;

  border-right: 1px solid var(--gray-200);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;

  > .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const BackgroundTypeWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const BackgroundTypeCard = styled.div`
  width: fit-content;
  height: fit-content;

  padding: 8px;

  border: 1px solid transparent;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 8px;

  cursor: pointer;

  transition: background 0.2s ease-in-out;

  > .box-wrapper {
    width: 72px;
    height: 72px;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
  }

  > .box-wrapper.gradient {
    background: linear-gradient(var(--blue-300), var(--blue-400));
  }

  > .box-wrapper.solid {
    background: var(--blue-400);
  }

  > .box-wrapper.image {
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--blue-400);

    svg {
      width: 32px;
      height: 32px;

      color: white;
    }
  }

  > .card-title {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-700);
  }

  &:hover {
    background: var(--gray-100);
  }

  &.active {
    border-color: var(--orange-300);
  }
`;
