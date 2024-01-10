import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../components/remote-mfe";

export default component$(() => {
  return <RemoteMfe url={`http://${process.env.FRONTEND_HOME_APP_HOST}:${process.env.FRONTEND_HOME_APP_PORT}/`} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
