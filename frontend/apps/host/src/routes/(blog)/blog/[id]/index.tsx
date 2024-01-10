import { component$ } from "@builder.io/qwik";
import { type DocumentHead, type RequestHandler, useLocation, useNavigate } from "@builder.io/qwik-city";
import RemoteMfe from "../../../../components/remote-mfe";

export default component$(() => {
  const nav = useLocation();
  console.log(nav.params.id);
  return <RemoteMfe url={`http://${process.env.FRONTEND_ARTICLE_APP_HOST}:${process.env.FRONTEND_ARTICLE_APP_PORT}/${nav.params.id}`} />;
});

export const head: DocumentHead = {
  title: "Article",
  meta: [
    {
      name: "description",
      content: "Article",
    },
  ],
};
