import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import type { DeepPartial } from "../types";
import type { FlowbiteBoolean } from "../types";
import { SidebarContext } from "./SidebarContext";
import { Slot, component$, useContext } from "@builder.io/qwik";

export interface FlowbiteSidebarLogoTheme {
  base: string;
  collapsed: FlowbiteBoolean;
  img: string;
}

export interface SidebarLogoProps {
  href: string;
  img: string;
  imgAlt?: string;
  theme?: DeepPartial<FlowbiteSidebarLogoTheme>;
  className?: string;
}

export const SidebarLogo = component$<SidebarLogoProps>(({ className, href, img, imgAlt = "", theme: customTheme = {}, ...props }) => {
  const id = Math.random();
  const { theme: rootTheme, isCollapsed } = useContext(SidebarContext);

  const theme = mergeDeep(rootTheme.logo, customTheme);

  return (
    <a aria-labelledby={`flowbite-sidebar-logo-${id}`} href={href} class={twMerge(theme.base, className)} {...props}>
      <img alt={imgAlt} src={img} class={theme.img} />
      <span class={theme.collapsed[isCollapsed ? "on" : "off"]} id={`flowbite-sidebar-logo-${id}`}>
        <Slot />
      </span>
    </a>
  );
});
