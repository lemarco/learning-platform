import type { ElementFormatType, NodeKey } from "../";

import { useLexicalComposerContext } from "../";
import { $isDecoratorBlockNode } from "../";
import { useEditorNodeSelection } from "../";
import { $getNearestBlockElementAncestorOrThrow, mergeRegister } from "../";
import {
  $getNodeByKey,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from "../";

import { ReactNode, useCallback, useEffect, useRef } from "react";

type Props = Readonly<{
  children: ReactNode;
  format?: ElementFormatType | null;
  nodeKey: NodeKey;
  className: Readonly<{
    base: string;
    focus: string;
  }>;
}>;

export function BlockWithAlignableContents({
  children,
  format,
  nodeKey,
  className,
}: Props): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const [isSelected, setSelected, clearSelection] =
    useEditorNodeSelection(nodeKey);
  const ref = useRef(null);

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isDecoratorNode(node)) {
          node.remove();
        }
      }

      return false;
    },
    [isSelected, nodeKey]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<ElementFormatType>(
        FORMAT_ELEMENT_COMMAND,
        (formatType) => {
          if (isSelected) {
            const selection = $getSelection();

            if ($isNodeSelection(selection)) {
              const node = $getNodeByKey(nodeKey);

              if ($isDecoratorBlockNode(node)) {
                node.setFormat(formatType);
              }
            } else if ($isRangeSelection(selection)) {
              const nodes = selection.getNodes();

              for (const node of nodes) {
                if ($isDecoratorBlockNode(node)) {
                  node.setFormat(formatType);
                } else {
                  const element = $getNearestBlockElementAncestorOrThrow(node);
                  element.setFormat(formatType);
                }
              }
            }

            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (event.target === ref.current) {
            event.preventDefault();
            if (!event.shiftKey) {
              clearSelection();
            }

            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

  return (
    <div
      className={[className.base, isSelected ? className.focus : null]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      style={{
        textAlign: format ? format : undefined,
      }}
    >
      {children}
    </div>
  );
}
