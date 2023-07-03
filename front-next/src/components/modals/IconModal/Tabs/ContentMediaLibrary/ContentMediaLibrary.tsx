import { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StyledPopoverFilterCheckbox from "../../../../global/StyledPopoverFilter/StyledPopoverFilterCheckbox";
import StyledInput from "../../../../global/StyledInput";
import { IoGrid, IoList } from "react-icons/io5";
import GridModal from "./GridModal/GridModal";
import ListModal from "./ListModal/ListModal";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 24px 0 0 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;

  > .title {
    font-size: 20px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

const SearchWrapper = styled.div`
  width: 100%;

  padding-right: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 16px;
  }
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid;
  border-color: var(--gray-300);
  border-radius: 50%;

  transition: filter 0.2s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-600);
  }

  &:hover {
    filter: brightness(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ContentMediaLibrary() {
  const [filterViewVideos, setFilterViewVideos] = useState(false);
  const [filterViewImages, setFilterViewImages] = useState(false);
  const [filterViewLayeredIcons, setFilterViewLayeredIcons] = useState(false);

  const [isGridView, setIsGridView] = useState(true);

  const POPOVER_BUTTONS_VIEW = [
    {
      value: filterViewVideos,
      setValue: setFilterViewVideos,
      buttonLabel: "Videos",
    },
    {
      value: filterViewImages,
      setValue: setFilterViewImages,
      buttonLabel: "Images",
    },
    {
      value: filterViewLayeredIcons,
      setValue: setFilterViewLayeredIcons,
      buttonLabel: "Layered Icons",
    },
  ];

  return (
    <Container>
      <h1 className="title">Media Library</h1>

      <SearchWrapper>
        <span>
          <StyledPopoverFilterCheckbox
            title="view"
            buttons={POPOVER_BUTTONS_VIEW}
            placeholder="Showing all"
          />

          <StyledInput placeholder="Search" hasIcon />
        </span>

        <Tooltip
          hasArrow
          placement="top"
          label={isGridView ? "Grid view" : "List view"}
        >
          <IconButton onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <IoGrid /> : <IoList />}
          </IconButton>
        </Tooltip>
      </SearchWrapper>

      {isGridView ? <GridModal /> : <ListModal />}
    </Container>
  );
}
