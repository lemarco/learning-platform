import type { LexicalEditor } from "features/editor";
import { useCallback, useEffect } from "react";
import { $getSelection, $isRangeSelection } from "features/editor";
import { $patchStyleText } from "features/editor";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "ui";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];

export function FontDropDown({
  editor,
  value,
  style,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const propertyToMap =
    style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">{value}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {propertyToMap.map(([option, text]) => (
          <DropdownMenuItem onClick={() => handleClick(option)} key={option}>
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
