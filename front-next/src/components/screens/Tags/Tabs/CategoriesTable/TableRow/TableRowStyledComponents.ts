import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: grid;
  grid-template-columns: repeat(4, 1fr) 16px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

export const TR = styled(TableStructure)`
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }

  .first-column {
    display: flex;
    align-items: center;
    justify-content: start;
  }

  .second-column {
  }

  .third-column {
  }

  .fourth-column {
  }

  .fifth-column {
    display: flex;
    align-items: center;
    justify-content: end;

    cursor: pointer;

    > svg {
      color: var(--gray-400);
    }
  }
`;

export const TagCard = styled.div`
  width: fit-content;
  height: fit-content;

  padding: 4px 12px;

  border-radius: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  &.user-tag {
    background-image: linear-gradient(
      -90deg,
      var(--blue-300) 0%,
      var(--blue-400) 50%,
      var(--blue-300) 100%
    );

    background-size: 400% 400%;

    animation: shimmer 1.2s ease-in-out infinite;

    @keyframes shimmer {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
  }

  &.system-tag {
    border: 1px solid;
    border-color: #b0b3b4;

    > p {
      color: #0075bb;
    }
  }

  > p {
    max-width: 128px;

    font-size: 15px;
    font-weight: 400;
    color: white;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
