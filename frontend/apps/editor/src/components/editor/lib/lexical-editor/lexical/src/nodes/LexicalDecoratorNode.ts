import type { KlassConstructor, LexicalEditor } from "../LexicalEditor";
import type { NodeKey } from "../LexicalNode";

import { EditorConfig } from "../../../lexical/Lexical";
import { invariant } from "../../../shared/src/invariant";

import { LexicalNode } from "../LexicalNode";

/** @noInheritDoc */
export class DecoratorNode<T> extends LexicalNode {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  ["constructor"]!: KlassConstructor<typeof DecoratorNode<T>>;
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(key?: NodeKey) {
    super(key);
  }

  /**
   * The returned value is added to the LexicalEditor._decorators
   */
  decorate(editor: LexicalEditor, config: EditorConfig): T {
    invariant(false, "decorate: base method not extended");
  }

  isIsolated(): boolean {
    return false;
  }

  isInline(): boolean {
    return true;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }
}

export function $isDecoratorNode<T>(node: LexicalNode | null | undefined): node is DecoratorNode<T> {
  return node instanceof DecoratorNode;
}
