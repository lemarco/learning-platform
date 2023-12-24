import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes,
    },
    prefetchStrategy: {
      implementation: {
        linkInsert: null,
        workerFetchInsert: null,
        prefetchEvent: "always",
      },
    },
    qwikLoader: {
      include: "always",
    },
    streaming: {
      inOrder: {
        strategy: "auto",
        maximunInitialChunk: 0,
        maximunChunk: 0,
      },
    },
  });
}
