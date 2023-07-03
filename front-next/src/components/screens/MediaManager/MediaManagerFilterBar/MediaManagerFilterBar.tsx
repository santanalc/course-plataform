/** @jsxImportSource @emotion/react */
import { gql, useMutation } from "@apollo/client";
import { Tooltip } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaSlidersH } from "react-icons/fa";
import { IoGrid, IoList } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../../../atoms/UserAtom";
import StyledButton from "../../../global/StyledButton";
import StyledInput from "../../../global/StyledInput";
import * as SC from "./MediaManagerFilterBarStyledComponents";

interface MediaManagerFilterBarProps {
  isGridView: boolean;
  setIsGridView: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export const UPLOAD_IMAGE_FILE_FIRESTORE = gql`
  mutation UploadImageFileToFirestore(
    $userId: String!
    $folderId: String!
    $folder: String!
    $file: Upload!
    $imageType: ImageFileType!
  ) {
    uploadImageFileToFirestore(
      userId: $userId
      folderId: $folderId
      folder: $folder
      file: $file
      imageType: $imageType
    ) {
      filename
      mimetype
      encoding
      downloadLink
    }
  }
`;

export const UPLOAD_FILE_FIRESTORE = gql`
  mutation UploadFileToFirestore(
    $userId: String!
    $folderId: String!
    $folder: String!
    $file: Upload!
  ) {
    uploadFileToFirestore(
      userId: $userId
      folderId: $folderId
      folder: $folder
      file: $file
    ) {
      filename
      mimetype
      encoding
      downloadLink
    }
  }
`;

export default function MediaManagerFilterBar({
  isGridView,
  setIsGridView,
  isFilterOpen,
  setIsFilterOpen,
}: MediaManagerFilterBarProps) {
  const [fileUploadImage] = useMutation(UPLOAD_IMAGE_FILE_FIRESTORE, {
    onCompleted: (data) => console.log(data),
  });

  const user = useRecoilValue(UserAtom);

  function openFilterHandle() {
    setIsFilterOpen(true);
  }

  function closeAndClearFilterHandle() {
    setIsFilterOpen(false);
  }

  return (
    <SC.Container>
      <span className="search-label">Showing 25 of 251 files</span>

      <SC.FilterWrapper>
        <Tooltip
          hasArrow
          placement="top"
          label={isGridView ? "Grid view" : "List view"}
        >
          <SC.IconButton onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <IoGrid /> : <IoList />}
          </SC.IconButton>
        </Tooltip>

        <StyledInput placeholder="Search" hasIcon />

        <Tooltip
          hasArrow
          placement="top"
          label={isFilterOpen ? "Close filter" : "Open filter"}
        >
          <SC.StyledButtonFilter
            onClick={
              isFilterOpen ? closeAndClearFilterHandle : openFilterHandle
            }
          >
            {!isFilterOpen && <FaSlidersH />}
            {false && <div className="circle">5</div>}
            <p>Filter</p>
            {isFilterOpen && <MdClose />}
          </SC.StyledButtonFilter>
        </Tooltip>

        <StyledButton size="sm">New</StyledButton>

        {/* <input type="file" onChange={handleFileChange} /> */}
      </SC.FilterWrapper>
    </SC.Container>
  );
}
