import { component$, useSignal, useStyles$ } from "@builder.io/qwik";

import styles from "../components/editor/index.css?inline";
import appStyles from "../components/editor/app.css?inline";
import { Editors } from "../components/editor/App";

export const App = component$(() => {
  useStyles$(styles);
  useStyles$(appStyles);
  return <Editors />;
});
