/** @module @lexical/overflow */

import type { EditorConfig, LexicalNode, NodeKey, RangeSelection, SerializedElementNode } from "../../lexical/Lexical";

import { $applyNodeReplacement, ElementNode } from "../../lexical/Lexical";

export type SerializedOverflowNode = SerializedElementNode;

/** @noInheritDoc */
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

  insertNewAfter(selection: RangeSelection, restoreSelection = true): null | LexicalNode {
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

export function $isOverflowNode(node: LexicalNode | null | undefined): node is OverflowNode {
  return node instanceof OverflowNode;
}
