import * as SC from "./TableHeadStyledComponents";

export default function TableHead() {
  return (
    <SC.THead>
      <span className="title">
        <p className="table-head-title">File Name</p>
      </span>

      <span className="title">
        <p className="table-head-title">Course</p>
      </span>

      <span className="title">
        <p className="table-head-title">Lesson</p>
      </span>

      <span className="title">
        <p className="table-head-title">Status</p>
      </span>

      <span className="title">
        <p className="table-head-title">Date Uploaded</p>
      </span>

      <span className="title">
        <p className="table-head-title">Type</p>
      </span>
    </SC.THead>
  );
}
