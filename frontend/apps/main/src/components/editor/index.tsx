import {
  $,
  NoSerialize,
  QRL,
  Signal,
  component$,
  createContextId,
  noSerialize,
  useComputed$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CAN_USE_DOM } from "../../utils/canUseDom";

import Lexical from "lexical";
import type {
  EditorState,
  EditorThemeClasses,
  HTMLConfig,
  Klass,
  KlassConstructor,
  LexicalEditor,
  LexicalNode,
  LexicalNodeReplacement,
} from "lexical";
const { $createParagraphNode, $getRoot, $getSelection, createEditor } = Lexical;
import { theme } from "~/components/editor/themes";
import invariant from "../../utils/invariant";
import { Editor } from "./Editor";
export type LexicalComposerContextType = {
  getTheme: () => EditorThemeClasses | null | undefined;
};

export const LexicalComposerContext = createContextId<{ editor: NoSerialize<LexicalEditor> }>("LexicalComposerContext");
export const TableContext = createContextId<{ items: string[] }>("TableContext");
const HISTORY_MERGE_OPTIONS = { tag: "history-merge" };
type EditorNode = KlassConstructor<typeof LexicalNode>;
type InitialEditorStateType = null | string | EditorState | ((editor: LexicalEditor) => void);
type LexicalComposerContextData = {
  namespace: string;
  nodes: EditorNode[];
  onError: QRL<(error: Error, editor: LexicalEditor) => void>;
  theme: EditorThemeClasses;
  html?: HTMLConfig;
  editorState?: InitialEditorStateType;
  editor__DEPRECATED?: LexicalEditor | null;
  editable?: boolean;
};
export type LexicalComposerContextWithEditor = [LexicalEditor, LexicalComposerContextType];
// export function useLexicalComposerContext(): [LexicalEditor, LexicalComposerContextType] {
//   const composerContext = useContext(LexicalComposerContext);

//   if (composerContext == null) {
//     invariant(false, "LexicalComposerContext.useLexicalComposerContext: cannot find a LexicalComposerContext");
//   }

//   return composerContext.value;
// }
export function createLexicalComposerContext(
  parent: LexicalComposerContextWithEditor | null | undefined,
  theme: EditorThemeClasses | null | undefined,
): LexicalComposerContextType {
  let parentContext: LexicalComposerContextType | null = null;

  if (parent != null) {
    parentContext = parent[1];
  }

  function getTheme() {
    if (theme != null) {
      return theme;
    }

    return parentContext != null ? parentContext.getTheme() : null;
  }

  return {
    getTheme,
  };
}
function initializeEditor(editor: LexicalEditor, initialEditorState?: InitialEditorStateType): void {
  if (initialEditorState === null) {
    return;
  }
  if (initialEditorState === undefined) {
    editor.update(() => {
      const root = $getRoot();
      if (root.isEmpty()) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        const activeElement = CAN_USE_DOM ? document.activeElement : null;
        if ($getSelection() !== null || (activeElement !== null && activeElement === editor.getRootElement())) {
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
export const EditorContextWrapper = component$(() => {
  // const initialConfig = {
  //   editorState: undefined,
  //   namespace: "Editor",
  //   nodes: [],
  //   onError: $((error: Error) => {
  //     throw error;
  //   }),
  //   theme: theme,
  // };
  const configState = useStore<LexicalComposerContextData>({
    editorState: undefined,
    namespace: "Editor",
    nodes: [],
    onError: $((error: Error) => {
      throw error;
    }),
    theme: theme,
  });

  const { theme: t, namespace, editor__DEPRECATED: initialEditor, nodes, onError, editorState: initialEditorState, html } = configState;

  // const context: LexicalComposerContextType = createLexicalComposerContext(null, theme);

  const editor = useStore<{ editor: NoSerialize<LexicalEditor> | null }>({ editor: null });
  useVisibleTask$(() => {
    if (!editor.editor) {
      console.log();
      const newEditor = createEditor({
        editable: configState.editable,
        html,
        namespace,
        nodes,
        onError: (error) => onError(error, newEditor),
        theme: t,
      });
      initializeEditor(newEditor, initialEditorState);
      //@ts-ignore
      editor.editor = noSerialize(newEditor);
    }
    console.log("IN INDEX= ", editor);
  });
  console.log("IN INDEX= ", editor);
  useContextProvider(LexicalComposerContext, editor);

  // const ctx = useStore<LexicalEditor>(editor);
  // const composerCtx = useComputed$<NoSerialize<[LexicalEditor, LexicalComposerContextType]>>(() => {
  //   const { theme, namespace, editor__DEPRECATED: initialEditor, nodes, onError, editorState: initialEditorState, html } = configState;

  //   const context: LexicalComposerContextType = createLexicalComposerContext(null, theme);

  //   let editor = initialEditor || null;

  //   if (editor === null) {
  //     const newEditor = createEditor({
  //       editable: configState.editable,
  //       html,
  //       namespace,
  //       nodes,
  //       onError: (error) => onError(error, newEditor),
  //       theme,
  //     });
  //     initializeEditor(newEditor, initialEditorState);

  //     editor = newEditor;
  //   }

  //   return noSerialize([editor, context]);
  // });

  // console.log(editor);
  // useContextProvider(
  //   TableContext,
  //   useStore({
  //     items: ["Learn Qwik", "Build Qwik app", "Profit"],
  //   }),
  // );
  return (
    <div class="editor-shell">
      <Editor />
    </div>
  );
});
