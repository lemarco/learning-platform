/** @jsxImportSource react */

import { MarkdownShortcutPlugin } from "../../lib/lexical-react";
import * as React from "react";

import { PLAYGROUND_TRANSFORMERS } from "../MarkdownTransformers";

export default function MarkdownPlugin(): JSX.Element {
  return <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />;
}
