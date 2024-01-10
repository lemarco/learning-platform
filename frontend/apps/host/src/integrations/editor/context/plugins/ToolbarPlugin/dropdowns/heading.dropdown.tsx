/** @jsxImportSource react */
import type { LexicalEditor } from "features/editor";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "ui";
import { $createHeadingNode, HeadingTagType } from "features/editor";
import { $setBlocksType } from "features/editor";
import { $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from "features/editor";
import { blockTypeToBlockName } from "../constants";

type Props = {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
};
export function HeadingDropDown({ editor, blockType, disabled = false }: Props) {
  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">H</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => formatHeading("h1")}>Heading 1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => formatHeading("h2")}>Heading 2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => formatHeading("h3")}>Heading 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
