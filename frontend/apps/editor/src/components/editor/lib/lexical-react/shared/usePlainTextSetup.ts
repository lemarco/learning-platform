import type { LexicalEditor } from "../../lexical-editor";

import { registerDragonSupport } from "../../lexical-editor";
import { registerPlainText } from "../../lexical-editor";
import { mergeRegister } from "../../lexical-editor";
import { useLayoutEffectImpl as useLayoutEffect } from "../../lexical-editor";

export function usePlainTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(registerPlainText(editor), registerDragonSupport(editor));

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
