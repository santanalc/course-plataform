import React, { useState } from "react";
import MediaListCard from "./MediaListCard/MediaListCard";
import StyledCheckbox from "../../../global/StyledCheckbox";
import * as SC from "./MediaListStyledComponents";
import { FaSort } from "react-icons/fa";
import { MediaCardsArray } from "../../../data/MediaCardsArray";

export default function MediaList() {
  const [value, setValue] = useState(false);

  return (
    <SC.Container>
      <SC.Table>
        <SC.TableHead>
          <span className="title">
            <StyledCheckbox value={value} onClick={() => setValue(!value)} />
            <p className="table-head-title">Name</p>
            <FaSort />
          </span>

          <span className="title">
            <p className="table-head-title">Date Created</p>
            <FaSort />
          </span>

          <span className="title">
            <p className="table-head-title">Kind</p>
            <FaSort />
          </span>

          <span className="title actions">
            <p className="table-head-title">Actions</p>
          </span>
        </SC.TableHead>

        {MediaCardsArray.map((c) => (
          <MediaListCard
            key={c.name}
            name={c.name}
            src={c.src}
            type={c.type}
            kind={c.kind}
            createdAt={c.createdAt}
          />
        ))}
      </SC.Table>
    </SC.Container>
  );
}
