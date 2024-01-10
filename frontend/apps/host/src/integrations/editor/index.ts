/** @jsxImportSource react */
//react exports
export * from "./lib/react";

//core export
export * from "./lib/core";
//history export
export { createEmptyHistoryState } from "./lib/history";
export type { HistoryState } from "./lib/history";
//utils export
export {
  mergeRegister,
  $insertNodeToNearestRoot,
  mediaFileReader,
  isMimeType,
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $wrapNodeInElement,
  $getNearestNodeOfType,
} from "./lib/utils/";
// clipboard exports
export {
  $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes,
  $insertGeneratedNodes,
} from "./lib/clipboard";
// selection exports
export {
  $isAtNodeEnd,
  $setBlocksType,
  $isParentElementRTL,
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "./lib/selection";
// code exports
export {
  $createCodeNode,
  $isCodeHighlightNode,
  registerCodeHighlighting,
  CodeHighlightNode,
  CodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
  normalizeCodeLang,
} from "./lib/code";
// code rich-text
export {
  DRAG_DROP_PASTE,
  eventFiles,
  $isHeadingNode,
  $createHeadingNode,
  $isQuoteNode,
  HeadingNode,
  QuoteNode,
  $createQuoteNode,
} from "./lib/rich-text";
export type { HeadingTagType } from "./lib/rich-text";
//exports link
export {
  $isLinkNode,
  $isAutoLinkNode,
  TOGGLE_LINK_COMMAND,
  AutoLinkNode,
  LinkNode,
} from "./lib/link";
// export list
export {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  ListItemNode,
  ListNode,
  $getListDepth,
  $isListItemNode,
} from "./lib/list";

// export markdown TODO: fix
// export {
//   $convertFromMarkdownString,
//   $convertToMarkdownString,
//   CHECK_LIST,
//   ELEMENT_TRANSFORMERS,
//   TEXT_FORMAT_TRANSFORMERS,
//   TEXT_MATCH_TRANSFORMERS,
// } from "./lib/markdown";
// export type {
//   TextMatchTransformer,
//   Transformer,
//   ElementTransformer,
// } from "./lib/markdown";
// export table
export {
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getTableCellNodeFromEditorNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromEditorNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow__EXPERIMENTAL,
  $isTableCellNode,
  $isTableRowNode,
  $unmergeCell,
  getTableSelectionFromTableElement,
  TableCellHeaderStates,
  TableCellNode,
  $isTableNode,
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  TableNode,
  TableRowNode,
  getCellFromTarget,
  INSERT_TABLE_COMMAND,
} from "./lib/table";
export type {
  HTMLTableElementWithWithTableSelectionState,
  Cell,
} from "./lib/table";

//exports hashtag
export { HashtagNode } from "./lib/hashtag";

//exports overflow
export { OverflowNode } from "./lib/overflow";

//exports mark
export { MarkNode } from "./lib/mark";
//exports html
export { $generateHtmlFromNodes, $generateNodesFromDOM } from "./lib/html";
// exports file
export { exportFile, importFile } from "./lib/file";
