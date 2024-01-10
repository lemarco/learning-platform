import { useLexicalComposerContext } from "../";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
} from "../";
import { useLayoutEffectImpl } from "shared/utils";

type Props = Readonly<{
  onClear?: () => void;
}>;

export function ClearEditorPlugin({ onClear }: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffectImpl(() => {
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
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, onClear]);

  return null;
}
