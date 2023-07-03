/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import * as SC from "./AppCardStyledComponents";

type AppCardProps = {
  name: string;
  img: string;
  background: string;
  onClick: (e: any) => void;
};

export default function AppCard({
  name,
  img,
  background,
  onClick,
}: AppCardProps) {

  return (
    <SC.Container onClick={onClick}>
      {img.includes("api.adorable.io") ? (
        <div
          css={css`
            background-color: ${background};
          `}
        >{name.charAt(0).toLocaleUpperCase()}</div>
      ) : (
        <img src={img} alt={name} />
      )}

      <h5 className="card-name">{name}</h5>
    </SC.Container>
  );
}
