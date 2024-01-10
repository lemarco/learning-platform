/** @jsxImportSource react */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import "./editor.css";
import { LexicalErrorBoundary } from "./lib";
import { useLexicalEditable } from "./lib";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { CAN_USE_DOM } from "./utils";
import { CheckListPlugin } from "./lib";
import { ListPlugin } from "./lib";
import { useSettings, useSharedHistoryContext } from "./context";
import { TabIndentationPlugin } from "./lib";
import { LexicalClickableLinkPlugin } from "./lib";
import { HorizontalRulePlugin } from "./lib";
import { HistoryPlugin } from "./lib";
import { HashtagPlugin } from "./lib";
import {
  YouTubePlugin,
  ToolbarPlugin,
  TwitterPlugin,
  TablePlugin as NewTablePlugin,
  // TableOfContentsPlugin,
  TableCellResizerPlugin,
  ComponentPickerMenuPlugin,
  TableActionMenuPlugin,
  TabFocusPlugin,
  // MarkdownPlugin,
  ListMaxIndentLevelPlugin,
  LinkPlugin,
  KeywordsPlugin,
  InlineImagePlugin,
  ImagesPlugin,
  FloatingTextFormatToolbarPlugin,
  FloatingLinkEditorPlugin,
  FigmaPlugin,
  EquationsPlugin,
  ExcalidrawPlugin,
  EmojisPlugin,
  EmojiPickerPlugin,
  DraggableBlockPlugin,
  DragDropPaste,
  // ContextMenuPlugin,
  CollapsiblePlugin,
  CodeHighlightPlugin,
  CodeActionMenuPlugin,
  ActionsPlugin,
  AutoEmbedPlugin,
  TablePlugin,
  LexicalAutoLinkPlugin,
  ContextMenuPlugin,
} from "./plugins";

import { TableCellNodes } from "./nodes";
import { ClearEditorPlugin } from "./lib";
import { AutoFocusPlugin } from "./lib";
import { RichTextPlugin } from "./lib";
import { useLexicalComposerContext } from "./lib";
import { useBeforeUnload } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { AnyAction } from "@reduxjs/toolkit";
// import { notesApi } from "../../store/api";
import { ContentEditable } from "./lib";

const SocialPlugins = () => {
  return (
    <>
      <TwitterPlugin />
      <YouTubePlugin />
      <FigmaPlugin />
    </>
  );
};
export function Editor() {
  // const dispatch = useDispatch();
  const { historyState } = useSharedHistoryContext();
  const {
    settings: { shouldUseLexicalContextMenu },
  } = useSettings();

  const [editor] = useLexicalComposerContext();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const sendState = useCallback(async () => {
    const state = editor.getEditorState();

    const stateString = state.toJSON();
    console.log("SEND STATE!", stateString);
    // await dispatch(notesApi.endpoints.sendState.initiate(stateString) as unknown as AnyAction);
    // api.endpoints.sendState.initiate(state) as unknown as AnyAction
  }, []);
  useBeforeUnload(sendState);

  const isEditable = useLexicalEditable();
  // const text = "Enter some text...";

  // const placeholder = <div> {text}</div>;
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState(false);

  const onRef = (_floatingAnchorElem: SetStateAction<null>) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: "Playground",
    nodes: [...TableCellNodes],
    onError: (error: any) => {
      throw error;
    },
    theme: {},
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

  const newTablePlugin = (
    <NewTablePlugin cellEditorConfig={cellEditorConfig}>
      <AutoFocusPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-[20px] border-0 resize-none cursor-text block relative outline-0 p-0 select-text text-[15px] whitespace-pre-wrap break-words z-3 " />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <HistoryPlugin />
      <ImagesPlugin captionsEnabled={false} />
      <LinkPlugin />
      <LexicalClickableLinkPlugin />
      <FloatingTextFormatToolbarPlugin />
    </NewTablePlugin>
  );

  return (
    <div className=" flex-[8] flex flex-col">
      <ToolbarPlugin id="toolbar" className="flex-1 flex justify-start align-center sticky min-h-[2rem] " sendState={sendState} />
      <div id="editor" className=" flex flex-col flex-10  bg-white text-black  ">
        <RichTextPlugin
          contentEditable={
            <div className="  relative pb-[76%]" ref={onRef}>
              <ContentEditable className="absolute  top-0 bottom-0 right-0 left-0 overflow-auto border-0 resize-none cursor-text  outline-0 p-8 select-text text-[15px] whitespace-pre-wrap break-words z-3 " />
            </div>
          }
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin externalHistoryState={historyState} />
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />

        <TabFocusPlugin />
        <TabIndentationPlugin />
        <ListPlugin />
        <CheckListPlugin />
        {newTablePlugin}

        <HashtagPlugin />
        <KeywordsPlugin />
        <LexicalAutoLinkPlugin />

        <ListMaxIndentLevelPlugin maxDepth={7} />

        <LinkPlugin />
        {!isEditable && <LexicalClickableLinkPlugin />}

        <CodeHighlightPlugin />
        <HorizontalRulePlugin />

        <ComponentPickerMenuPlugin />
        <ImagesPlugin />
        <InlineImagePlugin />
        <CollapsiblePlugin />
        <AutoEmbedPlugin />
        <ExcalidrawPlugin />
        <EquationsPlugin />
        {/* <EmojiPickerPlugin /> */}
        <EmojisPlugin />
        <SocialPlugins />
        {/* <MarkdownPlugin /> */}
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}

        {/* <div>{showTableOfContents && <TableOfContentsPlugin />}</div> */}
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        <ActionsPlugin />
      </div>
    </div>
  );
}
