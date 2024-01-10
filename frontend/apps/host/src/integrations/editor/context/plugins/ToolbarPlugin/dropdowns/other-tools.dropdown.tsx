import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "features/editor";
import { $getRoot } from "features/editor";
import { $createStickyNode } from "../../../nodes";
import {
  INSERT_COLLAPSIBLE_COMMAND,
  InsertEquationDialog,
  INSERT_EXCALIDRAW_COMMAND,
  InsertNewTableDialog,
} from "../../";

type Props = {
  activeEditor;
  showModal;
  editor;
};
export function OtherToolsDropdown({ activeEditor, showModal, editor }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">Tools</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(
              INSERT_HORIZONTAL_RULE_COMMAND,
              undefined
            );
          }}
        >
          Horizontal Rule
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            activeEditor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined);
          }}
        >
          Excalidraw
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            showModal("Insert Table", (onClose) => (
              <InsertNewTableDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
        >
          Table
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            showModal("Insert Equation", (onClose) => (
              <InsertEquationDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
        >
          Equation
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            editor.update(() => {
              const root = $getRoot();
              const stickyNode = $createStickyNode(0, 0);
              root.append(stickyNode);
            });
          }}
        >
          Sticky Note
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
          }}
        >
          Collapsible container
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
//   {EmbedConfigs.map((embedConfig) => (
//     <DropdownMenuItem
//       key={embedConfig.type}
//       onClick={() => {
//         activeEditor.dispatchCommand(
//           INSERT_EMBED_COMMAND,
//           embedConfig.type
//         );
//       }}
//       className="item"
//     >
//       {embedConfig.icon}
//       {embedConfig.contentName}
//     </DropdownMenuItem>
//   ))}
