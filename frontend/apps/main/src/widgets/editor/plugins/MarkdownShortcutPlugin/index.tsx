/** @jsxImportSource react */

import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
const { MarkdownShortcutPlugin } = LexicalMarkdownShortcutPlugin;
import * as React from "react";

import { PLAYGROUND_TRANSFORMERS } from "../MarkdownTransformers";

export default function MarkdownPlugin(): JSX.Element {
  return <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />;
}
