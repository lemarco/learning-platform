/** @module @lexical/selection */

export {
  $addNodeStyle,
  $cloneWithProperties,
  $isAtNodeEnd,
  $patchStyleText,
  $sliceSelectedTextNodeContent,
  trimTextContentFromAnchor,
} from "./lexical-node";
export {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $moveCaretSelection,
  $moveCharacter,
  $selectAll,
  $setBlocksType,
  $shouldOverrideDefaultCharacterSelection,
  $wrapNodes,
} from "./range-selection";
export {
  createDOMRange,
  createRectsFromDOMRange,
  getStyleObjectFromCSS,
} from "./utils";
