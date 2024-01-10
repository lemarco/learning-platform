/** @module lexical */

export type { PasteCommandType } from "./commands";
export type {
  CommandListener,
  CommandListenerPriority,
  CommandPayloadType,
  CreateEditorArgs,
  EditableListener,
  EditorConfig,
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  MutationListener,
  NodeMutation,
  SerializedEditor,
  Spread,
} from "./editor";
export type { EditorState, SerializedEditorState } from "./editorState";
export type {
  DOMChildConversion,
  DOMConversion,
  DOMConversionFn,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorNode,
  NodeKey,
  NodeMap,
  SerializedEditorNode,
} from "./nodes/editor";
export type {
  BaseSelection,
  ElementPointType as ElementPoint,
  GridMapType,
  GridMapValueType,
  GridSelection,
  GridSelectionShape,
  NodeSelection,
  Point,
  RangeSelection,
  TextPointType as TextPoint,
} from "./selection";
export type {
  ElementFormatType,
  SerializedElementNode,
} from "./nodes/element";
export type { SerializedGridCellNode } from "./nodes/gridCell";
export type { SerializedRootNode } from "./nodes/root";
export type {
  SerializedTextNode,
  TextFormatType,
  TextModeType,
} from "./nodes/text";

// TODO Move this somewhere else and/or recheck if we still need this
export * from "./commands";
export {
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  createEditor,
} from "./editor";
export type { EventHandler } from "./events";
export { $normalizeSelection as $normalizeSelection__EXPERIMENTAL } from "./normalization";
export {
  $createNodeSelection,
  $createRangeSelection,
  $getPreviousSelection,
  $getSelectionCore as $getSelection,
  $getTextContent,
  $insertNodes,
  $isBlockElementNode,
  $isNodeSelection,
  $isRangeSelection,
  DEPRECATED_$computeGridMap,
  DEPRECATED_$createGridSelection,
  DEPRECATED_$getNodeTriplet,
  DEPRECATED_$isGridSelection,
} from "./selection";
export { $parseSerializedNode } from "./updates";
export {
  $addUpdateTag,
  $applyNodeReplacement,
  $copyNode,
  $getAdjacentNode,
  $getNearestNodeFromDOMNode,
  $getNearestRootOrShadowRoot,
  $getNodeByKey,
  $getRoot,
  $hasAncestor,
  $hasUpdateTag,
  $isInlineElementOrDecoratorNode,
  $isLeafNode,
  $isRootOrShadowRoot,
  $nodesOfType,
  $selectAllUtil,
  $setCompositionKey,
  $setSelection,
  $splitNode,
  getNearestEditorFromDOMNode,
  isSelectionCapturedInDecoratorInput,
  isSelectionWithinEditor,
  dispatchCommand,
} from "./utils";
export { $isDecoratorNode, DecoratorNode } from "./nodes/decorator";
export { $isElementNode, ElementNode } from "./nodes/element";
export {
  DEPRECATED_$isGridCellNode,
  DEPRECATED_GridCellNode,
} from "./nodes/gridCell";
export {
  DEPRECATED_$isGridNode,
  DEPRECATED_GridNode,
} from "./nodes/grid";
export {
  DEPRECATED_$isGridRowNode,
  DEPRECATED_GridRowNode,
} from "./nodes/gridRow";
export type { SerializedLineBreakNode } from "./nodes/lineBreak";
export {
  $createLineBreakNode,
  $isLineBreakNode,
  LineBreakNode,
} from "./nodes/lineBreak";
export type { SerializedParagraphNode } from "./nodes/paragraph";
export {
  $createParagraphNode,
  $isParagraphNode,
  ParagraphNode,
} from "./nodes/paragraph";
export { $isRootNode, RootNode } from "./nodes/root";
export type { SerializedTabNode } from "./nodes/tab";
export { $createTabNode, $isTabNode, TabNode } from "./nodes/tab";
export {
  $createTextNode,
  $isTextNode,
  TextNode,
} from "./nodes/text";
