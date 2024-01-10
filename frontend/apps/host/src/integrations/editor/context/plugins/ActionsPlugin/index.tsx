/** @jsxImportSource react */
import type { LexicalEditor } from "../../../../editor";

import { $createCodeNode, $isCodeNode } from "../../../../editor";
import { exportFile, importFile } from "../../../../editor";
// import {
//   $convertFromMarkdownString,
//   $convertToMarkdownString,
// } from "features/editor";

import { useLexicalComposerContext } from "../../../../editor";
// import { mergeRegister } from "features/editor";
// import { CONNECTED_COMMAND, TOGGLE_CONNECT_COMMAND } from "features/editor";
import { $createTextNode, $getRoot, $isParagraphNode, CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_EDITOR } from "../../../../editor";

import { useCallback, useEffect, useState } from "react";

import { useModal } from "../../../hooks/";
import { Button } from "ui";
// import { PLAYGROUND_TRANSFORMERS } from "../MarkdownTransformers";

async function sendEditorState(editor: LexicalEditor): Promise<void> {
  const stringifiedEditorState = JSON.stringify(editor.getEditorState());
  try {
    await fetch("http://localhost:1235/setEditorState", {
      body: stringifiedEditorState,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
    });
  } catch {
    // NO-OP
  }
}

async function validateEditorState(editor: LexicalEditor): Promise<void> {
  const stringifiedEditorState = JSON.stringify(editor.getEditorState());
  let response = null;
  try {
    response = await fetch("http://localhost:1235/validateEditorState", {
      body: stringifiedEditorState,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
    });
  } catch {
    // NO-OP
  }
  if (response !== null && response.status === 403) {
    throw new Error("Editor state validation failed! Server did not accept changes.");
  }
}

export function ActionsPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const [connected, setConnected] = useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [modal, showModal] = useModal();

  // useEffect(() => {
  //   return mergeRegister(
  //     editor.registerEditableListener((editable) => {
  //       setIsEditable(editable);
  //     }),
  //     editor.registerCommand<boolean>(
  //       CONNECTED_COMMAND,
  //       (payload) => {
  //         const isConnected = payload;
  //         setConnected(isConnected);
  //         return false;
  //       },
  //       COMMAND_PRIORITY_EDITOR
  //     )
  //   );
  // }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ dirtyElements, prevEditorState, tags }) => {
      // If we are in read only mode, send the editor state
      // to server and ask for validation if possible.
      if (!isEditable && dirtyElements.size > 0 && !tags.has("historic") && !tags.has("collaboration")) {
        validateEditorState(editor);
      }
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const children = root.getChildren();

        if (children.length > 1) {
          setIsEditorEmpty(false);
        } else {
          if ($isParagraphNode(children[0])) {
            const paragraphChildren = children[0].getChildren();
            setIsEditorEmpty(paragraphChildren.length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        }
      });
    });
  }, [editor, isEditable]);

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      // if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
      //   $convertFromMarkdownString(
      //     firstChild.getTextContent(),
      //     PLAYGROUND_TRANSFORMERS
      //   );
      // } else {
      //   const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      //   root
      //     .clear()
      //     .append(
      //       $createCodeNode("markdown").append($createTextNode(markdown))
      //     );
      // }
      root.selectEnd();
    });
  }, [editor]);

  return (
    <div className="actionsPanel">
      <button className="action-button import" onClick={() => importFile(editor)} title="Import" aria-label="Import editor state from JSON">
        <i className="import" />
      </button>
      <button
        className="action-button export"
        onClick={() =>
          exportFile(editor, {
            fileName: `Playground ${new Date().toISOString()}`,
            source: "Playground",
          })
        }
        title="Export"
        aria-label="Export editor state to JSON"
      >
        <i className="export" />
      </button>
      <button
        className="action-button clear"
        disabled={isEditorEmpty}
        onClick={() => {
          showModal("Clear editor", (onClose) => <ShowClearDialog editor={editor} onClose={onClose} />);
        }}
        title="Clear"
        aria-label="Clear editor contents"
      >
        <i className="clear" />
      </button>
      <button
        className={`action-button ${!isEditable ? "unlock" : "lock"}`}
        onClick={() => {
          // Send latest editor state to commenting validation server
          if (isEditable) {
            sendEditorState(editor);
          }
          editor.setEditable(!editor.isEditable());
        }}
        title="Read-Only Mode"
        aria-label={`${!isEditable ? "Unlock" : "Lock"} read-only mode`}
      >
        <i className={!isEditable ? "unlock" : "lock"} />
      </button>
      <button
        className="action-button"
        onClick={() => handleMarkdownToggle()}
        title="Convert From Markdown"
        aria-label="Convert from markdown"
      >
        <i className="markdown" />
      </button>
      {/* {isCollabActive && (
        <button
          className="action-button connect"
          onClick={() => {
            editor.dispatchCommand(TOGGLE_CONNECT_COMMAND, !connected);
          }}
          title={`${
            connected ? "Disconnect" : "Connect"
          } Collaborative Editing`}
          aria-label={`${
            connected ? "Disconnect from" : "Connect to"
          } a collaborative editing server`}
        >
          <i className={connected ? "disconnect" : "connect"} />
        </button>
      )} */}
      {modal}
    </div>
  );
}

function ShowClearDialog({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  return (
    <>
      Are you sure you want to clear the editor?
      <div className="Modal__content">
        <Button
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
            editor.focus();
            onClose();
          }}
        >
          Clear
        </Button>{" "}
        <Button
          onClick={() => {
            editor.focus();
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}