import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ArticlesArrayAtom,
  SearchContentAtom
} from "../../../../../atoms/ContentAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  ArticleType,
  GetArticlesByVirtualAppIdDocument,
  GetArticlesByVirtualAppIdQuery,
  GetArticlesByVirtualAppIdQueryVariables
} from "../../../../../generated/graphql";
import useDebounce from "../../../../../hooks/useDebounce";
import StyledShimmer from "../../../../global/StyledShimmer";
import DefaultCard from "../DefaultCard/DefaultCard";
import EmptyContentList from "../EmptyContentList/EmptyContentList";
import * as SC from "./ArticlesListStyledComponents";

const GET_ARTICLES_BY_VIRTUAL_APP_ID = gql`
  query getArticlesByVirtualAppId($virtualAppId: String!) {
    getArticlesByVirtualAppId(virtualAppId: $virtualAppId) {
      id
      name
      description
      thumbnail
      active
    }
  }
`;

export default function ArticlesList() {
  const router = useRouter();
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const search = useRecoilValue(SearchContentAtom);
  const [articles, setArticles] = useRecoilState(ArticlesArrayAtom);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    (async () => {
      if (!virtualApp) return;

      let response = await client.query<
        GetArticlesByVirtualAppIdQuery,
        GetArticlesByVirtualAppIdQueryVariables
      >({
        query: GetArticlesByVirtualAppIdDocument,
        variables: { virtualAppId: virtualApp?.id },
      });

      if (response.data.getArticlesByVirtualAppId) {
        setArticles(response.data.getArticlesByVirtualAppId as ArticleType[]);
      }

      setIsLoading(false);
    })();
  }, [virtualApp]);

  let filteredArticles = articles?.filter((article) =>
    article.name
      .toLowerCase()
      .trim()
      .includes((debouncedSearch as string).toLowerCase().trim())
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

  if (articles?.length === 0) {
    return (
      <EmptyContentList
        title="Empty article list"
        description="Your article list is empty. Would you like to create a new article?"
        buttonLabel="Create article"
        buttonOnClick={() => router.push("/content/article")}
      />
    );
  }

  return (
    <SC.Container>
      {filteredArticles?.length! >= 1 ? (
        <SC.ListWrapper>
          {filteredArticles?.map((article) => (
            <DefaultCard
              key={article.id}
              title={article.name || ""}
              description={article.description || ""}
              src={article.thumbnail || ""}
              onClick={() => router.push(`/content/article?id=${article.id}`)}
              isActive={article.active}
            />
          ))}
        </SC.ListWrapper>
      ) : (
        <EmptyContentList
          title="No articles to show"
          description="Sorry, we couldn’t find articles that match your search.<br/>Please try again or create a new article instead."
          buttonLabel="Create new article"
          buttonOnClick={() => router.push("/content/article")}
        />
      )}
    </SC.Container>
  );
}
