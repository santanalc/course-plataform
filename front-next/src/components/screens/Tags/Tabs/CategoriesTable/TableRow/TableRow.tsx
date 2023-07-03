import React from "react";
import dayjs from "dayjs";
import { FaEllipsisH, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDialog } from "../../../../../global/StyledDialog/StyledDialogHooks";
import * as SC from "./TableRowStyledComponents";
import StyledPopover from "../../../../../global/StyledPopover";
import { useToast } from "@chakra-ui/react";

export default function TableRow() {
  const toast = useToast();
  const dialog = useDialog();

  async function handleDelete(id: string) {
    dialog.confirm({
      title: `Delete Category`,
      hasImage: true,
      img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
      description: `Are you sure you want to delete the category <b>"{CATEGORY_NAME}"</b>?`,
      okButtonLabel: "Delete",
      onOkPressed: async () => {
        toast({
          title: `Delete category function is missing`,
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

  const POPOVER_BUTTONS_CATEGORIES = [
    {
      icon: <FaPencilAlt />,
      theme: "orange",
      popoverButtonLabel: "Edit category",
      onClick: () => {},
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Delete category",
      onClick: () => handleDelete("CATEGORY_ID"),
    },
  ];

  return (
    <SC.TR>
      <span className="first-column">User</span>

      <p className="second-column">Category Name</p>

      <p className="third-column">120</p>

      <p className="fourth-column">
        {dayjs().format("MMM D, YYYY [@] h:mm a")}
      </p>

      <StyledPopover
        hasIcon
        popoverPlacement="end-start"
        popoverTrigger={
          <span className="fifth-column">
            <FaEllipsisH />
          </span>
        }
        popoverButtons={POPOVER_BUTTONS_CATEGORIES}
      />
    </SC.TR>
  );
}
