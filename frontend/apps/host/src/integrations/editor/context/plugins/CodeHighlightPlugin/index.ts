import { registerCodeHighlighting } from "features/editor";
import { useLexicalComposerContext } from "features/editor";
import { useEffect } from "react";

export function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}
