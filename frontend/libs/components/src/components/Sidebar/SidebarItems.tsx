import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import type { DeepPartial } from "../types";

import { Slot, component$, useContext } from "@builder.io/qwik";
import { SidebarContext } from "./SidebarContext";

export interface FlowbiteSidebarItemsTheme {
  base: string;
}

export interface SidebarItemsProps {
  theme?: DeepPartial<FlowbiteSidebarItemsTheme>;
  className?: string;
}

export const SidebarItems = component$<SidebarItemsProps>(({ className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useContext(SidebarContext);

  const theme = mergeDeep(rootTheme.items, customTheme);

  return (
    <div class={twMerge(theme.base, className)} data-testid="flowbite-sidebar-items" {...props}>
      <Slot />
    </div>
  );
});
