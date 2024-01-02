import { $, Slot, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { RequestHandler, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import { AppState, GlobalAppState } from "../components/remote-mfe";
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

  return <Slot />;
  // <div data-seams={store.showSeams}>
  {
    /* <div class="flex gap-3 mt-6 mb-4 ml-3">
        <button
          class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          onClick$={() => (store.showSeams = !store.showSeams)}
        >
          Show Worker URLs
        </button>
        <button
          class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          onClick$={() => setUser("Giorgio")}
        >
          User Giorgio
        </button>
        <button
          class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          onClick$={() => setUser("Miško")}
        >
          User Miško
        </button>
      </div> */
  }

  // );
});
