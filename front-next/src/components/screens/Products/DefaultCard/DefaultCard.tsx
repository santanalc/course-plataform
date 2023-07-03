/** @jsxImportSource @emotion/react */
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
  price: string;
  status: string;
};

export default function DefaultCard({
  src,
  title,
  description,
  price,
  status,
}: DefaultCardProps) {
  return (
    <SC.Container whileHover="hover">
      <div className={`circle-status ${status}`} />

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
        <SC.PriceWrapper>
          <p className="label">Price:</p>
          <p className="value">{price}</p>
        </SC.PriceWrapper>
      </SC.TextWrapper>
    </SC.Container>
  );
}
