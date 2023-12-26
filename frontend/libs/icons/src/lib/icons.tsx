import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './icons.css?inline';

export const Icons = component$(() => {
  useStylesScoped$(styles);

  return <>Icons works!</>;
});
