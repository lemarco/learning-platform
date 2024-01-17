import { component$ } from "@builder.io/qwik";

import viteLogo from "/vite.svg";
import "./app.css";
import qwikLogo from "./assets/qwik.svg";

export const App = component$(() => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://qwik.builder.io" target="_blank" rel="noreferrer">
          <img src={qwikLogo} class="logo qwik" alt="Qwik logo" />
        </a>
      </div>
      <h1>Vite + Qwik</h1>

      <p class="read-the-docs">Click on the Vite and Qwik logos to learn more</p>
    </>
  );
});
