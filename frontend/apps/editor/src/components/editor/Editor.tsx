/** @jsxImportSource react */

import {
  AutoFocusPlugin,
  CharacterLimitPlugin,
  CheckListPlugin,
  ClearEditorPlugin,
  // CollaborationPlugin,
  HashtagPlugin,
  HistoryPlugin,
  HorizontalRulePlugin,
  LexicalClickableLinkPlugin,
  LexicalErrorBoundary,
  ListPlugin,
  PlainTextPlugin,
  RichTextPlugin,
  TabIndentationPlugin,
  TablePlugin,
  useLexicalEditable,
} from "./lib/lexical-react";

import * as React from "react";
import { useEffect, useState } from "react";
import { CAN_USE_DOM } from "./utils/can-use-dom";

import { useSettings } from "./context/SettingsContext";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import ActionsPlugin from "./plugins/ActionsPlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import CommentPlugin from "./plugins/CommentPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import ContextMenuPlugin from "./plugins/ContextMenuPlugin";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";

import EquationsPlugin from "./plugins/EquationsPlugin";

import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";

import KeywordsPlugin from "./plugins/KeywordsPlugin";

import LinkPlugin from "./plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";

import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import ContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

// const skipCollaborationInit =
//   // @ts-expect-error
//   window.parent != null && window.parent.frames.right === window;

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings();
  const isEditable = useLexicalEditable();
  const text = isCollab ? "Enter some collaborative rich text..." : isRichText ? "Enter some rich text..." : "Enter some plain text...";
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
      <div className={`editor-container ${showTreeView ? "tree-view" : ""} ${!isRichText ? "plain-text" : ""}`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />

        <AutoEmbedPlugin />

        <MentionsPlugin />

        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        {/* <CommentPlugin providerFactory={isCollab ? createWebsocketProvider : undefined} /> */}
        <CommentPlugin providerFactory={undefined} />

        <>
          {/* {isCollab ? (
              <CollaborationPlugin id="main" providerFactory={createWebsocketProvider} shouldBootstrap={!skipCollaborationInit} />
            ) : ( */}
          <HistoryPlugin externalHistoryState={historyState} />
          {/* )} */}
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin hasCellMerge={tableCellMerge} hasCellBackgroundColor={tableCellBackgroundColor} />
          <TableCellResizer />
          <ImagesPlugin />

          <LinkPlugin />

          <TwitterPlugin />
          <YouTubePlugin />

          {!isEditable && <LexicalClickableLinkPlugin />}
          <HorizontalRulePlugin />
          <EquationsPlugin />

          <TabFocusPlugin />
          <TabIndentationPlugin />
          <CollapsiblePlugin />

          {floatingAnchorElem && !isSmallWidthViewport && (
            <>
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              <FloatingLinkEditorPlugin
                anchorElem={floatingAnchorElem}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
              />
              <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
              <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
            </>
          )}
        </>
        {(isCharLimit || isCharLimitUtf8) && <CharacterLimitPlugin charset={isCharLimit ? "UTF-16" : "UTF-8"} maxLength={5} />}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        <ActionsPlugin isRichText={isRichText} />
      </div>
    </>
  );
}
