import { readdirSync } from "node:fs";

import { getLastElement, hasExt, isClient, isJs, isLayout, isServer } from "./utils";
import { Node as FileNode } from "./router";
import { watcher } from "./watcher";
import { ServerArgs, config, runtimeDataStore } from "./config";

const getScriptContent = async (url: string): Promise<string> => {
  return await Bun.file(`./dist${url}`).text();
};

const generateI18nRedirect = (headers: Headers, base: string, replaced: string) => {
  const langHeader = headers.get("accept-language");
  const lang = langHeader?.slice(0, 2) || "en";
  const redirrectUrl = `${base}/${lang}${replaced}`;
  return redirrectUrl;
};

const prepareScriptsToDistPaths = (paths: string[] | string, dist: string): string[] => {
  if (typeof paths === "string") {
    // biome-ignore lint/style/noParameterAssign: <explanation>
    paths = [paths];
  }

  return paths.map((p) => {
    if (isServer(p)) {
      const withoutFile = p.replace("pages", "dist").replace("page.ts", "");
      const list = readdirSync(withoutFile);
      const fileName = list.find((f) => f.startsWith("page"));
      return (withoutFile + fileName) as string;
    }
    if (isClient(p)) {
      const withoutFile = p.replace("pages", "dist").replace("client.ts", "");

      const base: string[] = [];
      const splitted = withoutFile.split("/");
      let isDistFound = false;
      for (const part of splitted) {
        if (isDistFound) {
          base.push(part);
        }
        if (part === "dist") {
          isDistFound = true;
        }
      }
      const baseRelative = `${base.join("/")}`;

      const list = readdirSync(withoutFile);
      const fileName = list.find((f) => f.startsWith("client"));
      return (baseRelative + fileName) as string;
    }
    if (isLayout(p)) {
      const withoutFile = p.replace("pages", "dist").replace("layout.ts", "");
      const list = readdirSync(withoutFile);
      const fileName = list.find((f) => f.startsWith("layout"));
      return (withoutFile + fileName) as string;
    }
    return "";
  });
};

const processLayouts = async (template: string, layouts: string[]) => {
  let base = "";
  for (const l of layouts) {
    const { layout } = await import(l);
    if (!base) {
      base = await layout();
      continue;
    }
    base.replace("<!--slot-->", await layout());
  }
  return template.replace("<!--app-html-->", base);
};

const addPageToLayout = async (template: string, pagePath: string) => {
  const { server } = await import(pagePath);

  return template.replace("<!--slot-->", await server());
};
export const RequestHandler = async (req) => {
  const { base, dist, supportedLanguages, i18n, router, template } = runtimeDataStore;

  const replaced = req.url.replace(base, "");

  const splitted = replaced.split("/").filter(Boolean);
  let isRoot = false;

  if (!splitted.length) {
    isRoot = true;
  }
  if (!isRoot) {
    const lastElem = getLastElement(replaced);

    if (hasExt(lastElem)) {
      console.log("REQUEST WITH EXTENSION");
      if (isJs(lastElem)) {
        const script = await getScriptContent(replaced);
        return new Response(script, {
          headers: { "Content-type": "application/javascript" },
        });
      }
      console.log("REQUEST WITH EXTENSION 2");
      const file = await Bun.file("./dist/styles.css");

      return new Response(await file.text(), {
        headers: { "Content-type": file.type },
      });
    }
  }
  if ((i18n && !supportedLanguages.includes(splitted[0])) || !splitted[0]) {
    return Response.redirect(generateI18nRedirect(req.headers, base, replaced));
  }

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const res = router!.match(replaced || "/");

  if (!res) {
    return new Response("404!");
  }

  const {
    clients: clientsOrig = [],
    layouts: layoutsOrig = [],
    path: pathOrig, // TODO HANDLE MULTIPLE PATHs
    parallelPaths,
    parallelLayouts,
    commonLayouts: cl,
  } = res as FileNode;
  if (parallelPaths) {
    const paralles = Object.entries(parallelPaths);

    let baseCommonLayout = "";
    const commonLayouts = cl?.length ? prepareScriptsToDistPaths(cl, dist) : [];

    const clients = prepareScriptsToDistPaths(clientsOrig, dist);

    if (commonLayouts?.length) {
      for (const l of commonLayouts) {
        const { layout } = await import(l);
        const renderedLayout = await layout();

        if (baseCommonLayout) {
          baseCommonLayout = baseCommonLayout.replace("<!--slot-->", renderedLayout);
        } else {
          baseCommonLayout = renderedLayout;
        }
      }
    }

    for (const [name, path] of paralles) {
      const preparedPath = prepareScriptsToDistPaths(path, dist);
      const { server } = await import(preparedPath[0]);
      const serverHtml = await server();

      const thisNameLayouts = parallelLayouts?.[name];
      let thisNameLayout = "";
      if (thisNameLayouts) {
        for (const l of thisNameLayouts) {
          const { layout } = await import(l);
          if (thisNameLayout) {
            thisNameLayout = thisNameLayout.replace("<!--slot-->", await layout());
          } else {
            thisNameLayout = await layout();
          }
        }
      }

      if (thisNameLayout) {
        thisNameLayout = thisNameLayout.replace("<!--slot-->", serverHtml);
      }

      baseCommonLayout = baseCommonLayout.replace(`<!--${name}-->`, thisNameLayout);
    }

    const allDeferScripts = clients.map((client) => `<script src="${base}/${client}"  defer></script>`).join("") || "";

    const html = template.replace("<!--app-client-->", allDeferScripts).replace("<!--app-html-->", baseCommonLayout);

    return new Response(html, {
      headers: { "Content-type": "text/html" },
    });
  }

  const clients = prepareScriptsToDistPaths(clientsOrig, dist);
  const layouts = prepareScriptsToDistPaths(layoutsOrig, dist);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const path = prepareScriptsToDistPaths(pathOrig!, dist);

  const allDeferScripts = clients.map((client) => `<script src="${base}/${client}" defer></script>`).join("") || "";

  const finalLayout = await processLayouts(
    template.replace("<!--app-client-->", allDeferScripts),

    layouts,
  );

  const html = await addPageToLayout(finalLayout, path[0]);

  return new Response(html, {
    headers: { "Content-type": "text/html" },
  });
};
