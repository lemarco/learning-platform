import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { useSignal, useStyles$ } from "@builder.io/qwik";

// import appStyles from "./app.css?inline";
import { Editors } from "../components/editor/App";
import styles from "./index.css?inline";

export const App = component$(() => {
  useStyles$(styles);
  // useStyles$(appStyles);
  return <Editors client:load />;
});

export default App;
export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
