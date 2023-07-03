import React from "react";
import dayjs from "dayjs";
import { FaEllipsisH, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDialog } from "../../../../../global/StyledDialog/StyledDialogHooks";
import * as SC from "./TableRowStyledComponents";
import StyledPopover from "../../../../../global/StyledPopover";
import { useToast } from "@chakra-ui/react";

export default function TableRow() {
  const dialog = useDialog();
  const toast = useToast();

  async function handleDelete(id: string) {
    dialog.confirm({
      title: `Delete Tag`,
      hasImage: true,
      img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
      description: `Are you sure you want to delete the tag <b>"{TAG_NAME}"</b>?`,
      okButtonLabel: "Delete",
      onOkPressed: async () => {
        toast({
          title: `Delete tag function is missing`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      },
      hasCheckbox: true,
      okButtonColor: "#c41700",
    });
  }

  const POPOVER_BUTTONS_TAGS = [
    {
      icon: <FaPencilAlt />,
      theme: "orange",
      popoverButtonLabel: "Edit tag",
      onClick: () => {},
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Delete tag",
      onClick: () => handleDelete("TAG_ID"),
    },
  ];

  return (
    <SC.TR>
      <span className="first-column">User</span>

      <p className="second-column">Category Name</p>

      <p className="third-column">
        <SC.TagCard className="user-tag">
          <p>User tag</p>
        </SC.TagCard>
      </p>

      <p className="fourth-column">120</p>

      <p className="fifth-column">{dayjs().format("MMM D, YYYY [@] h:mm a")}</p>

      <StyledPopover
        hasIcon
        popoverPlacement="end-start"
        popoverTrigger={
          <span className="sixth-column">
            <FaEllipsisH />
          </span>
        }
        popoverButtons={POPOVER_BUTTONS_TAGS}
      />
    </SC.TR>
  );
}
