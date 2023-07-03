/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import Link from "next/link";
import StyledButton from "../../../../global/StyledButton";
import StyledInput from "../../../../global/StyledInput";
import * as SC from "./ContentNavigationStyledComponents";
import { ContentTabs } from "../../../../../pages/content";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ArticlesArrayAtom,
  CoursesArrayAtom,
  SearchContentAtom,
} from "../../../../../atoms/ContentAtom";
import { Tooltip } from "@chakra-ui/react";
import { FaSlidersH } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Props {
  selected: ContentTabs;
  handleSelected: (vle: ContentTabs) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ContentNavigation(props: Props) {
  const { selected, handleSelected, isFilterOpen, setIsFilterOpen } = props;
  const courses = useRecoilValue(CoursesArrayAtom);
  const articles = useRecoilValue(ArticlesArrayAtom);
  const [search, setSearch] = useRecoilState(SearchContentAtom);

  let screens = [ContentTabs.COURSES, ContentTabs.ARTICLES];

  function openFilterHandle() {
    setIsFilterOpen(true);
  }

  function closeAndClearFilterHandle() {
    setIsFilterOpen(false);
  }

  return (
    <AnimateSharedLayout>
      <SC.Container>
        <SC.Grid>
          {screens.map((screen) => (
            <motion.div
              key={screen}
              css={css`
                margin: 0;
                position: relative;
                cursor: pointer;
              `}
              animate
              onClick={() => handleSelected(screen)}
            >
              {screen === selected && (
                <motion.div
                  layoutId="underline"
                  className="underline"
                  css={css`
                    width: 100%;
                    height: 3px;
                    background: var(--orange-300);
                    position: absolute;
                    top: 53px;
                    z-index: 1;
                    text-align: center;
                  `}
                />
              )}
            </motion.div>
          ))}

          <SC.NavigationButton
            onClick={() => {
              handleSelected(ContentTabs.COURSES);
            }}
          >
            Courses
          </SC.NavigationButton>

          <SC.NavigationButton
            onClick={() => {
              handleSelected(ContentTabs.ARTICLES);
            }}
          >
            Articles
          </SC.NavigationButton>
        </SC.Grid>

        {selected === ContentTabs.COURSES && courses?.length! > 0 && (
          <SC.FilterWrapper>
            <StyledInput
              placeholder="Search by course name"
              hasIcon
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              handleClearInput={() => setSearch("")}
            />
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
            <Link href="/content/course">
              <a>
                <StyledButton size="sm">New</StyledButton>
              </a>
            </Link>
          </SC.FilterWrapper>
        )}
        {selected === ContentTabs.ARTICLES && articles?.length! > 0 && (
          <SC.FilterWrapper>
            <StyledInput
              placeholder="Search by article name"
              hasIcon
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              handleClearInput={() => setSearch("")}
            />
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
            <Link href="/content/article">
              <a>
                <StyledButton size="sm">New</StyledButton>
              </a>
            </Link>
          </SC.FilterWrapper>
        )}
      </SC.Container>
    </AnimateSharedLayout>
  );
}
