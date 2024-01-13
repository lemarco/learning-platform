/** @jsxImportSource react */
import { LexicalComposer } from "./lib/lexical-react";
import { qwikify$ } from "@builder.io/qwik-react";
import Editor from "./Editor";
import { SettingsContext } from "./context/SettingsContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";

import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.",
);

function App(): JSX.Element {
  const initialConfig = {
    editorState: undefined,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <div className="editor-shell">
            <Editor />
          </div>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
// auth in different microfrontends
// granularity events
//

export const Editors = qwikify$(
  () => (
    <SettingsContext>
      {" "}
      <App />
    </SettingsContext>
  ),
  { eagerness: "hover" },
);
