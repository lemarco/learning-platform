import { component$, useStore, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { qwikify$ } from "@builder.io/qwik-react";
// import Editor from "@toast-ui/editor";

// import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from "lexical";
// // import stylesE from "@toast-ui/editor/dist/toastui-editor-viewer.css?inline";
// import { createEditor, LineBreakNode, ParagraphNode, TextNode } from "lexical";
// import { registerPlainText } from "@lexical/plain-text";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { LinkNode, AutoLinkNode } from "@lexical/link";
// import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
// import { OverflowNode } from "@lexical/overflow";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { MarkNode } from "@lexical/mark";
// import { HashtagNode } from "@lexical/hashtag";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";
// import { registerMarkdownShortcuts, TRANSFORMERS, $convertToMarkdownString } from "@lexical/markdown";
// import { ElementNode } from "lexical";
// import { theme } from "./theme";
// export class Placeholder extends ElementNode {
//   static getType() {
//     return "placeholder";
//   }

//   static clone(node) {
//     return new Placeholder(node.__key);
//   }

//   createDOM() {
//     const dom = document.createElement("div");
//     return dom;
//   }

//   updateDOM(prevNode, dom) {
//     return false;
//   }
// }

// export function $createPlaceholderNode() {
//   return new Placeholder();
// }

// export function $isPlaceholderNode(node) {
//   return node instanceof Placeholder;
// }
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from "@mdxeditor/editor";
import { QEditor } from "../../../integrations/editor/editor";
export default component$(() => {
  const content = "asdojksa;lfdjas;ldfj";
  const state = useStore({ editor: undefined, viewer: undefined });
  // useStyles$(stylesE);
  useVisibleTask$(() => {
    // const {
    //   settings: { emptyEditor },
    // } = useSettings();
    //   const initialConfig = {
    //     editorState: emptyEditor,
    //     namespace: "Playground",
    //     nodes: [...PlaygroundNodes],
    //     onError: (error: Error) => {
    //       throw error;
    //     },
    //     theme,
    //   };
    // });
  });
  return <div class="h-[800px]">{<QEditor />}</div>;
});

export const head: DocumentHead = {
  title: "editor",
  meta: [
    {
      name: "description",
      content: "Editor",
    },
  ],
};
