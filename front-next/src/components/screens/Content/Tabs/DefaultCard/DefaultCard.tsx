import React from "react";
import * as SC from "./DefaultCardStyledComponents";

const imgVariants = {
  hover: {
    scale: 1.16,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};

type DefaultCardProps = {
  src?: string;
  title: string;
  description: string;
  onClick: () => void;
  isActive?: boolean;
};

export default function DefaultCard({
  src,
  title,
  description,
  onClick,
  isActive = true,
}: DefaultCardProps) {
  if (isActive) {
    return (
      <SC.Container whileHover="hover" onClick={onClick}>
        {src ? (
          <SC.ImageWrapper>
            <SC.Image variants={imgVariants} src={src} alt={title} />
          </SC.ImageWrapper>
        ) : (
          <SC.FakeImage />
        )}

        <SC.TextWrapper>
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
        </SC.TextWrapper>
      </SC.Container>
    );
  }

  return (
    <SC.Container whileHover="hover" onClick={onClick}>
      {src ? (
        <SC.ImageWrapper>
          <SC.Image
            className="inactive-image"
            variants={imgVariants}
            src={src}
            alt={title}
          />
          <span className="inactive-wrapper">Inactive</span>
        </SC.ImageWrapper>
      ) : (
        <SC.ImageWrapper>
          <SC.FakeImage className="inactive-image" />
          <span className="inactive-wrapper">Inactive</span>
        </SC.ImageWrapper>
      )}

      <SC.TextWrapper>
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
      </SC.TextWrapper>
    </SC.Container>
  );
}
