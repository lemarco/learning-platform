import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "./LexicalHorizontalRuleNode";
import { $insertNodeToNearestRoot } from "@frontend/lexical-editor";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from "@frontend/lexical-editor";
import { useEffect } from "react";

export function HorizontalRulePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      (type) => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return false;
        }

        const focusNode = selection.focus.getNode();

        if (focusNode !== null) {
          const horizontalRuleNode = $createHorizontalRuleNode();
          $insertNodeToNearestRoot(horizontalRuleNode);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
