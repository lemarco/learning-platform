/** @jsxImportSource react */

import { useLexicalComposerContext } from "@frontend/lexical-react";
import { $insertNodeToNearestRoot } from "@frontend/lexical-editor";
import { COMMAND_PRIORITY_EDITOR, LexicalCommand, createCommand } from "@frontend/lexical-editor";
import { useEffect } from "react";

import { $createFigmaNode, FigmaNode } from "../../nodes/FigmaNode";

export const INSERT_FIGMA_COMMAND: LexicalCommand<string> = createCommand("INSERT_FIGMA_COMMAND");

export default function FigmaPlugin(): JSX.Element | null {
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
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
