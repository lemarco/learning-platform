/** @jsxImportSource react */

import { registerCodeHighlighting } from "@frontend/lexical-editor";
import { useLexicalComposerContext } from "@frontend/lexical-react";
import { useEffect } from "react";

export default function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}
