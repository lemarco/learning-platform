import type { LexicalEditor, NodeKey } from "@frontend/lexical-editor";

import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $createNodeSelection, $getNodeByKey, $getSelection, $isNodeSelection, $setSelection } from "@frontend/lexical-editor";
import { useCallback, useEffect, useState } from "react";

function isNodeSelected(editor: LexicalEditor, key: NodeKey): boolean {
  return editor.getEditorState().read(() => {
    const node = $getNodeByKey(key);

    if (node === null) {
      return false;
    }

    return node.isSelected();
  });
}

export function useLexicalNodeSelection(key: NodeKey): [boolean, (arg0: boolean) => void, () => void] {
  const [editor] = useLexicalComposerContext();

  const [isSelected, setIsSelected] = useState(() => isNodeSelected(editor, key));

  useEffect(() => {
    let isMounted = true;
    const unregister = editor.registerUpdateListener(() => {
      if (isMounted) {
        setIsSelected(isNodeSelected(editor, key));
      }
    });

    return () => {
      isMounted = false;
      unregister();
    };
  }, [editor, key]);

  const setSelected = useCallback(
    (selected: boolean) => {
      editor.update(() => {
        let selection = $getSelection();

        if (!$isNodeSelection(selection)) {
          selection = $createNodeSelection();
          $setSelection(selection);
        }
        if ($isNodeSelection(selection)) {
          if (selected) {
            selection.add(key);
          } else {
            selection.delete(key);
          }
        }
      });
    },
    [editor, key],
  );

  const clearSelected = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isNodeSelection(selection)) {
        selection.clear();
      }
    });
  }, [editor]);

  return [isSelected, setSelected, clearSelected];
}
