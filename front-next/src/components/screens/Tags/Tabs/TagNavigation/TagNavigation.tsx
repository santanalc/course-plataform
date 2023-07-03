/** @jsxImportSource @emotion/react */
import { useCallback, useState } from "react";
import { css } from "@emotion/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import StyledButton from "../../../../global/StyledButton";
import StyledInput from "../../../../global/StyledInput";
import * as SC from "./TagNavigationStyledComponents";
import { TagsTabs } from "../../../../../pages/tags";
import CreateTagModal from "../../../../modals/CreateTagModal/CreateTagModal";
import CreateCategoryModal from "../../../../modals/CreateCategoryModal/CreateCategoryModal";
import { useDisclosure } from "@chakra-ui/react";

interface Props {
  selected: TagsTabs;
  handleSelected: (vle: TagsTabs) => void;
}

export default function TagNavigation(props: Props) {
  const { selected, handleSelected } = props;
  const [search, setSearch] = useState("");

  let screens = [TagsTabs.TAGS, TagsTabs.CATEGORIES];

  const {
    isOpen: isOpenCreateCategoryModal,
    onClose: onCloseCreateCategoryModal,
    onOpen: onOpenCreateCategoryModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateTagModal,
    onClose: onCloseCreateTagModal,
    onOpen: onOpenCreateTagModal,
  } = useDisclosure();

  const returnFilterWrapper = useCallback(
    (screen: TagsTabs) => {
      switch (screen) {
        case TagsTabs.TAGS:
          return (
            <SC.FilterWrapper>
              <StyledInput
                placeholder="Search for tags"
                hasIcon
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                handleClearInput={() => setSearch("")}
              />
              <StyledButton
                onClick={onOpenCreateTagModal}
                css={css`
                  min-width: 128px;
                `}
                size="sm"
              >
                Create tag
              </StyledButton>
            </SC.FilterWrapper>
          );
        case TagsTabs.CATEGORIES:
          return (
            <SC.FilterWrapper>
              <StyledInput
                placeholder="Search for categories"
                hasIcon
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                handleClearInput={() => setSearch("")}
              />
              <StyledButton
                onClick={onOpenCreateCategoryModal}
                css={css`
                  min-width: 128px;
                `}
                size="sm"
              >
                Create category
              </StyledButton>
            </SC.FilterWrapper>
          );
        default:
          return (
            <SC.FilterWrapper>
              <StyledInput
                placeholder="Search for tags"
                hasIcon
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                handleClearInput={() => setSearch("")}
              />
              <StyledButton
                onClick={onOpenCreateTagModal}
                css={css`
                  min-width: 128px;
                `}
                size="sm"
              >
                Create tag
              </StyledButton>
            </SC.FilterWrapper>
          );
      }
    },
    [selected]
  );

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
                    background: #0075bb;
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
              handleSelected(TagsTabs.TAGS);
            }}
          >
            Tags
          </SC.NavigationButton>

          <SC.NavigationButton
            onClick={() => {
              handleSelected(TagsTabs.CATEGORIES);
            }}
          >
            Categories
          </SC.NavigationButton>
        </SC.Grid>

        {returnFilterWrapper(selected)}

        {isOpenCreateTagModal && (
          <CreateTagModal
            isOpen={isOpenCreateTagModal}
            onClose={onCloseCreateTagModal}
          />
        )}

        {isOpenCreateCategoryModal && (
          <CreateCategoryModal
            isOpen={isOpenCreateCategoryModal}
            onClose={onCloseCreateCategoryModal}
          />
        )}
      </SC.Container>
    </AnimateSharedLayout>
  );
}
