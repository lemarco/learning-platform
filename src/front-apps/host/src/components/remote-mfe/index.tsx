import { SSRStream, SSRStreamBlock, StreamWriter, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
// import type { RemoteData } from "@qwikdream/shared";
// import { GlobalAppState } from "../../store";
import { createContextId } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

export interface AppState {
  showSeams: boolean;
  user: string;
}

export const GlobalAppState = createContextId<AppState>("AppState");

export interface RemoteData {
  name: string;
  url: string;
  _url: string;
  secondsOfDelay: number;
  // seamsColor: string;
  hideLabel?: true;
  queryParam?: boolean;
}

export interface Props {
  remote: RemoteData;
  fetchOnScroll?: true;
}

// export default component$(({ remote, fetchOnScroll }: Props) => {
//   const store = useContext(GlobalAppState);
//   const { hideLabel } = remote;

//   const url = new URL(remote.url + (remote.queryParam ? (store.user === "Giorgio" ? "/builder-io" : "/qwik") : ""));
//   const scrollElementRef = useFetchOnScroll(!!fetchOnScroll, remote.url, store.user);

//   return (
//     <div
//       class={{
//         "remote-component mb-6": true,
//         "z-10": remote.name === "cart",
//         "pb-2": remote.name !== "cart" && remote.name !== "menu",
//       }}
//       style={{ "--seams-color": "#000000" }}
//     >
//       {!hideLabel && (
//         <a target="blank" href={url.href} class="remote-label">
//           {url.href}
//         </a>
//       )}
//       {fetchOnScroll ? (
//         <div ref={scrollElementRef} class="text-center text-3xl font-bold">
//           Loading...
//         </div>
//       ) : (
//         <SSRStreamBlock>
//           <SSRStream>{getSSRStreamFunction(url.href, store.user)}</SSRStream>
//         </SSRStreamBlock>
//       )}
//     </div>
//   );
// });

const fetchRemote = server$((url: string, user: string) => {
  const remoteUrl = new URL(url);
  if (remoteUrl) {
    remoteUrl.searchParams.append("loader", "false");
    remoteUrl.searchParams.append("t", new Date().getTime().toString());
  }
  return fetch(remoteUrl, {
    headers: {
      accept: "text/html",
      "Access-Control-Allow-Origin": "*",
      cookie: `user=${user}`,
    },
  });
});
const getSSRStreamFunction = (remoteUrl: string, user: string) => {
  const decoder = new TextDecoder();

  return async (stream: StreamWriter) => {
    const reader = (await fetchRemote(remoteUrl, user)).body?.getReader();
    let fragmentChunk = await reader.read();
    let base = "";
    while (!fragmentChunk.done) {
      const rawHtml = decoder.decode(fragmentChunk.value);
      const fixedHtmlObj = fixRemoteHTMLInDevMode(rawHtml, base);
      base = fixedHtmlObj.base;
      stream.write(fixedHtmlObj.html);
      fragmentChunk = await reader.read();
    }
  };
};

export default component$(({ remote }: Props) => {
  const store = useContext(GlobalAppState);
  console.log("remote.url= ", remote.url);
  const url = new URL(remote.url + (remote.queryParam ? (store.user === "Giorgio" ? "/builder-io" : "/qwik") : ""));
  console.log("url = ", url);
  return (
    <SSRStreamBlock>
      <SSRStream>{getSSRStreamFunction(url.href, store.user)}</SSRStream>
    </SSRStreamBlock>
  );
});
// const useFetchOnScroll = (enabled: boolean, url: string, user: string) => {
//   const scrollElementRef = useSignal<Element>();

//   useVisibleTask$(({ track }) => {
//     track(() => scrollElementRef.value);

//     if (scrollElementRef.value && enabled) {
//       const observer = new IntersectionObserver(async ([element]) => {
//         if (element.isIntersecting) {
//           const rawHtml = await fetchRemoteOnScroll(url, user);
//           const { html } = fixRemoteHTMLInDevMode(rawHtml);
//           scrollElementRef.value!.innerHTML = html;
//           observer.disconnect();
//         }
//       });
//       observer.observe(scrollElementRef.value!);
//       return () => {
//         observer.unobserve(scrollElementRef.value!);
//       };
//     }
//   });

//   return scrollElementRef;
// };

// const fetchRemoteOnScroll = server$(async (url: string, user: string): Promise<string> => {
//   const response = await fetchRemote(url, user);
//   return response.ok ? await response.text() : "";
// });

/**
 * This function is a hack to work around the fact that in dev mode the remote html is failing to prefix the base path.
 */
const fixRemoteHTMLInDevMode = (rawHtml: string): { html: string; base: string } => {
  let html = rawHtml;

  let base = "";
  if (import.meta.env.DEV) {
    html = html.replace(/q:base="\/(\w+)\/build\/"/gm, (match, child) => {
      base = `/${child}`;
      return match;
    });

    html = html.replace(/="(\/src\/([^"]+))"/gm, (_, path) => `="${base}${path}"`);
    html = html.replace(/"\\u0002(\/src\/([^"]+))"/gm, (_, path) => `"\\u0002${base}${path}"`);
  }
  return { html, base };
};
