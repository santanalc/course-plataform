import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  padding: 32px 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;

  border-bottom: 1px solid #e2e2e2;

  .line {
    width: 100%;
    height: 3px;
    background-image: linear-gradient(
      to right,
      #ccc,
      #ccc 3px,
      transparent 3px,
      transparent 6px
    );
    background-size: 15px 3px;

    &.active {
      background-image: linear-gradient(
        to right,
        #249ad7,
        #249ad7 3px,
        transparent 3px,
        transparent 6px
      );
    }
  }
`;

export const StepComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 12px;

  flex-shrink: 0;

  &.active {
    .circle {
      background: #e4f3fa;
      border-color: #249ad7;
      color: #249ad7;
    }

    .label {
      color: #249ad7;
    }
  }

  .circle {
    width: 40px;
    height: 40px;

    border-radius: 50%;
    border: 1px solid #cccccc;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    line-height: 40px;
    font-weight: 600;
    color: #cccccc;
  }

  .label {
    font-size: 16px;
    font-weight: 600;
    color: #6b6b6b;
  }
`;
