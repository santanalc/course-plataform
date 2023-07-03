import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  margin: 48px auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  @media screen and (max-width: 1140px) {
    padding: 40px 32px;
  }

  @media screen and (max-width: 768px) {
    padding: 32px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const Table = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  #styled-checkbox {
    margin-right: 8px;
  }
`;

export const TableBody = styled.div`
  width: 100%;

  margin: 16px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
`;

export const DownloadCSV = styled.p`
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: var(--blue-300);

  margin-bottom: 20px;
  :hover {
    opacity: 0.8;
  }
`;
