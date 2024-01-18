import { component$, useContext, useStore, createContextId, useContextProvider } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Editor } from "../components/editor";

export const LexicalComposerContext = createContextId<{ items: string[] }>("LexicalComposerContext");
export const TableContext = createContextId<{ items: string[] }>("TableContext");
export default component$(() => {
  const initialConfig = {
    editorState: undefined,
    namespace: "Editor",
    // nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    // theme: PlaygroundEditorTheme,
  };
  useContextProvider(
    LexicalComposerContext,
    useStore({
      items: ["Learn Qwik", "Build Qwik app", "Profit"],
    }),
  );
  useContextProvider(
    TableContext,
    useStore({
      items: ["Learn Qwik", "Build Qwik app", "Profit"],
    }),
  );

  return (
    <div class="editor-shell">
      <Editor />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import Editor from "./Editor";
// import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
// import { SharedHistoryContext } from "./context/SharedHistoryContext";
// import PlaygroundNodes from "./nodes/PlaygroundNodes";
// import { TableContext } from "./plugins/TablePlugin";
// import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

// function App(): JSX.Element {
//   const initialConfig = {
//     editorState: undefined,
//     namespace: "Playground",
//     nodes: [...PlaygroundNodes],
//     onError: (error: Error) => {
//       throw error;
//     },
//     theme: PlaygroundEditorTheme,
//   };

//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <SharedHistoryContext>
//         <TableContext>
//           <SharedAutocompleteContext>
//             <div className="editor-shell">
//               <Editor />
//             </div>
//           </SharedAutocompleteContext>
//         </TableContext>
//       </SharedHistoryContext>
//     </LexicalComposer>
//   );
// }
