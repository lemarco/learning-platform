/** @module @lexical/selection */

import {
  $addNodeStyle,
  $cloneWithProperties,
  $isAtNodeEnd,
  $patchStyleText,
  $sliceSelectedTextNodeContent,
  trimTextContentFromAnchor,
} from "./lexical-node";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $moveCaretSelection,
  $moveCharacter,
  $selectAll,
  $setBlocksType,
  $shouldOverrideDefaultCharacterSelection,
  $wrapNodes,
} from "./range-selection";
import { createDOMRange, createRectsFromDOMRange, getStyleObjectFromCSS } from "./utils";

export { $addNodeStyle, $cloneWithProperties, $isAtNodeEnd, $patchStyleText, $sliceSelectedTextNodeContent, trimTextContentFromAnchor };

export {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $moveCaretSelection,
  $moveCharacter,
  $selectAll,
  $setBlocksType,
  $shouldOverrideDefaultCharacterSelection,
  $wrapNodes,
};

export { createDOMRange, createRectsFromDOMRange, getStyleObjectFromCSS };
