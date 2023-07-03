import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 160px;
  min-width: 160px;
  max-height: 208px;
  min-height: 208px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;
  cursor: pointer;

  > img {
    max-width: 160px;
    min-width: 160px;
    max-height: 160px;
    min-height: 160px;

    object-fit: cover;
    object-position: center;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
  }

  > div {
    max-width: 160px;
    min-width: 160px;
    max-height: 160px;
    min-height: 160px;

    object-fit: cover;
    object-position: center;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #000;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
  }

  > .card-name {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    color: white;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
