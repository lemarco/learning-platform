import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../../components/remote-mfe";
// console.log("process.env = ", process.env);
export default component$(() => {
  return (
    <RemoteMfe
      remote={{
        name: "home",
        url: `http://localhost:${process.env.FRONTEND_HOME_APP_PORT}/`,
        _url: `http://localhost:${process.env.FRONTEND_HOME_APP_PORT}/`,
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
