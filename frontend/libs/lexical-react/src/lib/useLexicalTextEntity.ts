import type { EntityMatch } from "@frontend/lexical-editor";
import type { Klass, TextNode } from "@frontend/lexical-editor";

import { useLexicalComposerContext } from "./LexicalComposerContext";
import { registerLexicalTextEntity } from "@frontend/lexical-editor";
import { mergeRegister } from "@frontend/lexical-editor";
import { useEffect } from "react";

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
