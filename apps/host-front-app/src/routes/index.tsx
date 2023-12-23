import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header q:container="resumed" q:version="0.11.1" q:base="http://server.a/build">
      <div>
        <h1>This is a header form a container</h1>
      </div>
    </header>
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
