import {
  component$,
  createContextId,
  useComputed$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { EditorContextWrapper } from "~/components/editor";
import styles from "./styles.css?inline";
export default component$(() => {
  useStyles$(styles);
  return (
    <div class="editor-shell">
      <EditorContextWrapper />
    </div>
  );
});
export const head: DocumentHead = {
  title: "Editor",
  meta: [
    {
      name: "description",
      content: "Editor",
    },
  ],
};
