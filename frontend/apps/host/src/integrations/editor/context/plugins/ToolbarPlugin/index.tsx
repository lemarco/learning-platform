import type { NodeKey } from "features/editor";
import { useLexicalComposerContext } from "features/editor";
import { DetailedHTMLProps, HtmlHTMLAttributes, useState } from "react";
import { blockTypeToBlockName, rootTypeToRootName } from "./constants";
import { useModal } from "../../hooks";
import { Divider } from "./buttons/divider";
import { AlignDropDown } from "./dropdowns/align.dropdown";
import { CodeView } from "./code.view";
import { DefaultView } from "./default.view";
import { ModeButton } from "./buttons/mode.button";
import { Button } from "ui";

interface ToolbarPluginProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  sendState: () => void;
}

export function ToolbarPlugin({
  className,
  sendState,
}: ToolbarPluginProps): JSX.Element {
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [modal, showModal] = useModal();
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [rootType, setRootType] =
    useState<keyof typeof rootTypeToRootName>("root");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );

  const [isEditable] = useState(() => editor.isEditable());

  return (
    <div className={className}>
      <Divider />
      <Button onClick={sendState}>Save</Button>
      <ModeButton
        editor={editor}
        blockType={blockType as unknown as keyof typeof blockTypeToBlockName}
      />
      <Divider />
      {blockType === "code" ? (
        <CodeView
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          isEditable={isEditable}
          selectedElementKey={selectedElementKey}
          codeLanguage={codeLanguage}
          setBlockType={setBlockType}
          setCodeLanguage={setCodeLanguage}
          setSelectedElementKey={setSelectedElementKey}
        />
      ) : (
        <DefaultView
          blockType={blockType}
          editor={editor}
          activeEditor={activeEditor}
          showModal={showModal}
          isEditable={isEditable}
          setRootType={setRootType}
          rootType={rootType}
          setActiveEditor={setActiveEditor}
          setSelectedElementKey={setSelectedElementKey}
          setCodeLanguage={setCodeLanguage}
          setBlockType={setBlockType}
        />
      )}
      <Divider />
      <AlignDropDown
        editor={editor}
        setActiveEditor={setActiveEditor}
        isEditable={isEditable}
        activeEditor={activeEditor}
      />
      {modal}
    </div>
  );
}
