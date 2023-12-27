import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { initFlowbite } from "flowbite";
import { RouterHead } from "./components/router-head/router-head";
import { type Signal,  useSignal } from '@builder.io/qwik';
import styles from "./global.css?inline";
import {
  useContext,
  useContextProvider,
  createContextId,
} from '@builder.io/qwik';
 
export const ThemeContext = createContextId<Signal<string>>(
  'docs.theme-context'
);
export default component$(() => {
  useStyles$(styles);
  useVisibleTask$(() => {
    initFlowbite();
  });
  // const theme = useSignal('dark');
  // useContextProvider(ThemeContext, theme);
  console.log("ASdasds")
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
