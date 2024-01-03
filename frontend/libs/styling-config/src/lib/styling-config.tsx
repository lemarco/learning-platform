import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./styling-config.css?inline";

export const StylingConfig = component$(() => {
  useStylesScoped$(styles);

  return <>StylingConfig works!</>;
});
