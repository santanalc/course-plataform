import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 32px;
`;

export const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 8px;

  color: white;

  .title {
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
  }

  .description {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
`;

export const PhonesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 320px);
  grid-gap: 24px;
`;

export const PhonesContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  position: relative;

  img {
    width: 100%;
    height: 100%;

    z-index: 99;
  }
`;

export const PhoneContentWrapper = styled.div<{ color?: string }>`
  max-width: 260px;
  width: 100%;
  height: 558px;

  background: ${(props) => (props.color ? props.color : "#ffffff")};

  overflow-y: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: absolute;
  top: 31px;

  > img {
    width: 100%;
    height: 155px;

    object-fit: cover;
  }

  > svg {
    width: 100%;
  }
`;

export const TitleBar = styled.div<{ color?: string }>`
  width: 100%;
  height: 32px;

  background: ${(props) => (props.color ? props.color : "#000000")};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: white;

  flex-shrink: 0;
`;

export const FirstPhoneContent = styled.div<{ color?: string }>`
  width: 100%;
  max-height: fit-content;

  overflow-y: hidden;

  background: ${(props) => (props.color ? props.color : "#ffffff")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const FirstPhoneCard = styled.div<{ color?: string }>`
  width: 100%;

  padding: 8px 12px;

  background: ${(props) => (props.color ? props.color : "unset")};

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 10px;

  .fake-image {
    width: 44px;
    height: 44px;

    background: #6b6b6b;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
  }

  .text-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;

    .title {
      font-size: 12px;
      font-weight: 600;
      color: #000;
    }

    .description {
      font-size: 10px;
      font-weight: 400;
      color: #000;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export const SecondPhoneContent = styled.div<{ color?: string }>`
  width: 100%;
  height: 100%;

  background: ${(props) => (props.color ? props.color : "#ffffff")};

  padding: 32px 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 16px;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    grid-gap: 4px;

    .title {
      font-size: 12px;
      line-height: 20px;
      font-weight: 600;
      color: #000;
    }

    .description {
      font-size: 10px;
      line-height: 18px;
      font-weight: 400;
      color: #000;
    }
  }
`;

export const Button = styled.button<{ color?: string }>`
  width: fit-content;
  height: fit-content;

  background: ${(props) => (props.color ? props.color : "#000000")};

  padding: 6px 12px;

  border-radius: 32px;

  font-size: 13px;
  font-weight: 600;
  color: white;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const MobileNavigationBarWrapper = styled.div<{ color?: string }>`
  width: 100%;
  height: 48px;

  background: ${(props) => (props.color ? props.color : "#000000")};

  padding: 0 17px;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;

  position: relative;

  svg {
    width: 20px;
    height: 20px;

    color: #ffffff;

    z-index: 9;
  }

  flex-shrink: 0;
`;
