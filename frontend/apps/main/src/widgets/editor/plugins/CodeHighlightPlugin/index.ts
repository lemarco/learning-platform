/** @jsxImportSource react */

import LexCode from "@lexical/code";
const { registerCodeHighlighting } = LexCode;
import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;
import { useEffect } from "react";

export default function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}
