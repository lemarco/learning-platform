import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import RemoteMfe from "~/components/remote-mfe";

export default component$(() => {
  console.log("TRY TO RENDER ARTICLE = ", `http://localhost:${process.env.FRONTEND_ARTICLE_APP_PORT}/`);
  return (
    <RemoteMfe
      remote={{
        name: "article",
        url: `http://localhost:${process.env.FRONTEND_ARTICLE_APP_PORT}/`,
        _url: `http://localhost:${process.env.FRONTEND_ARTICLE_APP_PORT}/`,
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
