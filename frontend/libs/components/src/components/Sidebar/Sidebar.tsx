import type { ComponentProps, ElementType, FC } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import { getTheme } from "../theme-store";
import type { DeepPartial } from "..";
import type { FlowbiteBoolean } from "../types";
import { type FlowbiteSidebarCTATheme } from "./SidebarCTA";
import { type FlowbiteSidebarCollapseTheme } from "./SidebarCollapse";
import { SidebarContext } from "./SidebarContext";
import { type FlowbiteSidebarItemTheme } from "./SidebarItem";
import { type FlowbiteSidebarItemGroupTheme } from "./SidebarItemGroup";
import { type FlowbiteSidebarItemsTheme } from "./SidebarItems";
import { type FlowbiteSidebarLogoTheme } from "./SidebarLogo";
import { Slot, component$, useContextProvider } from "@builder.io/qwik";

export interface FlowbiteSidebarTheme {
  root: {
    base: string;
    collapsed: FlowbiteBoolean;
    inner: string;
  };
  collapse: FlowbiteSidebarCollapseTheme;
  cta: FlowbiteSidebarCTATheme;
  item: FlowbiteSidebarItemTheme;
  items: FlowbiteSidebarItemsTheme;
  itemGroup: FlowbiteSidebarItemGroupTheme;
  logo: FlowbiteSidebarLogoTheme;
}

export interface SidebarProps {
  collapseBehavior?: "collapse" | "hide";
  collapsed?: boolean;
  theme?: DeepPartial<FlowbiteSidebarTheme>;
  className?: string;
}

export const SidebarComponent = component$<SidebarProps>(
  ({ collapseBehavior = "collapse", collapsed: isCollapsed = false, theme: customTheme = {}, className, ...props }) => {
    const theme = mergeDeep(getTheme().sidebar, customTheme);

    useContextProvider(SidebarContext, { theme, isCollapsed });
    return (
      <nav
        aria-label="Sidebar"
        hidden={isCollapsed && collapseBehavior === "hide"}
        className={twMerge(theme.root.base, theme.root.collapsed[isCollapsed ? "on" : "off"], className)}
        {...props}
      >
        <div class={theme.root.inner}>
          <Slot />
        </div>
      </nav>
    );
  },
);
