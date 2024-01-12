import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";

export default component$(() => {
  return <RemoteMfe url={`http://${process.env.PUBLIC_FRONTEND_EDITOR_HOST}:${process.env.PUBLIC_FRONTEND_EDITOR_PORT}/`} />;
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
