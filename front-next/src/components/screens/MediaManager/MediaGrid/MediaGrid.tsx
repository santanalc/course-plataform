import React from "react";
import MediaGridCard from "./MediaGridCard/MediaGridCard";
import * as SC from "./MediaGridStyledComponents";
import { MediaCardsArray } from "../../../data/MediaCardsArray";

export default function MediaGrid() {
  return (
    <SC.Container>
      {MediaCardsArray.map((c) => (
        <MediaGridCard
          key={c.name}
          name={c.name}
          src={c.src}
          type={c.type}
          kind={c.kind}
          createdAt={c.createdAt}
        />
      ))}
    </SC.Container>
  );
}
