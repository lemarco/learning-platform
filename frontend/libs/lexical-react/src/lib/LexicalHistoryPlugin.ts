import type { HistoryState } from "@frontend/lexical-editor";

import { useLexicalComposerContext } from "./LexicalComposerContext";

import { useHistory } from "./shared/useHistory";

export { createEmptyHistoryState } from "@frontend/lexical-editor";

export type { HistoryState };

export function HistoryPlugin({
  externalHistoryState,
}: {
  externalHistoryState?: HistoryState;
}): null {
  const [editor] = useLexicalComposerContext();

  useHistory(editor, externalHistoryState);

  return null;
}
