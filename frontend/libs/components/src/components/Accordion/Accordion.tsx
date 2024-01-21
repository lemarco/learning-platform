import { twMerge } from "tailwind-merge";
import { DeepPartial, FlowbiteBoolean } from "../types";
import type { FlowbiteAccordionComponentTheme } from "./AccordionContent";

import type { FlowbiteAccordionTitleTheme } from "./AccordionTitle";

import { ComponentBaseProps, Slot, component$, useContextProvider, useSignal } from "@builder.io/qwik";
import { mergeDeep } from "../helpers/merge-deep";
import { getTheme } from "../theme-store";
export interface FlowbiteAccordionTheme {
  root: FlowbiteAccordionRootTheme;
  content: FlowbiteAccordionComponentTheme;
  title: FlowbiteAccordionTitleTheme;
}

export interface FlowbiteAccordionRootTheme {
  base: string;
  flush: FlowbiteBoolean;
}

export interface AccordionProps extends ComponentBaseProps {
  alwaysOpen?: boolean;

  className?: string;
  flush?: boolean;
  collapseAll?: boolean;
  theme?: DeepPartial<FlowbiteAccordionTheme>;
}

export const ArrowIcon = component$(({ className = "" }: { className: string }) => {
  return (
    <svg
      // biome-ignore lint/style/useTemplate: <explanation>
      class={"w-6 h-6 text-gray-800 dark:text-white" + className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
    </svg>
  );
});
import { Signal, createContextId, useContext } from "@builder.io/qwik";

export const AccordionContext = createContextId<any>("AccordionContext");

export const Accordion = component$<AccordionProps>(
  ({
    alwaysOpen = false,

    flush = false,
    collapseAll = false,
    className,
    theme: customTheme = {},
    ...props
  }) => {
    const isOpen = useSignal(collapseAll ? -1 : 0);
    // const panels = useMemo(
    //   () =>
    //     Children.map(children, (child, i) =>
    //       cloneElement(child, {
    //         alwaysOpen,
    //         arrowIcon,
    //         flush,
    //         isOpen: isOpen === i,
    //         setOpen: () => setOpen(isOpen === i ? -1 : i),
    //       }),
    //     ),
    //   [alwaysOpen, arrowIcon, children, flush, isOpen],
    // );

    const theme = mergeDeep(getTheme().accordion.root, customTheme);
    const ctx = { ...props, isOpen: isOpen.value, alwaysOpen };

    useContextProvider(AccordionContext, ctx);
    return (
      <div class={twMerge(theme.base, theme.flush[flush ? "on" : "off"], className)} data-testid="flowbite-accordion" {...props}>
        {/* {panels} */}
        <Slot />
      </div>
    );
  },
);
