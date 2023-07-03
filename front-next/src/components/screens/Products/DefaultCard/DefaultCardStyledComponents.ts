import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 16px;

  cursor: pointer;

  position: relative;

  > .circle-status {
    width: 20px;
    height: 20px;

    border-radius: 50%;

    border: 3px solid white;

    position: absolute;
    bottom: -4px;
    left: 56px;
    z-index: 9;

    &.approved {
      background: #5cb85c;
    }

    &.unapproved {
      background: #f0e93b;
    }
  }
`;

export const FakeImage = styled.span`
  width: 72px;
  height: 72px;

  flex-shrink: 0;

  background: #2f2f2f;

  border-radius: 16px;
`;

export const ImageWrapper = styled.div`
  width: 72px;
  height: 72px;

  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
`;

export const Image = styled(motion.img)`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-position: center;
  object-fit: cover;
  mask-repeat: no-repeat;
`;

export const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > .title {
    font-size: 20px;
    font-weight: 700;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: #6b6b6b;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const PriceWrapper = styled.span`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 4px;

  > .label {
    font-size: 14px;
    font-weight: 700;
    color: #2f2f2f;
  }

  > .value {
    font-size: 14px;
    font-weight: 400;
    color: #6b6b6b;
  }
`;
