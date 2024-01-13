import type { LexicalEditor } from "../../lexical-editor";

import { useState } from "react";
import { $canShowPlaceholderCurry } from "../../lexical-editor";
import { mergeRegister } from "../../lexical-editor";
import { useLayoutEffectImpl as useLayoutEffect } from "../../lexical-editor/shared/src/useLayoutEffect";

function canShowPlaceholderFromCurrentEditorState(editor: LexicalEditor): boolean {
  const currentCanShowPlaceholder = editor.getEditorState().read($canShowPlaceholderCurry(editor.isComposing()));

  return currentCanShowPlaceholder;
}

export function useCanShowPlaceholder(editor: LexicalEditor): boolean {
  const [canShowPlaceholder, setCanShowPlaceholder] = useState(() => canShowPlaceholderFromCurrentEditorState(editor));

  useLayoutEffect(() => {
    function resetCanShowPlaceholder() {
      const currentCanShowPlaceholder = canShowPlaceholderFromCurrentEditorState(editor);
      setCanShowPlaceholder(currentCanShowPlaceholder);
    }
    resetCanShowPlaceholder();
    return mergeRegister(
      editor.registerUpdateListener(() => {
        resetCanShowPlaceholder();
      }),
      editor.registerEditableListener(() => {
        resetCanShowPlaceholder();
      }),
    );
  }, [editor]);

  return canShowPlaceholder;
}
