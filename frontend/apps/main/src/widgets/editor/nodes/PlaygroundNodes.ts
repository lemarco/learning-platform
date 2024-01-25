/** @jsxImportSource react */

import type { Klass, LexicalNode } from "lexical";

import LexCode from "@lexical/code";
const { CodeHighlightNode, CodeNode } = LexCode;
import LexHahtag from "@lexical/hashtag";
const { HashtagNode } = LexHahtag;
import LexLink from "@lexical/link";
const { AutoLinkNode, LinkNode } = LexLink;
import LexList from "@lexical/list";
const { ListItemNode, ListNode } = LexList;
import LexMark from "@lexical/mark";
const { MarkNode } = LexMark;
import LexOverflow from "@lexical/overflow";
const { OverflowNode } = LexOverflow;
import LexicalHorizontalRuleNode from "@lexical/react/LexicalHorizontalRuleNode";
const { HorizontalRuleNode } = LexicalHorizontalRuleNode;
import LexRichText from "@lexical/rich-text";
const { HeadingNode, QuoteNode } = LexRichText;
import LexTable from "@lexical/table";
const { TableCellNode, TableNode, TableRowNode } = LexTable;
import { CollapsibleContainerNode } from "../plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode } from "../plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode } from "../plugins/CollapsiblePlugin/CollapsibleTitleNode";
// import { AutocompleteNode } from "./AutocompleteNode";
import { EmojiNode } from "./EmojiNode";
import { EquationNode } from "./EquationNode";

import { ImageNode } from "./ImageNode";
import { InlineImageNode } from "./InlineImageNode";
import { KeywordNode } from "./KeywordNode";

// import { MentionNode } from "./MentionNode";
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
  // MentionNode,
  EmojiNode,

  EquationNode,
  // AutocompleteNode,
  KeywordNode,
  HorizontalRuleNode,
  TweetNode,
  YouTubeNode,

  MarkNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  PageBreakNode,
];

export default PlaygroundNodes;
