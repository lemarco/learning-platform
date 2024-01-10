/** @jsxImportSource react */
import type { LexicalEditor } from "../../../../";

import { $createQuoteNode } from "../../../../";

import { $setBlocksType, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from "../../../../";

import { Button } from "ui";
import { blockTypeToBlockName } from "../constants";

export function QuoteButton({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };
  return (
    <Button className="bg-secondary text-secondary-foreground mr-2" onClick={formatQuote}>
      Q
    </Button>
  );
}
