/** @jsxImportSource react */

import { useLexicalComposerContext } from "@frontend/lexical-react";
import { $insertNodeToNearestRoot } from "@frontend/lexical-editor";
import { COMMAND_PRIORITY_EDITOR, LexicalCommand, createCommand } from "@frontend/lexical-editor";
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
