import styled from "@emotion/styled";

export const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > img {
    width: 96px;

    margin-bottom: 24px;
  }

  > h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-700);
  }

  > p {
    margin: 16px 0 24px;
    font-size: 18px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;
