import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 40px 56px 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 32px;
`;

export const FormWrapper = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 8px;

  .label-wrapper {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #2f2f2f;
    }

    .label-length {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: #979797;
    }
  }
`;

export const FormColor = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;

  .label-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;

    .label {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #2f2f2f;
    }

    .label-description {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #6b6b6b;
    }

    .button {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #fb972e;

      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const ColorButtonsWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 20px;

  .styled-color-picker {
    width: 136px;
  }
`;

export const ColorButton = styled.div<{
  firstColor?: string;
  secondColor?: string;
}>`
  width: fit-content;
  height: fit-content;

  padding: 6px;

  border: 1px solid #e2e2e2;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  cursor: pointer;

  &.active {
    border: 2px solid #249ad7;
  }

  .color-wrapper {
    width: 136px;

    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 16px;

    border: 1px solid #e2e2e2;
    border-radius: 8px;

    overflow: hidden;

    .color {
      width: 40px;
      height: 40px;

      background: ${(props) =>
        props.firstColor && props.secondColor
          ? `linear-gradient(${props.firstColor}, ${props.secondColor})`
          : "#000000"};
    }

    .color-name {
      font-size: 15px;
      font-weight: 600;
      line-height: 23px;
      color: #2f2f2f;
      text-transform: capitalize;
    }
  }
`;

export const PreviewWrapper = styled.div`
  width: 100%;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;

  .text {
    font-size: 15px;
    font-weight: 400;
    line-height: 23px;
    color: #6b6b6b;
  }
`;

export const ColorPaletteWrapper = styled.div`
  width: 100%;

  padding-bottom: 40px;
  margin-top: 16px;
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: repeat(4, 120px);

  border-bottom: 1px solid #e2e2e2;
`;

export const ColorPaletteComponent = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  .label {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #6b6b6b;
    text-transform: uppercase;
  }

  .box-color {
    width: 100%;
    height: 20px;

    border: 1px solid #cccccc;

    background: ${(props) => (props.color ? props.color : "#000")};

    &.no-border-left {
      border-left: none;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  height: 96px;

  border-top: 1px solid #e2e2e2;

  background: white;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: end;
  grid-gap: 16px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 780px;
`;
