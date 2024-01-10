import type { EditorNode } from "./editor";

import { ElementNode } from "./element";

export class DEPRECATED_GridNode extends ElementNode {}

export function DEPRECATED_$isGridNode(
  node: EditorNode | null | undefined
): node is DEPRECATED_GridNode {
  return node instanceof DEPRECATED_GridNode;
}
