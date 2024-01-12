/** @module @lexical/list */

import type { LexicalCommand } from "../../lexical/Lexical";
import type { SerializedListItemNode } from "./LexicalListItemNode";
import type { ListType, SerializedListNode } from "./LexicalListNode";

import { createCommand } from "../../lexical/Lexical";

import { $createListItemNode, $isListItemNode, ListItemNode } from "./LexicalListItemNode";
import { $createListNode, $isListNode, ListNode } from "./LexicalListNode";
import { $handleListInsertParagraph, insertList, removeList } from "./formatList";
import { $getListDepth } from "./utils";

export {
  $createListItemNode,
  $createListNode,
  $getListDepth,
  $handleListInsertParagraph,
  $isListItemNode,
  $isListNode,
  insertList,
  ListItemNode,
  ListNode,
  ListType,
  removeList,
  SerializedListItemNode,
  SerializedListNode,
};

export const INSERT_UNORDERED_LIST_COMMAND: LexicalCommand<void> = createCommand("INSERT_UNORDERED_LIST_COMMAND");
export const INSERT_ORDERED_LIST_COMMAND: LexicalCommand<void> = createCommand("INSERT_ORDERED_LIST_COMMAND");
export const INSERT_CHECK_LIST_COMMAND: LexicalCommand<void> = createCommand("INSERT_CHECK_LIST_COMMAND");
export const REMOVE_LIST_COMMAND: LexicalCommand<void> = createCommand("REMOVE_LIST_COMMAND");
