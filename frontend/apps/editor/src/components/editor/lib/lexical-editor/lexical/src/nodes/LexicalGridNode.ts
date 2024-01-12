import type { LexicalNode } from "../LexicalNode";

import { ElementNode } from "./LexicalElementNode";

export class DEPRECATED_GridNode extends ElementNode {}

export function DEPRECATED_$isGridNode(node: LexicalNode | null | undefined): node is DEPRECATED_GridNode {
  return node instanceof DEPRECATED_GridNode;
}
