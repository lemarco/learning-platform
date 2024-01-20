import { $, Slot, component$, createContextId, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";

export interface AppState {
  showSeams: boolean;
  user: string;
}

export const GlobalAppState = createContextId<AppState>("AppState");
// import { worker$ } from "@builder.io/qwik-worker";
// import SharedWorker from "./worker?sharedworker";
// import SharedWorker from "./worker.js?sharedworker&inline";
// import { setCookie } from "../utils/cookie";
export const setCookie = (name: string, value: string) => {
  let expires = "";
  const days = 10;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value || ""}${expires}; path=/; secure; SameSite=Strict;`;
};

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export const useUser = routeLoader$(({ cookie }) => cookie.get("user")?.value || "user");

export default component$(() => {
  const store = useStore<AppState>({
    showSeams: false,
    user: useUser().value,
  });
  useContextProvider(GlobalAppState, store);

  const setUser = $((user: string) => {
    localStorage.clear();
    setCookie("user", user);
    store.user = user;
    const newUrl = new URL(location.origin);
    newUrl.searchParams.append("t", new Date().getTime().toString());
    location.href = newUrl.href;
  });
  useVisibleTask$(
    () => {
      // const sharedWorker = new SharedWorker();
      const isSharedWorkerSupported = "SharedWorker" in globalThis;
      console.log("isSharedWorkerSupported = ", isSharedWorkerSupported);
      // register("/worker.js");

      // const modules = {
      //   './dir/foo.js': () => import('./dir/foo.js'),
      // }
      // const myWorker = worker$(() => {
      //   self.addEventListener("custom", function handler(e) {
      //     port.start();
      //     port.addEventListener("custom", () => {
      //       console.log("CUSTOM WORKER");
      //     });
      //   });
      // });
      const myWorker = new SharedWorker(new URL("./worker.js", "http://learning-platform.com"), { name: "lp shared worker" });

      myWorker.port.start();
      myWorker.port.postMessage({});
      myWorker.port.onmessage = (event) => {
        console.log("Main Script Received Message:", event.data);
      };
      // worker$(() => {
      //   console.log("IN DISPATCH");
      //   document.dispatchEvent(new CustomEvent("custom"));
      // });
    },
    { strategy: "document-ready" },
  );
  return <Slot />;
});
