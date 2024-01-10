/** @jsxImportSource react */
import type { LexicalEditor } from "../../../../";
import { $createCodeNode } from "../../../../";
import { $setBlocksType } from "../../../../";
import { $createParagraphNode, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from "../../../../";

import { Button } from "ui";
import { blockTypeToBlockName } from "../constants";

export function ModeButton({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;

  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const value = blockType !== "code" ? "Normal" : "Code";

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <Button
      className="bg-secondary text-secondary-foreground mr-2"
      onClick={() => (blockType !== "code" ? formatCode() : formatParagraph())}
    >
      {" "}
      {value}
    </Button>
  );
}
