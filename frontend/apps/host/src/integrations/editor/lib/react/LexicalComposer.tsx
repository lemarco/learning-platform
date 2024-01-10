import type { LexicalComposerContextType } from "../";

import { createLexicalComposerContext, LexicalComposerContext } from "../";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  createEditor,
  EditorState,
  EditorThemeClasses,
  Klass,
  LexicalEditor,
  EditorNode,
} from "../";
import { useMemo } from "react";

import { CAN_USE_DOM } from "shared/utils";
import { useLayoutEffectImpl as useLayoutEffect } from "shared/utils";

const HISTORY_MERGE_OPTIONS = { tag: "history-merge" };

export type InitialEditorStateType =
  | null
  | string
  | EditorState
  | ((editor: LexicalEditor) => void);

export type InitialConfigType = Readonly<{
  editor__DEPRECATED?: LexicalEditor | null;
  namespace: string;
  nodes?: ReadonlyArray<
    | Klass<EditorNode>
    | {
        replace: Klass<EditorNode>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        with: <T extends { new (...args: any): any }>(
          node: InstanceType<T>
        ) => EditorNode;
      }
  >;
  onError: (error: Error, editor: LexicalEditor) => void;
  editable?: boolean;
  theme?: EditorThemeClasses;
  editorState?: InitialEditorStateType;
}>;

type Props = {
  children: JSX.Element | string | (JSX.Element | string)[];
  initialConfig: InitialConfigType;
};

export function LexicalComposer({
  initialConfig,
  children,
}: Props): JSX.Element {
  const composerContext: [LexicalEditor, LexicalComposerContextType] = useMemo(
    () => {
      const {
        theme,
        namespace,
        editor__DEPRECATED: initialEditor,
        nodes,
        onError,
        editorState: initialEditorState,
      } = initialConfig;

      const context: LexicalComposerContextType = createLexicalComposerContext(
        null,
        theme
      );

      let editor = initialEditor || null;

      if (editor === null) {
        const newEditor = createEditor({
          editable: initialConfig.editable,
          namespace,
          nodes,
          onError: (error) => onError(error, newEditor),
          theme,
        });
        initializeEditor(newEditor, initialEditorState);

        editor = newEditor;
      }

      return [editor, context];
    },

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    const isEditable = initialConfig.editable;
    const [editor] = composerContext;
    editor.setEditable(isEditable !== undefined ? isEditable : true);

    // We only do this for init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LexicalComposerContext.Provider value={composerContext}>
      {children}
    </LexicalComposerContext.Provider>
  );
}

function initializeEditor(
  editor: LexicalEditor,
  initialEditorState?: InitialEditorStateType
): void {
  if (initialEditorState === null) {
    return;
  } else if (initialEditorState === undefined) {
    editor.update(() => {
      const root = $getRoot();
      if (root.isEmpty()) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        const activeElement = CAN_USE_DOM ? document.activeElement : null;
        if (
          $getSelection() !== null ||
          (activeElement !== null && activeElement === editor.getRootElement())
        ) {
          paragraph.select();
        }
      }
    }, HISTORY_MERGE_OPTIONS);
  } else if (initialEditorState !== null) {
    switch (typeof initialEditorState) {
      case "string": {
        const parsedEditorState = editor.parseEditorState(initialEditorState);
        editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case "object": {
        editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
        break;
      }
      case "function": {
        editor.update(() => {
          const root = $getRoot();
          if (root.isEmpty()) {
            initialEditorState(editor);
          }
        }, HISTORY_MERGE_OPTIONS);
        break;
      }
    }
  }
}
