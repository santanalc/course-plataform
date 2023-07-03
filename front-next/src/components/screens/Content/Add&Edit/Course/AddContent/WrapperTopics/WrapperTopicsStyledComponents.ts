import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 136px);
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  border-right: 1px solid var(--gray-200);
`;

export const Header = styled.div`
  width: 100%;
  min-height: 72px;
  max-height: 72px;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-200);

  > .title {
    font-size: 18px;
    font-weight: 700;
    color: #2f2f2f;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 24px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 32px;

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const WrapperContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 8px;

  ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
}

ul {
  position: relative;
  width: 450px;
}

li {
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  cursor: default;
}

.refresh {
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
`;
