import type { EntityMatch } from "../lexical-editor";
import type { Klass, TextNode } from "../lexical-editor";

import { useEffect } from "react";
import { registerLexicalTextEntity } from "../lexical-editor";
import { mergeRegister } from "../lexical-editor";
import { useLexicalComposerContext } from "./LexicalComposerContext";

export function useLexicalTextEntity<T extends TextNode>(
  getMatch: (text: string) => null | EntityMatch,
  targetNode: Klass<T>,
  createNode: (textNode: TextNode) => T,
): void {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(...registerLexicalTextEntity(editor, getMatch, targetNode, createNode));
  }, [createNode, editor, getMatch, targetNode]);
}
