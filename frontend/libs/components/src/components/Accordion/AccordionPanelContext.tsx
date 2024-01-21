import { Signal, createContextId, useContext } from "@builder.io/qwik";
import type { AccordionPanelProps } from "./AccordionPanel";

export const AccordionPanelContext = createContextId<{
  isOpen: Signal<boolean>;
  flush: {
    off?: string;
    on?: string;
  };
  alwaysOpen?: boolean;
}>("AccordionPanelContext");
