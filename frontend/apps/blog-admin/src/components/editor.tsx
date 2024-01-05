import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  KitchenSinkToolbar,
  ListsToggle,
  MDXEditor,
  Separator,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  setMarkdown$,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  markdown$,
  readOnly$,
  viewMode$,
  useCellValues,
  rootEditor$,
  markdownSourceEditorValue$,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";
async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}
export function Editor() {
  const state = "# Hello worldsdfsdfdsfasd";
  //   const [markdown] = useCellValues([markdown$, rootEditor$ as any] as any);
  //   const [state, setState] = useState();

  //   console.log("state= ", state);
  setInterval(() => {
    console.log("render", markdownSourceEditorValue$.toString());
  }, 1000);
  return (
    <MDXEditor
      markdown={state}
      contentEditableClassName="prose"
      className="bg-white"
      //   onChange={(curr) => {
      //     setState(curr);
      //   }}
      //   toMarkdownOptions={}
      //   ref={state}

      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),

        linkDialogPlugin(),

        linkPlugin(),

        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),

        codeMirrorPlugin({ codeBlockLanguages: { js: "JavaScript", css: "CSS", txt: "text", tsx: "TypeScript" } }),

        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />

              <InsertImage />
              <Separator />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <InsertFrontmatter />
              <InsertTable />
              <InsertThematicBreak />
              <InsertCodeBlock />

              <ListsToggle />
            </>
          ),
        }),
      ]}
    />
  );
}
