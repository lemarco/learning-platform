/** @jsxImportSource react */

import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;

import LexUtils from "@lexical/utils";
const { $insertNodeToNearestRoot } = LexUtils;
import Lex, { LexicalCommand } from "lexical";
const { COMMAND_PRIORITY_EDITOR, createCommand } = Lex;
import { useEffect } from "react";

import { $createYouTubeNode, YouTubeNode } from "../../nodes/YouTubeNode";

export const INSERT_YOUTUBE_COMMAND: LexicalCommand<string> = createCommand("INSERT_YOUTUBE_COMMAND");

export default function YouTubePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([YouTubeNode])) {
      throw new Error("YouTubePlugin: YouTubeNode not registered on editor");
    }

    return editor.registerCommand<string>(
      INSERT_YOUTUBE_COMMAND,
      (payload) => {
        const youTubeNode = $createYouTubeNode(payload);
        $insertNodeToNearestRoot(youTubeNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
