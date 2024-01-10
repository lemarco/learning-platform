import type { LexicalEditor } from "../editor";
import type { NodeKey } from "./editor";

import { EditorConfig } from "..";
import { invariant } from "shared/utils";

import { EditorNode } from "./editor";


export class DecoratorNode<T> extends EditorNode {
  constructor(key?: NodeKey) {
    super(key);
  }
  // @ts-ignore
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

export function $isDecoratorNode<T>(
  node: EditorNode | null | undefined
): node is DecoratorNode<T> {
  return node instanceof DecoratorNode;
}
