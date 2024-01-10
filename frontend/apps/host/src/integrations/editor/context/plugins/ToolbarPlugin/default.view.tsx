import { $isCodeNode, CODE_LANGUAGE_MAP } from "features/editor";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "features/editor";
import { $isListNode, ListNode } from "features/editor";

import { $isHeadingNode } from "features/editor";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "features/editor";
import { $isTableNode } from "features/editor";
import { $findMatchingParent, $getNearestNodeOfType } from "features/editor";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "features/editor";
import { useCallback, useEffect, useState } from "react";

import { getSelectedNode } from "shared/utils";
import { blockTypeToBlockName } from "./constants";

import { QuoteButton } from "./buttons";

import {
  ImagesDropDown,
  HeadingDropDown,
  DropdownColorPicker,
  FontDropDown,
  ListsDropDown,
  OtherToolsDropdown,
  SocialMediaDropDown,
  FormattingToolsDropdown,
} from "./dropdowns";

const SUPPORTED_URL_PROTOCOLS = new Set([
  "http:",
  "https:",
  "mailto:",
  "sms:",
  "tel:",
]);
function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank";
    }
  } catch {
    return url;
  }
  return url;
}

export const DefaultView = ({
  isEditable,
  editor,
  activeEditor,
  showModal,
  rootType,
  setRootType,
  setActiveEditor,
  setSelectedElementKey,
  setCodeLanguage,
  setBlockType,
  blockType,
}) => {
  const [fontSize, setFontSize] = useState<string>("15px");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );
  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
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

      // Update text format
      // setIsBold(selection.hasFormat("bold"));
      // setIsItalic(selection.hasFormat("italic"));
      // setIsUnderline(selection.hasFormat("underline"));
      // setIsStrikethrough(selection.hasFormat("strikethrough"));
      // setIsSubscript(selection.hasFormat("subscript"));
      // setIsSuperscript(selection.hasFormat("superscript"));
      // setIsCode(selection.hasFormat("code"));
      // setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType("table");
      } else {
        setRootType("root");
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
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
      }
      // Handle buttons
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
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

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          return activeEditor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl("https://")
          );
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink]);
  return (
    <>
      <FontDropDown
        disabled={!isEditable}
        style={"font-family"}
        value={fontFamily}
        editor={editor}
      />
      <FontDropDown
        disabled={!isEditable}
        style={"font-size"}
        value={fontSize}
        editor={editor}
      />

      <ListsDropDown
        disabled={!isEditable}
        blockType={blockType}
        editor={editor}
      />
      <HeadingDropDown
        disabled={!isEditable}
        blockType={blockType}
        editor={editor}
      />
      <QuoteButton
        disabled={!isEditable}
        blockType={blockType}
        editor={editor}
      />
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting text color"
        buttonIconClassName="icon font-color"
        color={fontColor}
        onChange={onFontColorSelect}
        title="text color"
      />
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting background color"
        buttonIconClassName="icon bg-color"
        color={bgColor}
        onChange={onBgColorSelect}
        title="bg color"
      />
      <ImagesDropDown activeEditor={activeEditor} showModal={showModal} />
      <SocialMediaDropDown activeEditor={activeEditor} />
      <OtherToolsDropdown
        activeEditor={activeEditor}
        editor={editor}
        showModal={showModal}
      />
      <FormattingToolsDropdown activeEditor={activeEditor} />
    </>
  );
};
