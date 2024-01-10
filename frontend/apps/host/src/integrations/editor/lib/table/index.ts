/** @module @lexical/table */

import type { LexicalCommand } from "../";

import { createCommand } from "../";

export type { SerializedTableCellNode } from "./LexicalTableCellNode";
export {
  $createTableCellNode,
  $isTableCellNode,
  TableCellHeaderStates,
  TableCellNode,
} from "./LexicalTableCellNode";
export type { SerializedTableNode } from "./LexicalTableNode";
export {
  $createTableNode,
  $getElementGridForTableNode,
  $isTableNode,
  TableNode,
} from "./LexicalTableNode";
export type { SerializedTableRowNode } from "./LexicalTableRowNode";
export {
  $createTableRowNode,
  $isTableRowNode,
  TableRowNode,
} from "./LexicalTableRowNode";
export type { Cell } from "./LexicalTableSelection";
export { TableSelection } from "./LexicalTableSelection";
export type { HTMLTableElementWithWithTableSelectionState } from "./LexicalTableSelectionHelpers";
export {
  applyTableHandlers,
  getCellFromTarget,
  getTableSelectionFromTableElement,
} from "./LexicalTableSelectionHelpers";
export {
  $createTableNodeWithDimensions,
  $deleteTableColumn,
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getTableCellNodeFromEditorNode,
  $getTableColumnIndexFromTableCellNode,
   $getTableNodeFromEditorNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $getTableRowNodeFromTableCellNodeOrThrow,
  $insertTableColumn,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow,
  $insertTableRow__EXPERIMENTAL,
  $removeTableRowAtIndex,
  $unmergeCell,
} from "./LexicalTableUtils";

export type InsertTableCommandPayloadHeaders =
  | Readonly<{
      rows: boolean;
      columns: boolean;
    }>
  | boolean;

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: InsertTableCommandPayloadHeaders;
}>;

export const INSERT_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand("INSERT_TABLE_COMMAND");
