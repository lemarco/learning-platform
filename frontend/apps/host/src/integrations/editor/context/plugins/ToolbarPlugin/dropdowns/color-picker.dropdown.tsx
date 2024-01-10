/** @jsxImportSource react */
import { DropdownMenu, DropdownMenuContent, ColorPicker, DropdownMenuTrigger } from "ui";

type Props = {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  title?: string;
  stopCloseOnClickSelf?: boolean;
  color: string;
  onChange?: (color: string) => void;
};

export function DropdownColorPicker({ disabled = false, stopCloseOnClickSelf = true, color, onChange, ...rest }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} className={"mr-3"}>
        Color
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ColorPicker color={color} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
