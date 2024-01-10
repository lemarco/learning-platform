import type { LexicalEditor } from "../../";

import { registerDragonSupport } from "../../";
import { registerRichText } from "../../";
import { mergeRegister } from "../../";
import { useLayoutEffectImpl as useLayoutEffect } from "shared/utils";

export function useRichTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(
      registerRichText(editor),
      registerDragonSupport(editor)
    );

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
