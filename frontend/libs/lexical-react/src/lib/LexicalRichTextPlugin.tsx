import { useLexicalComposerContext } from "./LexicalComposerContext";
import { useLexicalEditable } from "./useLexicalEditable";
import * as React from "react";

import { useCanShowPlaceholder } from "./shared/useCanShowPlaceholder";
import { ErrorBoundaryType, useDecorators } from "./shared/useDecorators";
import { useRichTextSetup } from "./shared/useRichTextSetup";

export function RichTextPlugin({
  contentEditable,
  placeholder,
  ErrorBoundary,
}: {
  contentEditable: JSX.Element;
  placeholder: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element;
  ErrorBoundary: ErrorBoundaryType;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const decorators = useDecorators(editor, ErrorBoundary);
  useRichTextSetup(editor);

  return (
    <>
      {contentEditable}
      <Placeholder content={placeholder} />
      {decorators}
    </>
  );
}

function Placeholder({
  content,
}: {
  content: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element;
}): null | JSX.Element {
  const [editor] = useLexicalComposerContext();
  const showPlaceholder = useCanShowPlaceholder(editor);
  const editable = useLexicalEditable();

  if (!showPlaceholder) {
    return null;
  }

  if (typeof content === "function") {
    return content(editable);
  } else {
    return content;
  }
}
