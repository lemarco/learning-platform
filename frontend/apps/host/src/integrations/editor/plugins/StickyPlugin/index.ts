import { useLexicalComposerContext } from "features/editor";
import { useEffect } from "react";

import { StickyNode } from "../../nodes/StickyNode";

export function StickyPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([StickyNode])) {
      throw new Error("StickyPlugin: StickyNode not registered on editor");
    }
  }, [editor]);
  return null;
}
