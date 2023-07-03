import { Tooltip } from "@chakra-ui/tooltip";
import styled from "@emotion/styled";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import {
  FaBold,
  FaCode,
  FaEraser,
  FaHeading,
  FaIndent,
  FaItalic,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaRedo,
  FaRemoveFormat,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { ArticleContentAtom } from "../../../../../../atoms/NewArticleAtom";
import useDebounce from "../../../../../../hooks/useDebounce";

const EditorContainer = styled.div`
  width: 100%;

  .ProseMirror {
    min-height: 240px;

    padding: 24px;

    border: 1px solid var(--gray-100);
    border-radius: 8px 8px 0 0;

    &:focus-visible {
      outline: none;
    }

    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: x-large !important;
      font-weight: bold !important;
      line-height: 1.1 !important;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(13, 13, 13, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  height: 40px;

  padding: 0 16px;

  border-radius: 0 0 8px 8px;

  background: #f9f9f9;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
  flex-wrap: wrap;

  > button {
    width: 32px;
    height: 32px;

    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    > svg {
      width: 100%;
      height: 100%;
      color: #6b6b6b;
    }

    &.is-active {
      svg {
        color: var(--orange-300);
      }
    }
  }

  > .vertical-line {
    width: 1px;
    height: 24px;

    opacity: 0.5;

    background: #979797;
  }
`;

function MenuBar({ editor }: any) {
  if (!editor) {
    return null;
  }

  return (
    <ButtonsWrapper>
      <Tooltip hasArrow placement="top" label="Heading">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <FaHeading />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Bold">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Italic">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Underline">
        <button
          onClick={() => editor.commands.toggleUnderline()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Strike">
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
      </Tooltip>

      <div className="vertical-line" />

      <Tooltip hasArrow placement="top" label="Bullet list">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Ordered list">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Hard break">
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <FaParagraph />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Code block">
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <FaCode />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Indent">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaIndent />
        </button>
      </Tooltip>

      <div className="vertical-line" />

      <Tooltip hasArrow placement="top" label="Clear nodes">
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <FaEraser />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Clear format">
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <FaRemoveFormat />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Undo">
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
      </Tooltip>

      <Tooltip hasArrow placement="top" label="Redo">
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </Tooltip>
    </ButtonsWrapper>
  );
}

export default function ArticleContentTiptap() {
  const [articleContect, setArticleContent] =
    useRecoilState(ArticleContentAtom);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: articleContect,
  });

  const contentText = useDebounce(editor?.getHTML() || "", 300);

  useEffect(() => {
    setArticleContent(contentText as string);
  }, [contentText]);

  return (
    <EditorContainer>
      <EditorContent editor={editor} />
      <MenuBar editor={editor} />
    </EditorContainer>
  );
}
