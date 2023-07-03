import React, { useState } from "react";
import StyledPopover from "../../../../global/StyledPopover";
import StyledCheckbox from "../../../../global/StyledCheckbox";
import * as SC from "./MediaListCardStyledComponents";
import {
  FaCopy,
  FaEllipsisH,
  FaFileDownload,
  FaTrashAlt,
} from "react-icons/fa";
import dayjs from "dayjs";

const POPOVER_BUTTONS_ACTIONS = [
  {
    icon: <FaCopy />,
    theme: "orange",
    popoverButtonLabel: "Duplicate image",
    onClick: () => {},
  },
  {
    icon: <FaFileDownload />,
    theme: "orange",
    popoverButtonLabel: "Download image",
    onClick: () => {},
  },
  {
    icon: <FaTrashAlt />,
    theme: "red",
    popoverButtonLabel: "Delete image",
    onClick: () => {},
  },
];

type MediaListCardProps = {
  type: string;
  src: string;
  name: string;
  kind: string;
  createdAt: Date;
};

export default function MediaListCard({
  type,
  src,
  name,
  kind,
  createdAt,
}: MediaListCardProps) {
  const [value, setValue] = useState(false);

  return (
    <SC.TableBody>
      <SC.TableRow>
        <span className="first-column">
          <StyledCheckbox value={value} onClick={() => setValue(!value)} />
          {type !== "mp4" && type !== "pdf" && <img src={src} alt={name} />}
          <p>{name}</p>
        </span>

        <p>{dayjs(createdAt).format("MMM D, YYYY [@] h:mm a")}</p>

        <p>{kind}</p>

        <StyledPopover
          hasIcon
          popoverPlacement="end-start"
          popoverTrigger={
            <span className="last-column">
              <FaEllipsisH />
            </span>
          }
          popoverButtons={POPOVER_BUTTONS_ACTIONS}
        />
      </SC.TableRow>
    </SC.TableBody>
  );
}
