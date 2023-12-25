import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../components/remote-mfe";
// console.log(" process.env.PUBLIC_FRONTEND_HOST_APP_PORT,= ",  process.env.PUBLIC_FRONTEND_HOST_APP_PORT,)
export default component$(() => {
  return (
    <RemoteMfe
      remote={{
        name: "home",
        url: "http://localhost:10001/",
        _url: "http://localhost:10001/",
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
