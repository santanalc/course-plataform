import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CoursesArrayAtom,
  SearchContentAtom,
} from "../../../../../atoms/ContentAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  CourseType,
  GetCoursesByVirtualAppIdDocument,
  GetCoursesByVirtualAppIdQuery,
  GetCoursesByVirtualAppIdQueryVariables,
} from "../../../../../generated/graphql";
import useDebounce from "../../../../../hooks/useDebounce";
import StyledShimmer from "../../../../global/StyledShimmer";
import DefaultCard from "../DefaultCard/DefaultCard";
import EmptyContentList from "../EmptyContentList/EmptyContentList";
import * as SC from "./CoursesListStyledComponents";

export const GET_COURSES_BY_VIRTUAL_APP_ID = gql`
  query getCoursesByVirtualAppId($virtualAppId: String!) {
    getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
      id
      userId
      tagId
      virtualAppId
      name
      description
      active
      commentType
      createdAt
      defaultImage
      courseImage
      thumbnail
      lessonCount
      courseVideosCount
    }
  }
`;

export default function CoursesList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [courses, setCourses] = useRecoilState(CoursesArrayAtom);
  const search = useRecoilValue(SearchContentAtom);
  const client = useApolloClient();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    (async () => {
      if (!virtualApp) return;

      let response = await client.query<
        GetCoursesByVirtualAppIdQuery,
        GetCoursesByVirtualAppIdQueryVariables
      >({
        query: GetCoursesByVirtualAppIdDocument,
        variables: { virtualAppId: virtualApp?.id },
      });

      if (response.data.getCoursesByVirtualAppId) {
        setCourses(response.data.getCoursesByVirtualAppId as CourseType[]);
      }

      setIsLoading(false);
    })();
  }, [virtualApp]);

  let filteredCourses = courses?.filter((course) =>
    course.name
      .toLowerCase()
      .trim()
      .includes((debouncedSearch as string).toLowerCase()
      .trim() )
  );

  if (isLoading) {
    return (
      <SC.ListWrapper>
        {new Array(6).fill("").map((item, index) => (
          <SC.ShimmerContainer key={index}>
            <SC.ShimmerImageWrapper>
              <StyledShimmer className="image" />
            </SC.ShimmerImageWrapper>
            <SC.ShimmerTextWrapper>
              <StyledShimmer className="title" />
              <StyledShimmer className="description" />
            </SC.ShimmerTextWrapper>
          </SC.ShimmerContainer>
        ))}
      </SC.ListWrapper>
    );
  }

  if (courses?.length === 0) {
    return (
      <EmptyContentList
        title="Empty course list"
        description="Your course list is empty. Would you like to create a new course?"
        buttonLabel="Create new course"
        buttonOnClick={() => router.push("/content/course")}
      />
    );
  }

  return (
    <SC.Container>
      {filteredCourses?.length! >= 1 ? (
        <SC.ListWrapper>
          {filteredCourses?.map((course) => (
            <DefaultCard
              onClick={() => router.push(`/content/course?id=${course.id}`)}
              key={course.name!}
              title={course.name!}
              description={course.description || ""}
              src={course.thumbnail || ""}
              isActive={course.active}
            />
          ))}
        </SC.ListWrapper>
      ) : (
        <EmptyContentList
          title="No courses to show"
          description="Sorry, we couldn’t find courses that match your search.<br/>Please try again or create a new course instead."
          buttonLabel="Create new course"
          buttonOnClick={() => router.push("/content/course")}
        />
      )}
    </SC.Container>
  );
}
