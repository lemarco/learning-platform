import { CodeHighlightNode, CodeNode } from "features/editor";
import { HashtagNode } from "features/editor";
import { AutoLinkNode, LinkNode } from "features/editor";
import { ListItemNode, ListNode } from "features/editor";
import { MarkNode } from "features/editor";
import { OverflowNode } from "features/editor";
import { HorizontalRuleNode } from "features/editor";
import { HeadingNode, QuoteNode } from "features/editor";
import { TableCellNode, TableNode, TableRowNode } from "features/editor";
import { EmojiNode } from "./EmojiNode";
import { EquationNode } from "./EquationNode";
import { ExcalidrawNode } from "./ExcalidrawNode";
import { ImageNode } from "./ImageNode";
import { KeywordNode } from "./KeywordNode";

import { CollapsibleContainerNode } from "../plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode } from "../plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode } from "../plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { FigmaNode } from "./FigmaNode";
import { InlineImageNode } from "./InlineImageNode";

import { StickyNode } from "./StickyNode";
import { TableNode as NewTableNode } from "./TableNode";
import { TweetNode } from "./TweetNode";
import { YouTubeNode } from "./YouTubeNode";

export const EditorNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  NewTableNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  StickyNode,
  ImageNode,
  InlineImageNode,

  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  KeywordNode,
  HorizontalRuleNode,
  TweetNode,
  YouTubeNode,
  FigmaNode,
  MarkNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
];

export const TableCellNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  ImageNode,

  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  StickyNode,
  KeywordNode,
];

export * from "./ExcalidrawNode";

export * from "./EmojiNode";

export * from "./EquationNode";
export * from "./FigmaNode";

export * from "./ImageNode";

export * from "./InlineImageNode";
export * from "./KeywordNode";

export * from "./StickyComponent";
export * from "./StickyNode";
export * from "./TableComponent";
export * from "./TableNode";
export * from "./TweetNode";
export * from "./YouTubeNode";
