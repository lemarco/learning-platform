/** @jsxImportSource react */

import type { Klass, LexicalNode } from "../lib/lexical-editor";

import { CodeHighlightNode, CodeNode } from "../lib/lexical-editor";
import { HashtagNode } from "../lib/lexical-editor";
import { AutoLinkNode, LinkNode } from "../lib/lexical-editor";
import { ListItemNode, ListNode } from "../lib/lexical-editor";
import { MarkNode } from "../lib/lexical-editor";
import { OverflowNode } from "../lib/lexical-editor";
import { HorizontalRuleNode } from "../lib/lexical-react";
import { HeadingNode, QuoteNode } from "../lib/lexical-editor";
import { TableCellNode, TableNode, TableRowNode } from "../lib/lexical-editor";

import { CollapsibleContainerNode } from "../plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode } from "../plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode } from "../plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { AutocompleteNode } from "./AutocompleteNode";
import { EmojiNode } from "./EmojiNode";
import { EquationNode } from "./EquationNode";
import { ExcalidrawNode } from "./ExcalidrawNode";
import { FigmaNode } from "./FigmaNode";
import { ImageNode } from "./ImageNode";
import { InlineImageNode } from "./InlineImageNode";
import { KeywordNode } from "./KeywordNode";
import { LayoutContainerNode } from "./LayoutContainerNode";
import { LayoutItemNode } from "./LayoutItemNode";
import { MentionNode } from "./MentionNode";
import { PageBreakNode } from "./PageBreakNode";
import { PollNode } from "./PollNode";
import { StickyNode } from "./StickyNode";
import { TweetNode } from "./TweetNode";
import { YouTubeNode } from "./YouTubeNode";

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  PollNode,
  StickyNode,
  ImageNode,
  InlineImageNode,
  MentionNode,
  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  AutocompleteNode,
  KeywordNode,
  HorizontalRuleNode,
  TweetNode,
  YouTubeNode,
  FigmaNode,
  MarkNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  PageBreakNode,
  LayoutContainerNode,
  LayoutItemNode,
];

export default PlaygroundNodes;
