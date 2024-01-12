import type { LexicalEditor } from "../../lexical-editor";

import { registerDragonSupport } from "../../lexical-editor";
import { registerRichText } from "../../lexical-editor";
import { mergeRegister } from "../../lexical-editor";
import { useLayoutEffectImpl as useLayoutEffect } from "../../lexical-editor";

export function useRichTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(registerRichText(editor), registerDragonSupport(editor));

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
