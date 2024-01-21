import { $, Slot, component$, useContext } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../helpers/merge-deep";
import { getTheme } from "../theme-store";
import type { DeepPartial } from "../types";
import type { FlowbiteBoolean, FlowbiteHeadingLevel } from "../types";
import { ArrowIcon } from "./Accordion";
import { AccordionPanelContext } from "./AccordionPanelContext";
export interface FlowbiteAccordionTitleTheme {
  arrow: {
    base: string;
    open: FlowbiteBoolean;
  };
  base: string;
  flush: FlowbiteBoolean;
  heading: string;
  open: FlowbiteBoolean;
}

export interface AccordionTitleProps {
  as?: FlowbiteHeadingLevel;
  theme?: DeepPartial<FlowbiteAccordionTitleTheme>;
  className?: string;
}

export const AccordionTitle = component$<AccordionTitleProps>(({ as: Heading = "h2", className, theme: customTheme = {}, ...props }) => {
  const { flush, isOpen } = useContext(AccordionPanelContext);
  // const onClick = () => typeof setOpen !== "undefined" && setOpen();

  const theme = mergeDeep(getTheme().accordion.title, customTheme);

  return (
    <button
      class={twMerge(theme.base, theme.flush[flush ? "on" : "off"], theme.open[isOpen ? "on" : "off"], className)}
      onClick$={$(() => {
        isOpen.value = !isOpen?.value;
      })}
      type="button"
      {...props}
    >
      <h2 class={theme.heading} data-testid="flowbite-accordion-heading">
        <Slot />
      </h2>
      {ArrowIcon && (
        <ArrowIcon
          aria-hidden
          className={twMerge(theme.arrow.base, theme.arrow.open[isOpen ? "on" : "off"])}
          data-testid="flowbite-accordion-arrow"
        />
      )}
    </button>
  );
});
