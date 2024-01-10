import type { EditorNode } from "./editor";

import { ElementNode } from "./element";

export class DEPRECATED_GridRowNode extends ElementNode {}

export function DEPRECATED_$isGridRowNode(
  node: EditorNode | null | undefined
): node is DEPRECATED_GridRowNode {
  return node instanceof DEPRECATED_GridRowNode;
}
