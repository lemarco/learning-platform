import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import {
  INSERT_IMAGE_COMMAND,
  InsertImageDialog,
  InsertImagePayload,
  InsertInlineImageDialog,
} from "../../";

type Props = {
  activeEditor;
  showModal;
};
export function ImagesDropDown({ activeEditor, showModal }: Props) {
  const insertGifOnClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">Images</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            showModal("Insert Image", (onClose) => (
              <InsertImageDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
        >
          Image
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            showModal("Insert Inline Image", (onClose) => (
              <InsertInlineImageDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
        >
          Inline Image
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            insertGifOnClick({
              altText: "Cat typing on a laptop",
              src: "",
            })
          }
        >
          Gif
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
