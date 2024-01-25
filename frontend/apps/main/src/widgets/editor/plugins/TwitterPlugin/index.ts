/** @jsxImportSource react */

import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;

import LexUtils from "@lexical/utils";
const { $insertNodeToNearestRoot } = LexUtils;
import Lex, { LexicalCommand } from "lexical";
const { COMMAND_PRIORITY_EDITOR, createCommand } = Lex;
import { useEffect } from "react";

import { $createTweetNode, TweetNode } from "../../nodes/TweetNode";

export const INSERT_TWEET_COMMAND: LexicalCommand<string> = createCommand("INSERT_TWEET_COMMAND");

export default function TwitterPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([TweetNode])) {
      throw new Error("TwitterPlugin: TweetNode not registered on editor");
    }

    return editor.registerCommand<string>(
      INSERT_TWEET_COMMAND,
      (payload) => {
        const tweetNode = $createTweetNode(payload);
        $insertNodeToNearestRoot(tweetNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
