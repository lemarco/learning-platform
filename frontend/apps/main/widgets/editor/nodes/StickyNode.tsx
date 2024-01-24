import type { EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedEditor, SerializedLexicalNode, Spread } from "lexical";

import { $setSelection, DecoratorNode, createEditor } from "lexical";
import * as React from "react";
import { Suspense } from "react";
import { createPortal } from "react-dom";

const StickyComponent = React.lazy(() => import("./StickyComponent"));

type StickyNoteColor = "pink" | "yellow";

export type SerializedStickyNode = Spread<
  {
    xOffset: number;
    yOffset: number;
    color: StickyNoteColor;
    caption: SerializedEditor;
  },
  SerializedLexicalNode
>;

export class StickyNode extends DecoratorNode<JSX.Element> {
  __x: number;
  __y: number;
  __color: StickyNoteColor;
  __caption: LexicalEditor;

  static getType(): string {
    return "sticky";
  }

  static clone(node: StickyNode): StickyNode {
    return new StickyNode(node.__x, node.__y, node.__color, node.__caption, node.__key);
  }
  static importJSON(serializedNode: SerializedStickyNode): StickyNode {
    const stickyNode = new StickyNode(serializedNode.xOffset, serializedNode.yOffset, serializedNode.color);
    const caption = serializedNode.caption;
    const nestedEditor = stickyNode.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return stickyNode;
  }

  constructor(x: number, y: number, color: "pink" | "yellow", caption?: LexicalEditor, key?: NodeKey) {
    super(key);
    this.__x = x;
    this.__y = y;
    this.__caption = caption || createEditor();
    this.__color = color;
  }

  exportJSON(): SerializedStickyNode {
    return {
      caption: this.__caption.toJSON(),
      color: this.__color,
      type: "sticky",
      version: 1,
      xOffset: this.__x,
      yOffset: this.__y,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    if (typeof document !== "undefined") {
      const div = document.createElement("div");
      div.style.display = "contents";
      return div;
    }
    return undefined as any;
  }

  updateDOM(): false {
    return false;
  }

  setPosition(x: number, y: number): void {
    const writable = this.getWritable();
    writable.__x = x;
    writable.__y = y;
    $setSelection(null);
  }

  toggleColor(): void {
    const writable = this.getWritable();
    writable.__color = writable.__color === "pink" ? "yellow" : "pink";
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    if (typeof document !== "undefined") {
      return createPortal(
        <Suspense fallback={null}>
          <StickyComponent color={this.__color} x={this.__x} y={this.__y} nodeKey={this.getKey()} caption={this.__caption} />
        </Suspense>,
        document.body,
      );
    }
    return <></>;
  }

  isIsolated(): true {
    return true;
  }
}

export function $isStickyNode(node: LexicalNode | null | undefined): node is StickyNode {
  return node instanceof StickyNode;
}

export function $createStickyNode(xOffset: number, yOffset: number): StickyNode {
  return new StickyNode(xOffset, yOffset, "yellow");
}
