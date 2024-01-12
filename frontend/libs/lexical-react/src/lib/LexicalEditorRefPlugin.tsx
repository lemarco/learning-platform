import { useLexicalComposerContext } from "./LexicalComposerContext";
import { LexicalEditor } from "@frontend/lexical-editor";
import { MutableRefObject } from "react";
import * as React from "react";

/**
 *
 * Use this plugin to access the editor instance outside of the
 * LexicalComposer. This can help with things like buttons or other
 * UI components that need to update or read EditorState but need to
 * be positioned outside the LexicalComposer in the React tree.
 */
export function EditorRefPlugin({
  editorRef,
}: {
  editorRef: React.RefCallback<LexicalEditor> | MutableRefObject<LexicalEditor | null | undefined>;
}): null {
  const [editor] = useLexicalComposerContext();
  if (typeof editorRef === "function") {
    editorRef(editor);
  } else if (typeof editorRef === "object") {
    editorRef.current = editor;
  }
  return null;
}
