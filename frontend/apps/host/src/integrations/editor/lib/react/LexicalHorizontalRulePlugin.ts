import { useLexicalComposerContext } from "../";
import { $createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "../";
import { $insertNodeToNearestRoot } from "../";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from "../";
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
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
