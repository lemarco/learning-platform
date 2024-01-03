import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { initFlowbite } from "flowbite";
import { RouterHead } from "./components/router-head/router-head";
import styles from "./global.css?inline";

export default component$(() => {
  useStyles$(styles);
  // useVisibleTask$(() => {
  //   initFlowbite();
  // });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
