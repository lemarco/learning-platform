import type { LexicalEditor } from "../../";

import { registerDragonSupport } from "../../";
import { registerPlainText } from "../../";
import { mergeRegister } from "../../";
import { useLayoutEffectImpl as useLayoutEffect } from "shared/utils";

export function usePlainTextSetup(editor: LexicalEditor): void {
  useLayoutEffect(() => {
    return mergeRegister(
      registerPlainText(editor),
      registerDragonSupport(editor)
    );

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}
