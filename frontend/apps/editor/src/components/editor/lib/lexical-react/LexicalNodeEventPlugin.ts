import type { Klass, LexicalEditor, LexicalNode, NodeKey } from "../lexical-editor";

import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $findMatchingParent } from "../lexical-editor";
import { $getNearestNodeFromDOMNode } from "../lexical-editor";
import { useEffect, useRef } from "react";

const capturedEvents = new Set<string>(["mouseenter", "mouseleave"]);

export function NodeEventPlugin({
  nodeType,
  eventType,
  eventListener,
}: {
  nodeType: Klass<LexicalNode>;
  eventType: string;
  eventListener: (event: Event, editor: LexicalEditor, nodeKey: NodeKey) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const listenerRef = useRef(eventListener);

  listenerRef.current = eventListener;

  useEffect(() => {
    const isCaptured = capturedEvents.has(eventType);

    const onEvent = (event: Event) => {
      editor.update(() => {
        const nearestNode = $getNearestNodeFromDOMNode(event.target as Element);
        if (nearestNode !== null) {
          const targetNode = isCaptured
            ? nearestNode instanceof nodeType
              ? nearestNode
              : null
            : $findMatchingParent(nearestNode, (node) => node instanceof nodeType);
          if (targetNode !== null) {
            listenerRef.current(event, editor, targetNode.getKey());
            return;
          }
        }
      });
    };

    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (rootElement) {
        rootElement.addEventListener(eventType, onEvent, isCaptured);
      }

      if (prevRootElement) {
        prevRootElement.removeEventListener(eventType, onEvent, isCaptured);
      }
    });
    // We intentionally don't respect changes to eventType.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, nodeType]);

  return null;
}
