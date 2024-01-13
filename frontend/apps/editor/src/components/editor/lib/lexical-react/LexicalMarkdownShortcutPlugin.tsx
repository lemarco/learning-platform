/** @jsxImportSource react */
import type { ElementTransformer, Transformer } from "../lexical-editor";
import type { LexicalNode } from "../lexical-editor";

import { useEffect } from "react";
import { TRANSFORMERS, registerMarkdownShortcuts } from "../lexical-editor";
import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $createHorizontalRuleNode, $isHorizontalRuleNode, HorizontalRuleNode } from "./LexicalHorizontalRuleNode";

const HR: ElementTransformer = {
  dependencies: [HorizontalRuleNode],
  export: (node: LexicalNode) => {
    return $isHorizontalRuleNode(node) ? "***" : null;
  },
  regExp: /^(---|\*\*\*|___)\s?$/,
  replace: (parentNode, _1, _2, isImport) => {
    const line = $createHorizontalRuleNode();

    // TODO: Get rid of isImport flag
    if (isImport || parentNode.getNextSibling() != null) {
      parentNode.replace(line);
    } else {
      parentNode.insertBefore(line);
    }

    line.selectNext();
  },
  type: "element",
};
export const DEFAULT_TRANSFORMERS = [HR, ...TRANSFORMERS];

export function MarkdownShortcutPlugin({
  transformers = DEFAULT_TRANSFORMERS,
}: Readonly<{
  transformers?: Array<Transformer>;
}>): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerMarkdownShortcuts(editor, transformers);
  }, [editor, transformers]);

  return null;
}
