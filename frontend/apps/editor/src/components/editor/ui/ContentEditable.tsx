/** @jsxImportSource react */

import "./ContentEditable.css";

import * as React from "react";
import { ContentEditable } from "../../editor/lib/lexical-react/LexicalContentEditable";

export default function LexicalContentEditable({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <ContentEditable className={className || "ContentEditable__root"} />;
}
