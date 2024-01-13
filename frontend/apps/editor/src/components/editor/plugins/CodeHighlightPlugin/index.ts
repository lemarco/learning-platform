/** @jsxImportSource react */

import { useEffect } from "react";
import { registerCodeHighlighting } from "../../lib/lexical-editor";
import { useLexicalComposerContext } from "../../lib/lexical-react";

export default function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}
