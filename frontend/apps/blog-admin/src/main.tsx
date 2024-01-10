import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Layout } from "./layout";
import { BlogListPage } from "./pages/blog/list";
import { BlogNewArticlePage } from "./pages/blog/new";
import { DashboardPage } from "./pages/dashboard";
import { UsersListPage } from "./pages/users/list";
import { UsersSettingsPage } from "./pages/users/settings";

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
  markdown$,
  markdownShortcutPlugin,
  markdownSourceEditorValue$,
  quotePlugin,
  readOnly$,
  rootEditor$,
  setMarkdown$,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  useCellValues,
  viewMode$,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Label, TextInput } from "flowbite-react";
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

  const [md, setMd] = useState("");

  // setInterval(() => {
  //   console.log("render", markdownSourceEditorValue$.toString());
  // }, 1000);
  return (
    <MDXEditor
      markdown={state}
      contentEditableClassName="prose"
      className="bg-white relative shadow-md sm:rounded-lg overflow-hidden min-h-[800px]"
      onChange={(curr) => {
        setMd(curr);
      }}
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

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(<Editor />);
