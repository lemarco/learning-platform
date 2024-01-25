/** @jsxImportSource react */

import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;
import Lex from "lexical";
const { $getSelection, $isRangeSelection, $setSelection, FOCUS_COMMAND } = Lex;
import { useEffect } from "react";

const COMMAND_PRIORITY_LOW = 1;
const TAB_TO_FOCUS_INTERVAL = 100;

let lastTabKeyDownTimestamp = 0;
let hasRegisteredKeyDownListener = false;

function registerKeyTimeStampTracker() {
  window.addEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      // Tab
      if (event.key === "Tab") {
        lastTabKeyDownTimestamp = event.timeStamp;
      }
    },
    true,
  );
}

export default function TabFocusPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!hasRegisteredKeyDownListener) {
      registerKeyTimeStampTracker();
      hasRegisteredKeyDownListener = true;
    }

    return editor.registerCommand(
      FOCUS_COMMAND,
      (event: FocusEvent) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (lastTabKeyDownTimestamp + TAB_TO_FOCUS_INTERVAL > event.timeStamp) {
            $setSelection(selection.clone());
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}
