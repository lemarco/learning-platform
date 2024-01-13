import { useEffect } from "react";
import { ListItemNode, ListNode } from "../lexical-editor";
import { useLexicalComposerContext } from "./LexicalComposerContext";

import { useList } from "./shared/useList";

export function ListPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ListNode, ListItemNode])) {
      throw new Error("ListPlugin: ListNode and/or ListItemNode not registered on editor");
    }
  }, [editor]);

  useList(editor);

  return null;
}
