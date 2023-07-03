import styled from "@emotion/styled";

export const CourseImage = styled.img`
  width: 100%;
  height: 344px;

  object-fit: cover;
  object-position: center;

  flex-shrink: 0;
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 344px;

  background: #404040;

  flex-shrink: 0;
`;

export const CourseCard = styled.div`
  width: 100%;
  height: 112px;

  padding: 20px;

  background: #ffffff;

  border-bottom: 1px solid var(--gray-300);

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  &.non-brightness {
    filter: brightness(0.32);
  }

  .grid-gap {
    grid-gap: 8px;
  }

  .course-icon {
    width: 88px;
    height: 88px;

    object-fit: cover;
    object-position: center;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    flex-shrink: 0;
  }

  .course-title {
    font-size: 18px;
    font-weight: 600;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .course-description {
    font-size: 16px;
    font-weight: 400;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .icon {
    width: 88px;
    height: 88px;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    flex-shrink: 0;
  }

  .text-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;

    > .mt-8px {
      margin-top: 8px;
    }

    > .title {
      width: 160px;
      height: 18px;

      border-radius: 32px;
    }

    > .description {
      width: 100%;
      height: 18px;

      border-radius: 32px;
    }
  }
`;
