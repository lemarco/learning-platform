import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../../components/remote-mfe";

export default component$(() => {
  return (
    <RemoteMfe
      remote={{
        name: "about",
        url: `http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/about`,
        _url: `http://${process.env.PUBLIC_FRONTEND_INFO_HOST}:${process.env.PUBLIC_FRONTEND_INFO_PORT}/about`,
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
