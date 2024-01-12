import { useLexicalComposerContext } from "./LexicalComposerContext";
import { $createParagraphNode, $getRoot, $getSelection, CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_EDITOR } from "@frontend/lexical-editor";
import { useLayoutEffectImpl as useLayoutEffect } from "@frontend/lexical-editor";

type Props = Readonly<{
  onClear?: () => void;
}>;

export function ClearEditorPlugin({ onClear }: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    return editor.registerCommand(
      CLEAR_EDITOR_COMMAND,
      (payload) => {
        editor.update(() => {
          if (onClear == null) {
            const root = $getRoot();
            const selection = $getSelection();
            const paragraph = $createParagraphNode();
            root.clear();
            root.append(paragraph);

            if (selection !== null) {
              paragraph.select();
            }
          } else {
            onClear();
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor, onClear]);

  return null;
}
