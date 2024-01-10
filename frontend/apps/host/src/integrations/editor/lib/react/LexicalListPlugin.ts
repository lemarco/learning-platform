import { ListItemNode, ListNode } from "../list";
import { useLexicalComposerContext } from "../";
import { useEffect } from "react";

import { useList } from "./shared/useList";

export function ListPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ListNode, ListItemNode])) {
      throw new Error(
        "ListPlugin: ListNode and/or ListItemNode not registered on editor"
      );
    }
  }, [editor]);

  useList(editor);

  return null;
}
