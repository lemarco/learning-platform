import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { initFlowbite } from "flowbite";
import styles from "./global.css?inline";
import { useImageProvider } from "qwik-image";

export default component$(() => {
  useStyles$(styles);
  // useVisibleTask$(() => {
  //   initFlowbite();
  // });
  useImageProvider({
    // you can set this property to overwrite default values [640, 960, 1280, 1920, 3840]
    // resolutions: [640],
    // you we can define the source from which to load our image

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
