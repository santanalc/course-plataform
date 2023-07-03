import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 16px;

  cursor: pointer;
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

  .inactive-wrapper {
    width: 100%;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #bbbbbb;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }
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

  &.inactive-image {
    filter: grayscale(1);
  }
`;

export const TextWrapper = styled.span`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > .title {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-700);

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
