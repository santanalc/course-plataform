import { IVideoHistory } from "../pages/uploader-history";

type IGenerateCsv = {
  videosHistory: IVideoHistory[];
};

function getFileExtension(name: string) {
  const lastIndexOf = name.lastIndexOf(".");
  if (lastIndexOf == -1) {
    return ""; // empty extension
  }
  return name.substring(lastIndexOf);
}

export async function generateCSV(props: IGenerateCsv) {
  let contactCSV = [
    [
      "id",
      "file name",
      "course name",
      "lesson name",
      "status",
      "type",
      "date uploaded",
      ,
    ],
  ];

  props.videosHistory
    .filter((c) => c)
    .forEach((video) => {
      if (!video) return;

      contactCSV.push([
        `${video.id}`,
        `${video.fileName}`,
        `${video.courseName}`,
        `${video.lessonName}`,
        `${video.status === "Completed" ? "Ready to Publish" : video.status}`,
        `${getFileExtension(video.fileName).toLocaleUpperCase()}`,
        `${video.createdAt}`,
      ]);
    });

  let csv = contactCSV.map((l) => l.join(",")).join("\n");
  return csv;
}
