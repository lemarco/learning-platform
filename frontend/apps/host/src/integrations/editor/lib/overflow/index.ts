/** @module @lexical/overflow */

import type {
  EditorConfig,
  EditorNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
} from "../core";

import { $applyNodeReplacement, ElementNode } from "../core";

export type SerializedOverflowNode = SerializedElementNode;


export class OverflowNode extends ElementNode {
  static getType(): string {
    return "overflow";
  }

  static clone(node: OverflowNode): OverflowNode {
    return new OverflowNode(node.__key);
  }

  static importJSON(serializedNode: SerializedOverflowNode): OverflowNode {
    return $createOverflowNode();
  }

  static importDOM(): null {
    return null;
  }

  constructor(key?: NodeKey) {
    super(key);
    this.__type = "overflow";
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: "overflow",
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement("span");
    const className = config.theme.characterLimit;
    if (typeof className === "string") {
      div.className = className;
    }
    return div;
  }

  updateDOM(prevNode: OverflowNode, dom: HTMLElement): boolean {
    return false;
  }

  insertNewAfter(
    selection: RangeSelection,
    restoreSelection = true
  ): null | EditorNode {
    const parent = this.getParentOrThrow();
    return parent.insertNewAfter(selection, restoreSelection);
  }

  excludeFromCopy(): boolean {
    return true;
  }
}

export function $createOverflowNode(): OverflowNode {
  return $applyNodeReplacement(new OverflowNode());
}

export function $isOverflowNode(
  node: EditorNode | null | undefined
): node is OverflowNode {
  return node instanceof OverflowNode;
}
