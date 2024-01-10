import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { $isDecoratorBlockNode } from "features/editor";

import { $isHeadingNode, $isQuoteNode } from "features/editor";

import { $getNearestBlockElementAncestorOrThrow } from "features/editor";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
} from "features/editor";
import { useCallback } from "react";

export const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

type Props = {
  activeEditor;
};
export function FormattingToolsDropdown({ activeEditor }: Props) {
  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node;
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node;
            }

            if (node.__style !== "") {
              node.setStyle("");
            }
            if (node.__format !== 0) {
              node.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(node).setFormat("");
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [activeEditor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">Formatting</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
        >
          Strikethrough
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
          }}
        >
          Subscript
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
          }}
        >
          Superscript
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
          }}
        >
          Clear Formatting
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
