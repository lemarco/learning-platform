import { Slot, component$, useContext } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import { getTheme } from "../theme-store";
import type { DeepPartial } from "../types";
import { AccordionPanelContext } from "./AccordionPanelContext";

export interface FlowbiteAccordionComponentTheme {
  base: string;
}

export interface AccordionContentProps {
  theme?: DeepPartial<FlowbiteAccordionComponentTheme>;
  className?: string;
}

export const AccordionContent = component$<AccordionContentProps>(({ className, theme: customTheme = {}, ...props }) => {
  const { isOpen } = useContext(AccordionPanelContext);
  const theme = mergeDeep(getTheme().accordion.content, customTheme);

  return (
    <div class={twMerge(theme.base, className)} data-testid="flowbite-accordion-content" hidden={!isOpen} {...props}>
      <Slot />
    </div>
  );
});
