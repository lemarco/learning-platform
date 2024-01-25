import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { initFlowbite } from "flowbite";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  useVisibleTask$(() => {
    initFlowbite();
  });
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
