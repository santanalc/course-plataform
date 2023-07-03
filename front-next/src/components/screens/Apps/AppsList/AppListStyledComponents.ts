import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > .title {
    font-size: 48px;
    font-weight: 300;
    color: white;
    text-align: center;
  }

  > #styled-search-input {
    max-width: 640px;

    margin: 32px 0 48px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-wrap: wrap;
  grid-gap: 48px; */

  .card-container {
    width: 100%;

    display: block;

    .slick-slide {
      display: flex;
      flex-direction: column;
      grid-gap: 32px;
    }

    .slick-track {
      margin: 0 auto;
    }

    .slick-disabled {
      opacity: 0.64;
      cursor: not-allowed;
    }

    .slick-next {
      right: 0;
    }

    .slick-prev {
      left: -50px;
    }
  }
`;

export const SlickArrowButton = styled.button`
  width: 48px;
  height: 48px;

  padding: 16px;

  background: white;
  border: none;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  flex-shrink: 0;

  border-radius: 50%;

  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.1s ease-in-out;

  cursor: pointer;

  &::before {
    display: none;
  }

  &:focus,
  &:hover {
    background: white !important;
  }

  &:active {
    width: 56px;
    height: 56px;
  }

  > svg {
    width: 100%;
    height: 100%;

    color: var(--gray-300);
  }
`;
