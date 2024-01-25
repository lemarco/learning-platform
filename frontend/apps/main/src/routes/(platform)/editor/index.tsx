import Editor from "@/widgets/editor";
import { Signal, Slot, component$, createContextId, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
export default component$(() => {
  return <div id="EDITOR_WRAPPER_QWIK"><Editor /></div>
});
