import React, { Fragment, useCallback, useState } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import StyledIconButton from "../../components/global/StyledIconButton";
import TopBar from "../../components/global/TopBar";
import CategoriesTable from "../../components/screens/Tags/Tabs/CategoriesTable/CategoriesTable";
import TagNavigation from "../../components/screens/Tags/Tabs/TagNavigation/TagNavigation";
import TagsTable from "../../components/screens/Tags/Tabs/TagsTable/TagsTable";
import * as SC from "./styled";

export enum TagsTabs {
  TAGS = "TAGS",
  CATEGORIES = "CATEGORIES",
}

export default function Tags() {
  const [selected, setSelected] = useState(TagsTabs.TAGS);

  function handleSelected(vle: TagsTabs) {
    setSelected(vle);
  }

  const returnBody = useCallback(
    (screen: TagsTabs) => {
      switch (screen) {
        case TagsTabs.TAGS:
          return <TagsTable />;
        case TagsTabs.CATEGORIES:
          return <CategoriesTable />;
        default:
          return <TagsTable />;
      }
    },
    [selected]
  );

  return (
    <Fragment>
      <SeoHead pageName="Tags" />
      <SC.Container>
        <TopBar
          title="Manage Tags"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Manage tags video"
            />
          }
        />
        <TagNavigation selected={selected} handleSelected={handleSelected} />
        <SC.Wrapper>{returnBody(selected)}</SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
