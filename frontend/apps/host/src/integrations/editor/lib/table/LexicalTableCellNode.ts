import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  EditorNode,
  NodeKey,
  SerializedGridCellNode,
  Spread,
} from "../";

import { addClassNamesToElement } from "../utils";
import {
  $applyNodeReplacement,
  $createParagraphNode,
  $isElementNode,
  $isLineBreakNode,
  DEPRECATED_GridCellNode,
} from "../";

import { PIXEL_VALUE_REG_EXP } from "./constants";

export const TableCellHeaderStates = {
  BOTH: 3,
  COLUMN: 2,
  NO_STATUS: 0,
  ROW: 1,
};

export type TableCellHeaderState =
  (typeof TableCellHeaderStates)[keyof typeof TableCellHeaderStates];

export type SerializedTableCellNode = Spread<
  {
    headerState: TableCellHeaderState;
    width?: number;
    backgroundColor?: null | string;
  },
  SerializedGridCellNode
>;


//@ts-ignore
export class TableCellNode extends DEPRECATED_GridCellNode {

  __headerState: TableCellHeaderState;

  __width?: number;

  __backgroundColor: null | string;

  static getType(): string {
    return "tablecell";
  }

  static clone(node: TableCellNode): TableCellNode {
    const cellNode = new TableCellNode(
      node.__headerState,
      node.__colSpan,
      node.__width,
      node.__key
    );
    cellNode.__rowSpan = node.__rowSpan;
    cellNode.__backgroundColor = node.__backgroundColor;
    return cellNode;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      td: (node: Node) => ({
        conversion: convertTableCellNodeElement,
        priority: 0,
      }),
      th: (node: Node) => ({
        conversion: convertTableCellNodeElement,
        priority: 0,
      }),
    };
  }

  static importJSON(serializedNode: SerializedTableCellNode): TableCellNode {
    const colSpan = serializedNode.colSpan || 1;
    const rowSpan = serializedNode.rowSpan || 1;
    const cellNode = $createTableCellNode(
      serializedNode.headerState,
      colSpan,
      serializedNode.width || undefined
    );
    cellNode.__rowSpan = rowSpan;
    cellNode.__backgroundColor = serializedNode.backgroundColor || null;
    return cellNode;
  }

  constructor(
    headerState = TableCellHeaderStates.NO_STATUS,
    colSpan = 1,
    width?: number,
    key?: NodeKey
  ) {
    super(colSpan, key);
    this.__headerState = headerState;
    this.__width = width;
    this.__backgroundColor = null;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement(
      this.getTag()
    ) as HTMLTableCellElement;

    if (this.__width) {
      element.style.width = `${this.__width}px`;
    }
    if (this.__colSpan > 1) {
      element.colSpan = this.__colSpan;
    }
    if (this.__rowSpan > 1) {
      element.rowSpan = this.__rowSpan;
    }
    if (this.__backgroundColor !== null) {
      element.style.backgroundColor = this.__backgroundColor;
    }

    addClassNamesToElement(
      element,
      config.theme.tableCell,
      this.hasHeader() && config.theme.tableCellHeader
    );

    return element;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor);

    if (element) {
      const element_ = element as HTMLTableCellElement;
      const maxWidth = 700;
      const colCount = this.getParentOrThrow().getChildrenSize();
      element_.style.border = "1px solid black";
      if (this.__colSpan > 1) {
        element_.colSpan = this.__colSpan;
      }
      if (this.__rowSpan > 1) {
        element_.rowSpan = this.__rowSpan;
      }
      element_.style.width = `${
        this.getWidth() || Math.max(90, maxWidth / colCount)
      }px`;

      element_.style.verticalAlign = "top";
      element_.style.textAlign = "start";

      const backgroundColor = this.getBackgroundColor();
      if (backgroundColor !== null) {
        element_.style.backgroundColor = backgroundColor;
      } else if (this.hasHeader()) {
        element_.style.backgroundColor = "#f2f3f5";
      }
    }

    return {
      element,
    };
  }

  exportJSON(): SerializedTableCellNode {
    return {
      ...super.exportJSON(),
      backgroundColor: this.getBackgroundColor(),
      headerState: this.__headerState,
      type: "tablecell",
      width: this.getWidth(),
    };
  }

  getTag(): string {
    return this.hasHeader() ? "th" : "td";
  }

  setHeaderStyles(headerState: TableCellHeaderState): TableCellHeaderState {
    const self = this.getWritable();
    self.__headerState = headerState;
    return this.__headerState;
  }

  getHeaderStyles(): TableCellHeaderState {
    return this.getLatest().__headerState;
  }

  setWidth(width: number): number | null | undefined {
    const self = this.getWritable();
    self.__width = width;
    return this.__width;
  }

  getWidth(): number | undefined {
    return this.getLatest().__width;
  }

  getBackgroundColor(): null | string {
    return this.getLatest().__backgroundColor;
  }

  setBackgroundColor(newBackgroundColor: null | string): void {
    this.getWritable().__backgroundColor = newBackgroundColor;
  }

  toggleHeaderStyle(headerStateToToggle: TableCellHeaderState): TableCellNode {
    const self = this.getWritable();

    if ((self.__headerState & headerStateToToggle) === headerStateToToggle) {
      self.__headerState -= headerStateToToggle;
    } else {
      self.__headerState += headerStateToToggle;
    }

    return self;
  }

  hasHeaderState(headerState: TableCellHeaderState): boolean {
    return (this.getHeaderStyles() & headerState) === headerState;
  }

  hasHeader(): boolean {
    return this.getLatest().__headerState !== TableCellHeaderStates.NO_STATUS;
  }

  updateDOM(prevNode: TableCellNode): boolean {
    return (
      prevNode.__headerState !== this.__headerState ||
      prevNode.__width !== this.__width ||
      prevNode.__colSpan !== this.__colSpan ||
      prevNode.__rowSpan !== this.__rowSpan ||
      prevNode.__backgroundColor !== this.__backgroundColor
    );
  }

  isShadowRoot(): boolean {
    return true;
  }

  collapseAtStart(): true {
    return true;
  }

  canBeEmpty(): false {
    return false;
  }

  canIndent(): false {
    return false;
  }
}

export function convertTableCellNodeElement(
  domNode: Node
): DOMConversionOutput {
  const domNode_ = domNode as HTMLTableCellElement;
  const nodeName = domNode.nodeName.toLowerCase();

  let width: number | undefined = undefined;

  if (PIXEL_VALUE_REG_EXP.test(domNode_.style.width)) {
    width = parseFloat(domNode_.style.width);
  }

  const tableCellNode = $createTableCellNode(
    nodeName === "th"
      ? TableCellHeaderStates.ROW
      : TableCellHeaderStates.NO_STATUS,
    domNode_.colSpan,
    width
  );

  tableCellNode.__rowSpan = domNode_.rowSpan;
  const backgroundColor = domNode_.style.backgroundColor;
  if (backgroundColor !== "") {
    tableCellNode.__backgroundColor = backgroundColor;
  }

  return {
    forChild: (EditorNode, parentEditorNode) => {
      if ($isTableCellNode(parentEditorNode) && !$isElementNode(EditorNode)) {
        const paragraphNode = $createParagraphNode();
        if (
          $isLineBreakNode(EditorNode) &&
          EditorNode.getTextContent() === "\n"
        ) {
          return null;
        }
        paragraphNode.append(EditorNode);
        return paragraphNode;
      }

      return EditorNode;
    },

    node: tableCellNode,
  };
}

export function $createTableCellNode(
  headerState: TableCellHeaderState,
  colSpan = 1,
  width?: number
): TableCellNode {
  return $applyNodeReplacement(new TableCellNode(headerState, colSpan, width));
}

export function $isTableCellNode(
  node: EditorNode | null | undefined
): node is TableCellNode {
  return node instanceof TableCellNode;
}
