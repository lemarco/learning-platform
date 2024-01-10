import { useLexicalComposerContext } from "features/editor";
import { $insertNodeToNearestRoot } from "features/editor";
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "features/editor";
import { useEffect } from "react";

import { $createFigmaNode, FigmaNode } from "../../nodes/FigmaNode";

export const INSERT_FIGMA_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_FIGMA_COMMAND"
);

export function FigmaPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([FigmaNode])) {
      throw new Error("FigmaPlugin: FigmaNode not registered on editor");
    }

    return editor.registerCommand<string>(
      INSERT_FIGMA_COMMAND,
      (payload) => {
        const figmaNode = $createFigmaNode(payload);
        $insertNodeToNearestRoot(figmaNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
