import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import type { DeepPartial } from "../types";
import type { FlowbiteColors } from "../types";
import { Slot, component$, useContext } from "@builder.io/qwik";
import { SidebarContext } from "./SidebarContext";

export interface FlowbiteSidebarCTATheme {
  base: string;
  color: FlowbiteSidebarCTAColors;
}

export interface SidebarCTAProps {
  color?: keyof FlowbiteSidebarCTAColors;
  theme?: DeepPartial<FlowbiteSidebarCTATheme>;
  className?: string;
}

export interface FlowbiteSidebarCTAColors
  extends Pick<
    FlowbiteColors,
    "blue" | "dark" | "failure" | "gray" | "green" | "light" | "purple" | "red" | "success" | "warning" | "yellow"
  > {
  [key: string]: string;
}

export const SidebarCTA = component$<SidebarCTAProps>(({ color = "info", className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, isCollapsed } = useContext(SidebarContext);

  const theme = mergeDeep(rootTheme.cta, customTheme);

  return (
    <div data-testid="sidebar-cta" hidden={isCollapsed} className={twMerge(theme.base, theme.color[color], className)} {...props}>
      <Slot />
    </div>
  );
});
