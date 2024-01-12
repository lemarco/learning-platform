/** @jsxImportSource react */

import { LinkPlugin as LexicalLinkPlugin } from "@frontend/lexical-react";
import * as React from "react";

import { validateUrl } from "../../utils/url";

export default function LinkPlugin(): JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
