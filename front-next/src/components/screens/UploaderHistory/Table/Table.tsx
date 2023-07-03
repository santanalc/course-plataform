import dayjs from "dayjs";
import { IVideoHistory } from "../../../../pages/uploader-history";
import { generateCSV } from "../../../../utils/generateUploadHistoryCsv";
import TableHead from "../TableHead/TableHead";
import TableRow from "../TableRow/TableRow";
import * as SC from "./TableStyledComponents";

type TableProps = {
  videos: IVideoHistory[];
};

export default function Table({ videos }: TableProps) {
  return (
    <SC.Container>
      <SC.DownloadCSV
        onClick={async () => {
          let csv: string;

          csv = await generateCSV({ videosHistory: videos });

          let now = dayjs();

          let downloadLink = document.createElement("a");

          const csvDataArray = [];
          csvDataArray.push(csv);

          const url =
            (process.browser &&
              window.URL.createObjectURL(
                new Blob(csvDataArray, { type: "application/csv" })
              )) ||
            "";

          downloadLink.href = url;
          downloadLink.download = `${now.format(
            "YYYY.MM.DD_HHmm"
          )}_upload_history.csv`;

          document.body.appendChild(downloadLink);
          downloadLink.click();
          process.browser && window.URL.revokeObjectURL(url);
          document.body.removeChild(downloadLink);
        }}
      >
        Download CSV
      </SC.DownloadCSV>

      <SC.Table>
        <TableHead />

        <SC.TableBody>
          {videos
            .sort((a, b) => {
              return dayjs(b.createdAt).diff(a.createdAt);
            })
            .map((video) => (
              <TableRow log={video} key={video.id} />
            ))}
        </SC.TableBody>
      </SC.Table>
    </SC.Container>
  );
}
