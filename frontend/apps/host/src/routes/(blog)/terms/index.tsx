import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";
export default component$(() => {
  console.log("process.env.PUBLIC_FRONTEND_INFO_HOST = ", process.env.PUBLIC_FRONTEND_INFO_HOST);
  console.log("process.env.PUBLIC_FRONTEND_INFO_PORT = ", process.env.PUBLIC_FRONTEND_INFO_PORT);
  return (
    <RemoteMfe
      remote={{
        name: "terms",
        url: `http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/terms`,
        _url: `http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/terms`,
        secondsOfDelay: 0,
      }}
    />
  );
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
