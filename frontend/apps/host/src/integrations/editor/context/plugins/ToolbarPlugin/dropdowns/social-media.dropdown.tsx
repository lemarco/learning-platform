import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { INSERT_EMBED_COMMAND } from "features/editor";
import { EmbedConfigs } from "../../";

type Props = {
  activeEditor;
};
export function SocialMediaDropDown({ activeEditor }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">Social</DropdownMenuTrigger>
      <DropdownMenuContent>
        {EmbedConfigs.map((embedConfig) => (
          <DropdownMenuItem
            key={embedConfig.type}
            onClick={() => {
              activeEditor.dispatchCommand(
                INSERT_EMBED_COMMAND,

                embedConfig.type
              );
            }}
            className="item"
          >
            {embedConfig.icon}
            {embedConfig.contentName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
