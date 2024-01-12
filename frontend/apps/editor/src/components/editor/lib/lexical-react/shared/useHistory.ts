import type { HistoryState } from "../../lexical-editor";
import type { LexicalEditor } from "../../lexical-editor";

import { createEmptyHistoryState, registerHistory } from "../../lexical-editor";
import { useEffect, useMemo } from "react";

export function useHistory(editor: LexicalEditor, externalHistoryState?: HistoryState, delay = 1000): void {
  const historyState: HistoryState = useMemo(() => externalHistoryState || createEmptyHistoryState(), [externalHistoryState]);

  useEffect(() => {
    return registerHistory(editor, historyState, delay);
  }, [delay, editor, historyState]);
}
