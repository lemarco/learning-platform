import type { HistoryState } from "../../";
import type { LexicalEditor } from "../../";

import { createEmptyHistoryState, registerHistory } from "../../";
import { useEffect, useMemo } from "react";

export function useHistory(
  editor: LexicalEditor,
  externalHistoryState?: HistoryState,
  delay = 1000
): void {
  const historyState: HistoryState = useMemo(
    () => externalHistoryState || createEmptyHistoryState(),
    [externalHistoryState]
  );

  useEffect(() => {
    return registerHistory(editor, historyState, delay);
  }, [delay, editor, historyState]);
}
