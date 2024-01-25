/** @jsxImportSource react */

import type { RangeSelection } from "lexical";

import LexList from "@lexical/list";
const { $getListDepth, $isListItemNode, $isListNode } = LexList;
import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;
import Lex from "lexical";
const { $getSelection, $isElementNode, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, ElementNode, INDENT_CONTENT_COMMAND } = Lex;
import { useEffect } from "react";

type Props = Readonly<{
  maxDepth: number | null | undefined;
}>;

function getElementNodesInSelection(selection: RangeSelection): Set<ElementNode> {
  const nodesInSelection = selection.getNodes();

  if (nodesInSelection.length === 0) {
    return new Set([selection.anchor.getNode().getParentOrThrow(), selection.focus.getNode().getParentOrThrow()]);
  }

  return new Set(nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())));
}

function isIndentPermitted(maxDepth: number): boolean {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return false;
  }

  const elementNodesInSelection: Set<ElementNode> = getElementNodesInSelection(selection);

  let totalDepth = 0;

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();

      if (!$isListNode(parent)) {
        throw new Error("ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.");
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }

  return totalDepth <= maxDepth;
}

export default function ListMaxIndentLevelPlugin({ maxDepth }: Props): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(INDENT_CONTENT_COMMAND, () => !isIndentPermitted(maxDepth ?? 7), COMMAND_PRIORITY_CRITICAL);
  }, [editor, maxDepth]);
  return null;
}