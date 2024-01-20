// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import useLexicalEditable from "@lexical/react/useLexicalEditable";
// import * as React from "react";

// import { useCanShowPlaceholder } from "./shared/useCanShowPlaceholder";
// import { ErrorBoundaryType, useDecorators } from "./shared/useDecorators";
// import { useRichTextSetup } from "./shared/useRichTextSetup";
import { Slot, component$, useContext, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { LexicalEditor } from "lexical";
import { LexicalComposerContext } from "..";

// import { registerDragonSupport } from "@lexical/dragon";
import { registerRichText } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
// import useLayoutEffect from "shared/useLayoutEffect";

// export function useRichTextSetup(editor: LexicalEditor): void {
//   useLayoutEffect(() => {
//     return mergeRegister(registerRichText(editor), registerDragonSupport(editor));

//     // We only do this for init
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [editor]);
// }

// export function useDecorators(editor: LexicalEditor) {
//   const store = useStore<{ decorators: Record<string, any> }>({ decorators: editor.getDecorators<any>() });

//   // Subscribe to changes
//   //   useLayoutEffect(() => {
//   //     return editor.registerDecoratorListener<JSX.Element>((nextDecorators) => {
//   //       flushSync(() => {
//   //         setDecorators(nextDecorators);
//   //       });
//   //     });
//   //   }, [editor]);

//   useVisibleTask$(() => {
//     editor.registerDecoratorListener<any>((nextDecorators) => {
//       store.decorators = nextDecorators;
//       //   setDecorators(nextDecorators);
//     });
//   });

//   //   useEffect(() => {
//   //     // If the content editable mounts before the subscription is added, then
//   //     // nothing will be rendered on initial pass. We can get around that by
//   //     // ensuring that we set the value.
//   //     setDecorators(editor.getDecorators());
//   //   }, [editor]);

//   // Return decorators defined as React Portals
//   return useMemo(() => {
//     const decoratedPortals = [];
//     const decoratorKeys = Object.keys(decorators);

//     for (let i = 0; i < decoratorKeys.length; i++) {
//       const nodeKey = decoratorKeys[i];
//       const reactDecorator = (
//         <ErrorBoundary onError={(e) => editor._onError(e)}>
//           <Suspense fallback={null}>{decorators[nodeKey]}</Suspense>
//         </ErrorBoundary>
//       );
//       const element = editor.getElementByKey(nodeKey);

//       if (element !== null) {
//         decoratedPortals.push(createPortal(reactDecorator, element, nodeKey));
//       }
//     }

//     return decoratedPortals;
//   }, [ErrorBoundary, decorators, editor]);
// }

// useLayoutEffect(() => {
//     return mergeRegister(registerRichText(editor), registerDragonSupport(editor));

//     // We only do this for init
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [editor]);
export const RichTextPlugin = component$(() => {
  const { editor } = useContext(LexicalComposerContext);

  //   useVisibleTask$(() => {
  //     console.log(editor);
  //   });

  //   if (!editor) {
  //     console.log("NO CTX EDITOR");
  //   }
  const store = useStore<{ decorators: Record<string, any> }>({ decorators: editor?.getDecorators<any>() });

  useVisibleTask$(
    () => {
      //   console.log(editor);
      editor?.registerDecoratorListener<any>((nextDecorators) => {
        store.decorators = nextDecorators;
        //   setDecorators(nextDecorators);
      });
      registerRichText(editor as any);
    },
    { strategy: "document-ready" },
  );
  //   const decorators = useDecorators(editor, ErrorBoundary);
  //   useRichTextSetup(editor);

  return (
    <>
      <Slot />

      {/* {decorators} */}
    </>
  );
});

// function Placeholder({
//   content,
// }: {
//   content: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element;
// }) {
//   const [editor] = useLexicalComposerContext();
//   const showPlaceholder = useCanShowPlaceholder(editor);
//   const editable = useLexicalEditable();

//   if (!showPlaceholder) {
//     return null;
//   }

//   if (typeof content === "function") {
//     return content(editable);
//   } else {
//     return content;
//   }
// }
