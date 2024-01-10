import type { HistoryState } from "../history";

import { useLexicalComposerContext } from "./LexicalComposerContext";

import { useHistory } from "./shared/useHistory";

export function HistoryPlugin({
  externalHistoryState,
}: {
  externalHistoryState?: HistoryState;
}): null {
  const [editor] = useLexicalComposerContext();

  useHistory(editor, externalHistoryState);

  return null;
}
