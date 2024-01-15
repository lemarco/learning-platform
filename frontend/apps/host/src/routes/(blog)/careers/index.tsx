import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";

export default component$(() => {
  return <RemoteMfe url={`http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/careers`} />;
});

export const head: DocumentHead = {
  title: "Careers",
  meta: [
    {
      name: "description",
      content: "Careers",
    },
  ],
};
