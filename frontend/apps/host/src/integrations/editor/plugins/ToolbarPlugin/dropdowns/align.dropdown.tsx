import { useCallback, useEffect, useState } from "react";
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "features/editor";
import { $isParentElementRTL } from "features/editor";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "features/editor";
import { $findMatchingParent } from "features/editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "ui";

export const AlignDropDown = ({
  isEditable,
  activeEditor,
  editor,
  setActiveEditor,
}) => {
  const [isRTL, setIsRTL] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      setIsRTL($isParentElementRTL(selection));
    }
  }, [activeEditor]);
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={!isEditable} className={"mr-3"}>
        Align
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
          }
        >
          Left Align{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
        >
          Center Align{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
        >
          Right Align{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }
        >
          Justify Align{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
          }
        >
          Outdent{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }
        >
          Indent{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
