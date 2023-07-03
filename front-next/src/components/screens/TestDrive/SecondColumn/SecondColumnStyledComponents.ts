import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 72px 72px 72px 80px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-image: linear-gradient(to bottom, #009bd5, #0075bb);
`;

export const LogoWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
`;

export const HelpDeskWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 6px;

  p {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
  }

  .white {
    color: white;
  }

  .yellow {
    color: #fb972e;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
