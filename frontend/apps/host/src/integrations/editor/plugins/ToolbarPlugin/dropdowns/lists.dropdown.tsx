import type { LexicalEditor } from "features/editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "features/editor";
import { blockTypeToBlockName } from "../constants";

export function ListsDropDown({
  editor,
  blockType,

  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;

  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">Lists</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={formatBulletList}>
          Bullet List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={formatNumberedList}>
          Numbered List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={formatCheckList}>
          Check List
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
