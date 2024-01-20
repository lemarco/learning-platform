import { Slot, component$ } from "@builder.io/qwik";

import { Footer } from "~/components/footer";

import { Header } from "~/components/header";

export default component$(() => {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
});
