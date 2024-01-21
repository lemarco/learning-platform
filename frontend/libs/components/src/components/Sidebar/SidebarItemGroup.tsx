import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import type { DeepPartial } from "../types";
import { SidebarContext } from "./SidebarContext";
import { SidebarItemContext } from "./SidebarItemContext";
import { Slot, component$, useContext, useContextProvider } from "@builder.io/qwik";

export interface FlowbiteSidebarItemGroupTheme {
  base: string;
}

export interface SidebarItemGroupProps {
  theme?: DeepPartial<FlowbiteSidebarItemGroupTheme>;
  className?: string;
}

export const SidebarItemGroup = component$<SidebarItemGroupProps>(({ className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useContext(SidebarContext);

  const theme = mergeDeep(rootTheme.itemGroup, customTheme);
  useContextProvider(SidebarItemContext, { isInsideCollapse: false });
  return (
    <ul data-testid="flowbite-sidebar-item-group" class={twMerge(theme.base, className)} {...props}>
      <Slot />
    </ul>
  );
});
