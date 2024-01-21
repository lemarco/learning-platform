import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import type { DeepPartial } from "../types";
import { Badge } from "../Badge";
import type { FlowbiteColors } from "../types";
import { Tooltip } from "../Tooltip";
import { SidebarContext } from "./SidebarContext";
import { Slot, component$, useContext } from "@builder.io/qwik";
import { SidebarItemContext } from "./SidebarItemContext";
// import { useSidebarContext } from "./SidebarContext";
// import { useSidebarItemContext } from "./SidebarItemContext";

export interface FlowbiteSidebarItemTheme {
  active: string;
  base: string;
  collapsed: {
    insideCollapse: string;
    noIcon: string;
  };
  content: {
    base: string;
  };
  icon: {
    base: string;
    active: string;
  };
  label: string;
  listItem: string;
}

export interface SidebarItemProps {
  active?: boolean;
  as?: Element;
  href?: string;
  className?: string;

  label?: string;
  labelColor?: keyof SidebarItemLabelColors;
  theme?: DeepPartial<FlowbiteSidebarItemTheme>;
}

export interface SidebarItemLabelColors extends Pick<FlowbiteColors, "gray"> {
  [key: string]: string;
}
type ListItemProps = {
  id: string;
  theme: FlowbiteSidebarItemTheme;
  isCollapsed: boolean;
  // tooltipChildren: ReactNode | undefined;
  className?: string;
};
const ListItem = component$<ListItemProps>(({ id, theme, isCollapsed, ...props }) => (
  <li {...props}>
    {isCollapsed ? (
      <Tooltip
        content={
          <Children id={id} theme={theme}>
            <Slot q:slot="tooltip" />
          </Children>
        }
        placement="right"
      >
        <Slot />
      </Tooltip>
    ) : (
      <Slot q:slot="wrapper" />
    )}
  </li>
));

const Children = component$<{ id: string; theme: FlowbiteSidebarItemTheme }>(({ id, theme }) => {
  return (
    <span data-testid="flowbite-sidebar-item-content" id={`flowbite-sidebar-item-${id}`} class={twMerge(theme.content.base)}>
      <Slot />
    </span>
  );
});

export const SidebarItem = component$<SidebarItemProps>(
  ({
    active: isActive,

    className,

    label,
    labelColor = "info",
    theme: customTheme = {},
    ...props
  }) => {
    const id = useId();
    const { theme: rootTheme, isCollapsed } = useContext(SidebarContext);
    const { isInsideCollapse } = useContext(SidebarItemContext);

    const theme = mergeDeep(rootTheme.item, customTheme);

    return (
      <ListItem theme={theme} class={theme.listItem} id={id} isCollapsed={isCollapsed} tooltipChildren={children}>
        <a
          aria-labelledby={`flowbite-sidebar-item-${id}`}
          ref={ref}
          class={twMerge(
            theme.base,
            isActive && theme.active,
            !isCollapsed && isInsideCollapse && theme.collapsed?.insideCollapse,
            className,
          )}
          {...props}
        >
          {Icon && (
            <Icon aria-hidden data-testid="flowbite-sidebar-item-icon" class={twMerge(theme.icon?.base, isActive && theme.icon?.active)} />
          )}
          <Slot q:slot="icon" />
          {isCollapsed && !Icon && <span class={theme.collapsed?.noIcon}>{(children as string).charAt(0).toLocaleUpperCase() ?? "?"}</span>}
          {!isCollapsed && (
            <Children id={id} theme={theme}>
              <Slot />
            </Children>
          )}
          {!isCollapsed && label && (
            <Badge color={labelColor} data-testid="flowbite-sidebar-label" hidden={isCollapsed} class={theme.label}>
              {label}
            </Badge>
          )}
        </a>
      </ListItem>
    );
  },
);
