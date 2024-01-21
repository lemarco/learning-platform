import { $, QRL, Signal, Slot, component$, useContext, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { AccordionContext, type AccordionProps } from "./Accordion";
import { AccordionPanelContext } from "./AccordionPanelContext";

export interface AccordionPanelProps extends AccordionProps {}

export const AccordionPanel = component$<AccordionPanelProps>(() => {
  const props = useContext(AccordionContext);

  const isOpen = useSignal(props.isOpen);
  const ctx = useStore(
    props.alwaysOpen
      ? {
          ...props,
          isOpen,
        }
      : props,
  );

  useContextProvider(AccordionPanelContext, ctx);
  return <Slot />;
});
