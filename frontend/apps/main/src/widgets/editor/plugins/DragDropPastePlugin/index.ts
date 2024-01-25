/** @jsxImportSource react */

import LexicalComposerContext from "@lexical/react/LexicalComposerContext";
const { useLexicalComposerContext } = LexicalComposerContext;
import LexRichText from "@lexical/rich-text";
const { DRAG_DROP_PASTE } = LexRichText;
import LexUtils from "@lexical/utils";
const { isMimeType, mediaFileReader } = LexUtils;
import Lex from "lexical";
const { COMMAND_PRIORITY_LOW } = Lex;
import { useEffect } from "react";

import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin";

const ACCEPTABLE_IMAGE_TYPES = ["image/", "image/heic", "image/heif", "image/gif", "image/webp"];

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          );
          for (const { file, result } of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: result,
              });
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}
