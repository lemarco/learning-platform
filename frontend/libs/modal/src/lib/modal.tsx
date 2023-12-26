import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './modal.css?inline';

export const Modal = component$(() => {
  useStylesScoped$(styles);

  return <>Modal works!</>;
});
