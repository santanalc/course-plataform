import React, { Fragment, useCallback, useState } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import CoursesList from "../../components/screens/Content/Tabs/CoursesList/CoursesList";
import ArticlesList from "../../components/screens/Content/Tabs/ArticlesList/ArticlesList";
import ContentNavigation from "../../components/screens/Content/Tabs/ContentNavigation/ContentNavigation";
import { useRecoilValue } from "recoil";
import {
  ArticlesArrayAtom,
  CoursesArrayAtom,
  SearchContentAtom,
} from "../../atoms/ContentAtom";
import useDebounce from "../../hooks/useDebounce";
import ContentSidebarFilter from "../../components/screens/Content/Tabs/ContentSidebarFilter/ContentSidebarFilter";
import * as SC from "./styled";

export enum ContentTabs {
  COURSES = "COURSES",
  ARTICLES = "ARTICLES",
}

export default function Content() {
  const [selected, setSelected] = useState(ContentTabs.COURSES);
  const courses = useRecoilValue(CoursesArrayAtom);
  const articles = useRecoilValue(ArticlesArrayAtom);
  const search = useRecoilValue(SearchContentAtom);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  let filteredCourses = courses?.filter((course) =>
    course.name
      .toLowerCase()
      .trim()
      .includes((debouncedSearch as string).toLowerCase().trim())
  );

  let filteredArticles = articles?.filter((article) =>
    article.name
      .toLowerCase()
      .trim()
      .includes((debouncedSearch as string).toLowerCase().trim())
  );

  function handleSelected(vle: ContentTabs) {
    setSelected(vle);
  }

  const returnBody = useCallback(
    (screen: ContentTabs) => {
      switch (screen) {
        case ContentTabs.COURSES:
          return <CoursesList />;
        case ContentTabs.ARTICLES:
          return <ArticlesList />;
        default:
          return <CoursesList />;
      }
    },
    [selected]
  );

  const returnContentNumber = useCallback(
    (screen: ContentTabs) => {
      switch (screen) {
        case ContentTabs.COURSES:
          return filteredCourses ? `(${filteredCourses?.length})` : "";
        case ContentTabs.ARTICLES:
          return filteredArticles ? `(${filteredArticles?.length})` : "";
        default:
          return filteredCourses ? `(${filteredCourses?.length})` : "";
      }
    },
    [selected, courses, articles, debouncedSearch]
  );

  const returnTopBarTitle = useCallback(
    (screen: ContentTabs) => {
      switch (screen) {
        case ContentTabs.COURSES:
          return "Courses";
        case ContentTabs.ARTICLES:
          return "Articles";
        default:
          return "Courses";
      }
    },
    [selected]
  );

  return (
    <Fragment>
      <SeoHead pageName="Content" />
      <SC.Container>
        <TopBar
          title={returnTopBarTitle(selected)}
          description={returnContentNumber(selected)}
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Content video"
            />
          }
        />
        <ContentNavigation
          selected={selected}
          handleSelected={handleSelected}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <SC.Wrapper>{returnBody(selected)}</SC.Wrapper>
        <ContentSidebarFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </SC.Container>
    </Fragment>
  );
}
