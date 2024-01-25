/** @jsxImportSource react */

import LexLexicalLinkPlugin from "@lexical/react/LexicalLinkPlugin";
const { LinkPlugin: LLP } = LexLexicalLinkPlugin;

import { validateUrl } from "../../utils/url";

export default function LinkPlugin(): JSX.Element {
  return <LLP validateUrl={validateUrl} />;
}
