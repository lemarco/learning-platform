import type { EditorState, LexicalEditor } from "../lexical-editor";

import { useLexicalComposerContext } from "./LexicalComposerContext";
import { useLayoutEffectImpl as useLayoutEffect } from "../lexical-editor";

export function OnChangePlugin({
  ignoreHistoryMergeTagChange = true,
  ignoreSelectionChange = false,
  onChange,
}: {
  ignoreHistoryMergeTagChange?: boolean;
  ignoreSelectionChange?: boolean;
  onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;
}): null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    if (onChange) {
      return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
        if (
          (ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
          (ignoreHistoryMergeTagChange && tags.has("history-merge")) ||
          prevEditorState.isEmpty()
        ) {
          return;
        }

        onChange(editorState, editor, tags);
      });
    }
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange]);

  return null;
}
