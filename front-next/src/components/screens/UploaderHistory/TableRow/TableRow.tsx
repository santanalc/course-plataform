import { Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import * as SC from "./TableRowStyledComponents";

type TableRowProps = {
  log: any;
};

function getFileExtension(name: string) {
  const lastIndexOf = name.lastIndexOf(".");
  if (lastIndexOf == -1) {
    return ""; // empty extension
  }
  return name.substring(lastIndexOf);
}

export default function TableRow(props: TableRowProps) {
  const { log } = props;

  return (
    <SC.TR>
      <Tooltip hasArrow placement="top" label={log.fileName}>
        <p className="column filename">{log.fileName}</p>
      </Tooltip>

      <p className="column">{log.courseName}</p>

      <p className="column">{log.lessonName}</p>

      {(() => {
        switch (log.status) {
          case "Completed":
            return (
              <span className="status-column Confirmed">Ready to Publish</span>
            );

          case "Encoding":
            return <span className="status-column Encoding">Encoding</span>;

          case "Uploading":
            return <span className="status-column Pending">Uploading</span>;

          default:
            return (
              <span className="status-column Confirmed">Ready to Publish</span>
            );
        }
      })()}

      <p className="column">
        {dayjs(log.createdAt).format("MMM D, YYYY [@] h:mm a")}
      </p>

      <p className="column">
        {getFileExtension(log.fileName).toLocaleUpperCase()}
      </p>
    </SC.TR>
  );
}
