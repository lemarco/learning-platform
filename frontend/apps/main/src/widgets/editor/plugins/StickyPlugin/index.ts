/** @jsxImportSource react */

import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;
import { useEffect } from "react";

import { StickyNode } from "../../nodes/StickyNode";

export default function StickyPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([StickyNode])) {
      throw new Error("StickyPlugin: StickyNode not registered on editor");
    }
  }, [editor]);
  return null;
}
