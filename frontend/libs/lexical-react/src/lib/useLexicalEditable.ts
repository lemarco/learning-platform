import type { LexicalSubscription } from "./useLexicalSubscription";
import type { LexicalEditor } from "@frontend/lexical-editor";

import { useLexicalSubscription } from "./useLexicalSubscription";

function subscription(editor: LexicalEditor): LexicalSubscription<boolean> {
  return {
    initialValueFn: () => editor.isEditable(),
    subscribe: (callback) => {
      return editor.registerEditableListener(callback);
    },
  };
}

export function useLexicalEditable(): boolean {
  return useLexicalSubscription(subscription);
}
