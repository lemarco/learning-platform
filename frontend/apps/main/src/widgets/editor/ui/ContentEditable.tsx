/** @jsxImportSource react */

import "./ContentEditable.css";

import LexLexicalContentEditable from "@lexical/react/LexicalContentEditable";
const { ContentEditable } = LexLexicalContentEditable;
import * as React from "react";

export default function LexicalContentEditable({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <ContentEditable className={className || "ContentEditable__root"} />;
}
