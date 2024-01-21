import { useContext } from "@builder.io/qwik";

import { floatingNodeTypeContext } from "./context";
type AriaRole = "tooltip" | "dialog" | "alertdialog" | "menu" | "listbox" | "grid" | "tree";
type ComponentRole = "select" | "label" | "combobox";

export interface UseRoleProps {
  enabled?: boolean;
  role?: AriaRole | ComponentRole;
}

const componentRoleToAriaRoleMap = new Map<AriaRole | ComponentRole, AriaRole | false>([
  ["select", "listbox"],
  ["combobox", "listbox"],
  ["label", false],
]);
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useRole(context: any, props: UseRoleProps = {}) {
  const { open, floatingId } = context;
  const { enabled = true, role = "dialog" } = props;

  const ariaRole = (componentRoleToAriaRoleMap.get(role) ?? role) as AriaRole | false | undefined;

  const referenceId = Math.random().toString();
  const parentId = useContext(floatingNodeTypeContext).id;
  const isNested = parentId != null;

  if (!enabled) return {};

  const floatingProps = {
    id: floatingId,
    ...(ariaRole && { role: ariaRole }),
  };

  if (ariaRole === "tooltip" || role === "label") {
    return {
      reference: {
        [`aria-${role === "label" ? "labelledby" : "describedby"}`]: open ? floatingId : undefined,
      },
      floating: floatingProps,
    };
  }

  return {
    reference: {
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
      "aria-controls": open ? floatingId : undefined,
      ...(ariaRole === "listbox" && { role: "combobox" }),
      ...(ariaRole === "menu" && { id: referenceId }),
      ...(ariaRole === "menu" && isNested && { role: "menuitem" }),
      ...(role === "select" && { "aria-autocomplete": "none" }),
      ...(role === "combobox" && { "aria-autocomplete": "list" }),
    },
    floating: {
      ...floatingProps,
      ...(ariaRole === "menu" && { "aria-labelledby": referenceId }),
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    item({ active, selected }: any) {
      const commonProps = {
        role: "option",
        ...(active && { id: `${floatingId}-option` }),
      };

      // For `menu`, we are unable to tell if the item is a `menuitemradio`
      // or `menuitemcheckbox`. For backwards-compatibility reasons, also
      // avoid defaulting to `menuitem` as it may overwrite custom role props.
      switch (role) {
        case "select":
          return {
            ...commonProps,
            "aria-selected": active && selected,
          };
        case "combobox": {
          return {
            ...commonProps,
            ...(active && { "aria-selected": true }),
          };
        }
      }

      return {};
    },
  };
}
