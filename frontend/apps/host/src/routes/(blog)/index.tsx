import { component$, useOnDocument, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {} from "@builder.io/qwik-city";
import { worker$ } from "@builder.io/qwik-worker";
import RemoteMfe from "../../components/remote-mfe";
// createApp(App).mount('#app')
// import SharedWorker from "shared-worker:./worker";
// import { register } from "register-service-worker";

// register(`/service-worker.js`)
export default component$(() => {
  useVisibleTask$(async () => {
    console.log("123");
  });
  //   const myWorker = new Worker(new URL("./worker.js", import.meta.url));

  //   setInterval(() => {
  //     document.dispatchEvent(new CustomEvent("custom"));
  //   }, 2000);
  // });

  return <RemoteMfe url={`http://${process.env.FRONTEND_HOME_APP_HOST}:${process.env.FRONTEND_HOME_APP_PORT}/`} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  links: [{ href: "/editor", rel: "prefetch" }],

  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
