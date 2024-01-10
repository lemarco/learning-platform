import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "features/editor";

import { $isHeadingNode } from "features/editor";
import { $findMatchingParent } from "features/editor";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "features/editor";
import { useCallback, useEffect } from "react";

import { blockTypeToBlockName } from "./constants";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { dropDownActiveClass } from "./utils";

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}
const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

interface CodeViewProps {
  isEditable: boolean;
  codeLanguage;
  activeEditor;
  selectedElementKey;
  setBlockType;
  setCodeLanguage;
  setSelectedElementKey;
  setActiveEditor;
  editor;
}
export const CodeView = ({
  isEditable,
  codeLanguage,
  setCodeLanguage,
  activeEditor,
  selectedElementKey,
  setBlockType,
  setSelectedElementKey,
  setActiveEditor,
  editor,
}: CodeViewProps) => {
  console.log("codeLanguage , ", codeLanguage);
  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          console.log("onCodeLanguageSelect ", node);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
            setCodeLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    const anchorNode = selection.anchor.getNode();
    let element =
      anchorNode.getKey() === "root"
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }

    const elementKey = element.getKey();
    const elementDOM = activeEditor.getElementByKey(elementKey);

    if (elementDOM !== null) {
      setSelectedElementKey(elementKey);

      const type = $isHeadingNode(element)
        ? element.getTag()
        : element.getType();
      if (type in blockTypeToBlockName) {
        setBlockType(type as keyof typeof blockTypeToBlockName);
      }
      if ($isCodeNode(element)) {
        const language =
          element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
        setCodeLanguage(
          language ? CODE_LANGUAGE_MAP[language] || language : ""
        );
        return;
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={!isEditable} className="mr-2" asChild>
        {getLanguageFriendlyName(codeLanguage)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
          return (
            <DropdownMenuItem
              className={`item ${dropDownActiveClass(value === codeLanguage)}`}
              onClick={() => onCodeLanguageSelect(value)}
              key={value}
            >
              <span className="text">{name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
