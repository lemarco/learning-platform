import type { LexicalEditor } from "@frontend/lexical-editor";

import { registerDragonSupport } from "@frontend/lexical-editor";
import { registerRichText } from "@frontend/lexical-editor";
import { mergeRegister } from "@frontend/lexical-editor";
import { useLayoutEffectImpl as useLayoutEffect } from "../../../shared/src/useLayoutEffect";

export function useRichTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(registerRichText(editor), registerDragonSupport(editor));

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
