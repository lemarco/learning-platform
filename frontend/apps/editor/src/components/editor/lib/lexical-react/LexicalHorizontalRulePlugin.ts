import { useEffect } from "react";
import { $insertNodeToNearestRoot } from "../lexical-editor";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from "../lexical-editor";
import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "./LexicalHorizontalRuleNode";

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
