import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const BigContainer = styled(motion.div)`
  width: 100%;
  height: 400px;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.64),
      rgba(0, 0, 0, 0.64)
    ),
    url("/learniversity/beach.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  #styled-search-input {
    input {
      border-radius: 8px !important;
    }
  }

  .react-select-container {
    width: 160px !important;

    position: absolute;
    top: 24px;
    right: 24px;

    @media screen and (max-width: 600px) {
      top: 16px;
      right: 16px;
    }
  }
`;

export const BigSearchWrapper = styled(motion.div)`
  max-width: 600px;
  width: 100%;

  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;

  > .title {
    font-size: 32px;
    font-weight: 700;
    color: white;
    text-align: center;
  }
`;

export const SmallContainer = styled(motion.div)`
  width: calc(100% - 60px);
  min-height: 72px;
  max-height: 72px;

  background: white;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 32px;

  position: fixed;

  border-bottom: 1px solid var(--gray-200);

  #styled-search-input {
    input {
      border-radius: 8px !important;
    }
  }

  .react-select-container {
    width: 160px !important;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;
