/** @jsxImportSource react */

import LexAutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
const { AutoFocusPlugin } = LexAutoFocusPlugin;
// import LexCharacterLimitPlugin from "@lexical/react/LexicalCharacterLimitPlugin";
// const { CharacterLimitPlugin } = LexCharacterLimitPlugin;
import LexCheckListPlugin from "@lexical/react/LexicalCheckListPlugin";
const { CheckListPlugin } = LexCheckListPlugin;
import LexClearEditorPlugin from "@lexical/react/LexicalClearEditorPlugin";
const { ClearEditorPlugin } = LexClearEditorPlugin;
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import LexHashtagPlugin from "@lexical/react/LexicalHashtagPlugin";
const { HashtagPlugin } = LexHashtagPlugin;
import LexHistoryPlugin from "@lexical/react/LexicalHistoryPlugin";
const { HistoryPlugin } = LexHistoryPlugin;
import LexHorizontalRulePlugin from "@lexical/react/LexicalHorizontalRulePlugin";
const { HorizontalRulePlugin } = LexHorizontalRulePlugin;
import LexListPlugin from "@lexical/react/LexicalListPlugin";
const { ListPlugin } = LexListPlugin;

import LexRichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
const { RichTextPlugin } = LexRichTextPlugin;
import LexTabIndentationPlugin from "@lexical/react/LexicalTabIndentationPlugin";
const { TabIndentationPlugin } = LexTabIndentationPlugin;
import LexTablePlugin from "@lexical/react/LexicalTablePlugin";
const { TablePlugin } = LexTablePlugin;
import useLexicalEditable from "@lexical/react/useLexicalEditable";

import { useEffect, useState } from "react";
import { CAN_USE_DOM } from "./shared/canUseDOM";

import { useSettings } from "./context/SettingsContext";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import ActionsPlugin from "./plugins/ActionsPlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
// import AutocompletePlugin from "./plugins/AutocompletePlugin";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import CommentPlugin from "./plugins/CommentPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
// import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import EquationsPlugin from "./plugins/EquationsPlugin";

import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";

import LinkPlugin from "./plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
// import MentionsPlugin from "./plugins/MentionsPlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import PollPlugin from "./plugins/PollPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";

import ToolbarPlugin from "./plugins/ToolbarPlugin";

import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import ContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

export default function Editor(): JSX.Element {

    // const { historyState } = useSharedHistoryContext();
    // const {
    //   settings: {
    //     // isAutocomplete,
    //     isMaxLength,
    //     // isCharLimit,
    //     // isCharLimitUtf8,
    //     isRichText,
    //     showTreeView,

    //     tableCellMerge,
    //     tableCellBackgroundColor,
    //   },
    // } = useSettings();
    // const isEditable = useLexicalEditable();
    const text = "Enter some plain text...";
    const placeholder = <Placeholder>{text}</Placeholder>;
    // const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
    // const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
    // const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

    // const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    //   if (_floatingAnchorElem !== null) {
    //     setFloatingAnchorElem(_floatingAnchorElem);
    //   }
    // };

    // useEffect(() => {
    //   const updateViewPortWidth = () => {
    //     const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

    //     if (isNextSmallWidthViewport !== isSmallWidthViewport) {
    //       setIsSmallWidthViewport(isNextSmallWidthViewport);
    //     }
    //   };
    //   updateViewPortWidth();
    //   window.addEventListener("resize", updateViewPortWidth);

    //   return () => {
    //     window.removeEventListener("resize", updateViewPortWidth);
    //   };
    // }, [isSmallWidthViewport]);
    // let style = 'mt-2'
    // useEffect(()=>{
    //   style='mt-4'
    // },[])

    return (
      <>
        {/* {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />} */}
        <div className={`editor-container  `}>
          {/* {isMaxLength && <MaxLengthPlugin maxLength={30} />} */}
                    {/* <MentionsPlugin /> */}
           {/* <DragDropPaste />

                  <SpeechToTextPlugin />



          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <ComponentPickerPlugin />
          <EmojiPickerPlugin />
          <AutoEmbedPlugin />


          <EmojisPlugin />
          <HashtagPlugin />
          <KeywordsPlugin />
   
          <AutoLinkPlugin />
          <CommentPlugin /> 
        <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
    <ListMaxIndentLevelPlugin maxDepth={7} />
    <LinkPlugin />
          <PollPlugin />
          <TwitterPlugin />
          <YouTubePlugin />
          <TabFocusPlugin />
          <TabIndentationPlugin />
          <CollapsiblePlugin />
          <PageBreakPlugin />  
          <HorizontalRulePlugin />
          <EquationsPlugin /> */}
          {/* <HistoryPlugin externalHistoryState={historyState} /> */}

          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" >
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />

          {/* <TableCellResizer /> */}
          {/* <ImagesPlugin /> */}
             {/*      <InlineImagePlugin />
      

          {!isEditable && <LexicalClickableLinkPlugin />}
     

   */}
    {/* <TablePlugin hasCellMerge={tableCellMerge} hasCellBackgroundColor={tableCellBackgroundColor} /> */}
          {/* {floatingAnchorElem && !isSmallWidthViewport && (
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
          )} */}

          {/* {(isCharLimit || isCharLimitUtf8) && <CharacterLimitPlugin charset={isCharLimit ? "UTF-16" : "UTF-8"} maxLength={5} />} */}
          {/* {isAutocomplete && <AutocompletePlugin />} */}
          {/* <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />} */}
          {/* <ActionsPlugin isRichText={isRichText} /> */}
        </div>
        {/* {showTreeView && <TreeViewPlugin />} */}
      </>
    );
}
// return <div id="NOT-AN-EDITOR"/>

