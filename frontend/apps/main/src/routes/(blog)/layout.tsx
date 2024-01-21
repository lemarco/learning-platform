import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { Footer } from "../../components/footer";

import { Header } from "~/components/header";
export const useGetGoogleLink = routeLoader$(async () => {
  return await fetch("http://0.0.0.0:6004/auth/google/link")
    .then((data) => data.json())
    .then((data) => data.link || "")
    .catch(() => "");
});
export default component$(() => {
  const googleLink = useGetGoogleLink();
  const link = String(googleLink.value);
  return (
    <>
      <Header link={link} />
      <Slot />
      <Footer />
    </>
  );
});
