import { useLexicalComposerContext } from "features/editor";
import { DRAG_DROP_PASTE } from "features/editor";
import { isMimeType, mediaFileReader } from "features/editor";
import { COMMAND_PRIORITY_LOW } from "features/editor";
import { useEffect } from "react";

import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin";

const ACCEPTABLE_IMAGE_TYPES = [
  "image/",
  "image/heic",
  "image/heif",
  "image/gif",
  "image/webp",
];

export function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x)
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
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);
  return null;
}