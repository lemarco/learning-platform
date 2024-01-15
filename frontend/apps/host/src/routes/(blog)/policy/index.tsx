import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";

export default component$(() => {
  return <RemoteMfe url={`http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/policy`} />;
});

export const head: DocumentHead = {
  title: "Privacy and Policy",
  meta: [
    {
      name: "description",
      content: "Privacy and Policy",
    },
  ],
};
