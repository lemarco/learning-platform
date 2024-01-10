import type { EditorNode, NodeKey, SerializedElementNode, Spread } from "..";

import { ElementNode } from "./element";

export type SerializedGridCellNode = Spread<
  {
    colSpan?: number;
    rowSpan?: number;
  },
  SerializedElementNode
>;


export class DEPRECATED_GridCellNode extends ElementNode {

  __colSpan: number;
  __rowSpan: number;

  constructor(colSpan: number, key?: NodeKey) {
    super(key);
    this.__colSpan = colSpan;
    this.__rowSpan = 1;
  }

  exportJSON(): SerializedGridCellNode {
    return {
      ...super.exportJSON(),
      colSpan: this.__colSpan,
      rowSpan: this.__rowSpan,
    };
  }

  getColSpan(): number {
    return this.__colSpan;
  }

  setColSpan(colSpan: number): this {
    this.getWritable().__colSpan = colSpan;
    return this;
  }

  getRowSpan(): number {
    return this.__rowSpan;
  }

  setRowSpan(rowSpan: number): this {
    this.getWritable().__rowSpan = rowSpan;
    return this;
  }
}

export function DEPRECATED_$isGridCellNode(
  node: DEPRECATED_GridCellNode | EditorNode | null | undefined
): node is DEPRECATED_GridCellNode {
  return node instanceof DEPRECATED_GridCellNode;
}
