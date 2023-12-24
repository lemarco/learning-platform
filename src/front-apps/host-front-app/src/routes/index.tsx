import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "../components/remote-mfe";
export default component$(() => {
  return (
    <RemoteMfe
      remote={{
        name: "home",
        url: "http://localhost:10001/",
        _url: "http://localhost:10001/",
        secondsOfDelay: 0,
        seamsColor: "#0031ff",
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
