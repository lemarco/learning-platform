/** @jsxImportSource react */

import "./ContentEditable.css";

import { ContentEditable } from "../../editor/lib/lexical-react/LexicalContentEditable";
import * as React from "react";

export default function LexicalContentEditable({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <ContentEditable className={className || "ContentEditable__root"} />;
}
