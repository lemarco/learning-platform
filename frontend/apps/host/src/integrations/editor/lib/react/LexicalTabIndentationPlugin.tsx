import type {
  LexicalCommand,
  LexicalEditor,
  EditorNode,
  RangeSelection,
} from "../";

import { useLexicalComposerContext } from "../";
import { $getNearestBlockElementAncestorOrThrow } from "../";
import {
  $createRangeSelection,
  $getSelection,
  $isBlockElementNode,
  $isRangeSelection,
  $normalizeSelection__EXPERIMENTAL,
  COMMAND_PRIORITY_EDITOR,
  INDENT_CONTENT_COMMAND,
  INSERT_TAB_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "../";
import { useEffect } from "react";

// TODO Move to @lexical/utils
function $filter<T>(
  nodes: Array<EditorNode>,
  filterFn: (node: EditorNode) => null | T
): Array<T> {
  const result: T[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = filterFn(nodes[i]);
    if (node !== null) {
      result.push(node);
    }
  }
  return result;
}

function indentOverTab(selection: RangeSelection): boolean {
  // const handled = new Set();
  const nodes = selection.getNodes();
  const canIndentBlockNodes = $filter(nodes, (node) => {
    if ($isBlockElementNode(node) && node.canIndent()) {
      return node;
    }
    return null;
  });
  // 1. If selection spans across canIndent block nodes: indent
  if (canIndentBlockNodes.length > 0) {
    return true;
  }
  // 2. If first (anchor/focus) is at block start: indent
  const anchor = selection.anchor;
  const focus = selection.focus;
  const first = focus.isBefore(anchor) ? focus : anchor;
  const firstNode = first.getNode();
  const firstBlock = $getNearestBlockElementAncestorOrThrow(firstNode);
  if (firstBlock.canIndent()) {
    const firstBlockKey = firstBlock.getKey();
    let selectionAtStart = $createRangeSelection();
    selectionAtStart.anchor.set(firstBlockKey, 0, "element");
    selectionAtStart.focus.set(firstBlockKey, 0, "element");
    selectionAtStart = $normalizeSelection__EXPERIMENTAL(selectionAtStart);
    if (selectionAtStart.anchor.is(first)) {
      return true;
    }
  }
  // 3. Else: tab
  return false;
}

export function registerTabIndentation(editor: LexicalEditor) {
  return editor.registerCommand<KeyboardEvent>(
    KEY_TAB_COMMAND,
    (event) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return false;
      }

      event.preventDefault();
      const command: LexicalCommand<void> = indentOverTab(selection)
        ? event.shiftKey
          ? OUTDENT_CONTENT_COMMAND
          : INDENT_CONTENT_COMMAND
        : INSERT_TAB_COMMAND;
      return editor.dispatchCommand(command, undefined);
    },
    COMMAND_PRIORITY_EDITOR
  );
}

/**
 * This plugin adds the ability to indent content using the tab key. Generally, we don't
 * recommend using this plugin as it could negatively affect acessibility for keyboard
 * users, causing focus to become trapped within the editor.
 */
export function TabIndentationPlugin(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return registerTabIndentation(editor);
  });

  return null;
}
