"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import * as React from "react";
import Editor from "./Editor";
import { SettingsContext } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import "./index.css";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

export function EditorApp(): JSX.Element {
  const initialConfig = {
    editorState: undefined,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };
  if (typeof document !== "undefined") {
    return (
      <SettingsContext>
        <LexicalComposer initialConfig={initialConfig}>
          <SharedHistoryContext>
            <TableContext>
              <SharedAutocompleteContext>
                <div className="editor-shell">
                  <Editor />
                </div>
              </SharedAutocompleteContext>
            </TableContext>
          </SharedHistoryContext>
        </LexicalComposer>
      </SettingsContext>
    );
  }
  return <></>;
}
