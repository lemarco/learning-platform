import type { EntityMatch } from "../text";
import type { Klass, TextNode } from "../";

import { useLexicalComposerContext } from "./LexicalComposerContext";
import { registerLexicalTextEntity } from "../";
import { mergeRegister } from "../";
import { useEffect } from "react";

export function useLexicalTextEntity<T extends TextNode>(
  getMatch: (text: string) => null | EntityMatch,
  targetNode: Klass<T>,
  createNode: (textNode: TextNode) => T
): void {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      ...registerLexicalTextEntity(editor, getMatch, targetNode, createNode)
    );
  }, [createNode, editor, getMatch, targetNode]);
}
