import styled from "@emotion/styled";

export const ArticleImage = styled.img`
  width: 100%;
  height: 344px;

  object-fit: cover;
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 344px;

  background: #404040;

  flex-shrink: 0;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  .banner-text {
    font-size: 24px;
    font-weight: 600;
    color: #707070;

    position: absolute;
  }
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 32px;

  background: white;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 12px;

  .full-text {
    width: 100%;
    height: 18px;

    border-radius: 32px;
  }

  .half-text {
    width: 40%;
    height: 18px;

    border-radius: 32px;
  }

  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: x-large !important;
      font-weight: bold !important;
      line-height: 1.1 !important;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(13, 13, 13, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }
  }
`;
