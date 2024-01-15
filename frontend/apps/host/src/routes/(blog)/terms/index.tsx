import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";
export default component$(() => {
  console.log("process.env.PUBLIC_FRONTEND_INFO_HOST = ", process.env.PUBLIC_FRONTEND_INFO_HOST);
  console.log("process.env.PUBLIC_FRONTEND_INFO_PORT = ", process.env.PUBLIC_FRONTEND_INFO_PORT);
  return <RemoteMfe url={`http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/terms`} />;
});

export const head: DocumentHead = {
  title: "Term and Conditions",
  meta: [
    {
      name: "description",
      content: "Term and Conditions",
    },
  ],
};
