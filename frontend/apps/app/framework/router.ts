import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";
import { $ } from "bun";
import { getAllPagesPaths, isClient, isDynamicFolder, isFile, isGroup, isLayout, isParallel, isServer, ls, splitUrl } from "./utils";
type FileSystemRouterArgs = {
  dir?: string;
  base?: string;
};
export const leafs = [];
type NewNodeArgs = {
  name: string;
  isLeaf?: boolean;
  clients?: string[];
  layouts?: string[];
  path?: string;
  parallelPaths?: Record<string, string>;
  parallelLayouts?: Record<string, string[]>;
  commonLayouts?: string[];
};
type Scripts = {
  currentLayoutScripts: string[];
  currentClientScripts: string[];
  path: string;
  parallelSegment?: string;
};
type RuntimeObj = {
  path: string;
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

export class Node {
  name: string;
  isLeaf?: boolean;

  static?: Map<string, Node>;
  parallel?: [string, Node];
  group?: Map<string, Node>;
  dynamic?: [string, Node];

  clients?: string[];
  layouts?: string[];
  path?: string;

  parallelPaths?: Record<string, string>;
  parallelLayouts?: Record<string, string[]>;
  commonLayouts?: string[];
  runtime: RuntimeObj;
  constructor({ isLeaf, path, name, clients, layouts, parallelPaths, parallelLayouts, commonLayouts }: NewNodeArgs) {
    this.isLeaf = isLeaf;
    this.name = name;
    this.clients = clients;
    this.layouts = layouts;
    this.path = path;
    this.parallelPaths = parallelPaths;
    this.parallelLayouts = parallelLayouts;
    this.commonLayouts = commonLayouts;
  }

  find(urlSegments: string[], idx: number): Node | undefined {
    if (this.static) {
      for (const [name, node] of this.static) {
        if (name === urlSegments[idx]) {
          if (urlSegments.length - 1 === idx) {
            if (node.isLeaf) {
              return node;
            }
            return node.find(["page.ts"], 0);
          }
          const matchResult = node.find(urlSegments, idx + 1);
          if (matchResult) {
            return matchResult;
          }
        }
      }
    }

    if (this.group) {
      for (const [name, node] of this.group) {
        const matchResult = node.find(urlSegments, idx);
        if (matchResult) {
          return matchResult;
        }
      }
    }

    if (this.parallel) {
      const matchResult = this.parallel?.[1].find(urlSegments, idx);
      if (matchResult) {
        return matchResult;
      }
    }
    return this.dynamic?.[1].find(urlSegments, idx + 1);
  }
  add(urlSegments: string[], idx: number, scripts: Scripts) {
    const currentPart = urlSegments[idx];
    scripts.path = `${scripts.path + urlSegments[idx - 1]}/`;

    const clientPath = resolve(`${scripts.path}client.ts`);
    const client = existsSync(clientPath) ? clientPath : undefined;
    if (client) {
      scripts.currentClientScripts.push(client);
    }
    const layoutPath = resolve(`${scripts.path}layout.ts`);
    const layout = existsSync(layoutPath) ? layoutPath : undefined;
    if (layout) {
      scripts.currentLayoutScripts.push(layout);
    }
    if (isFile(currentPart)) {
      if (!this.static) {
        this.static = new Map();
      }
      if (scripts.parallelSegment) {
        const node = this.static.get("page.ts");
        if (!node) {
          let currentLayout = "";
          if (existsSync(resolve(`./pages/${urlSegments.join("/")}`.replace("page.ts", "layout.ts")))) {
            if (scripts.currentLayoutScripts.length) {
              currentLayout = scripts.currentLayoutScripts.pop() as string;
            }
          }
          let currentScript = "";
          if (existsSync(resolve(`./pages/${urlSegments.join("/")}`.replace("page.ts", "client.ts")))) {
            if (scripts.currentClientScripts.length) {
              currentScript = scripts.currentClientScripts.pop() as string;
            }
          }
          const newNode = new Node({
            name: currentPart,
            isLeaf: true,
            clients: [...scripts.currentClientScripts, currentScript],
            parallelPaths: {
              [scripts.parallelSegment]: resolve(`./pages/${urlSegments.join("/")}`),
            },
            parallelLayouts: {
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              [scripts.parallelSegment!]: [currentLayout],
            },
            commonLayouts: scripts.currentLayoutScripts,
          });
          this.static.set(currentPart, newNode);
          return;
        }
        node.parallelPaths = {
          ...node.parallelPaths,
          [scripts.parallelSegment]: resolve(`./pages/${urlSegments.join("/")}`),
        };

        for (let i = 0; i < scripts.currentLayoutScripts.length; i++) {
          if (node.commonLayouts?.[i] === scripts.currentLayoutScripts[i]) {
            scripts.currentLayoutScripts[i] = "";
            continue;
          }
          const newCommonLayouts = node.commonLayouts?.slice(0, i) || [];
          let layoutsNeedsMerge: string[] = [];
          if (node.commonLayouts) {
            layoutsNeedsMerge = node.commonLayouts?.slice(i, -1);
          }

          scripts.currentLayoutScripts = scripts.currentLayoutScripts.filter(Boolean);
          if (node.parallelLayouts) {
            for (const [name, layouts] of Object.entries(node.parallelLayouts)) {
              const newLayouts = [...layoutsNeedsMerge, ...layouts];
              node.parallelLayouts[name] = newLayouts;
            }
          }

          if (!node.parallelLayouts) {
            node.parallelLayouts = {};
          }
          if (scripts.currentClientScripts.length) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            scripts.currentClientScripts.forEach((sc) => (node.clients?.includes(sc) ? undefined : node.clients?.push(sc)));
          }
          node.parallelLayouts[scripts.parallelSegment] = scripts.currentLayoutScripts;
          break;
        }

        return;
      }
      this.static.set(
        currentPart,
        new Node({
          name: currentPart,
          isLeaf: true,
          layouts: scripts.currentLayoutScripts,
          clients: scripts.currentClientScripts,
          path: resolve(`./pages/${urlSegments.join("/")}`),
        }),
      );

      return;
    }
    if (isDynamicFolder(currentPart)) {
      if (isGroup(currentPart)) {
        let node = this.group?.get(currentPart);
        if (!node) {
          node = new Node({
            name: currentPart,
          });
          if (!this.group) {
            this.group = new Map();
          }
          this.group?.set(currentPart, node);
        }
        node.add(urlSegments, idx + 1, scripts);
        return;
      }

      if (isParallel(currentPart)) {
        const node = this.parallel || [
          currentPart,
          new Node({
            name: currentPart,
          }),
        ];
        node[1].add(urlSegments, idx + 1, {
          ...scripts,
          parallelSegment: currentPart,
        });
        this.parallel = node;
        return;
      }
      if (this.dynamic) {
        if (this.dynamic[0] !== currentPart) {
          throw new Error("Cannot be 2 to dynamic [] folders on one level");
        }
      } else {
        this.dynamic = [
          currentPart,
          new Node({
            name: currentPart,
          }),
        ];
      }
      this.dynamic[1].add(urlSegments, idx + 1, scripts);
      return;
    }

    let node = this.static?.get(currentPart);

    if (!node) {
      node = new Node({
        name: currentPart,
      });
      if (!this.static) {
        this.static = new Map();
      }
      this.static?.set(currentPart, node);
    }
    node.add(urlSegments, idx + 1, scripts);
  }

  private async processParallelLeaf(dist = "dist") {
    const {
      clients: clientsOrig = [],
      layouts: layoutsOrig = [],
      path: pathOrig, // TODO HANDLE MULTIPLE PATHs
      parallelPaths,
      parallelLayouts,
      commonLayouts: cl,
    } = this;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const paralles = Object.entries(parallelPaths!);

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

    // for (const [name, path] of paralles) {
    //   const preparedPath = prepareScriptsToDistPaths(path, dist);
    //   const { server } = await import(preparedPath[0]);
    //   const serverHtml = await server();

    //   const thisNameLayouts = parallelLayouts?.[name];
    //   let thisNameLayout = "";
    //   if (thisNameLayouts) {
    //     for (const l of thisNameLayouts) {
    //       const { layout } = await import(l);
    //       if (thisNameLayout) {
    //         thisNameLayout = thisNameLayout.replace("<!--slot-->", await layout());
    //       } else {
    //         thisNameLayout = await layout();
    //       }
    //     }
    //   }

    //   if (thisNameLayout) {
    //     thisNameLayout = thisNameLayout.replace("<!--slot-->", serverHtml);
    //   }

    //   baseCommonLayout = baseCommonLayout.replace(`<!--${name}-->`, thisNameLayout);
    // }

    // const allDeferScripts = clients.map((client) => `<script src="${base}/${client}"  defer></script>`).join("") || "";

    // const html = template.replace("<!--app-client-->", allDeferScripts).replace("<!--app-html-->", baseCommonLayout);
  }
  async createLeafRuntimeLayout() {
    if (this.parallelPaths) {
      await this.processParallelLeaf();
    } else {
    }
  }
  async createRuntimeLayouts() {
    if (this.static) {
      for (const s of this.static) {
        if (s[1].isLeaf) {
          await s[1].createLeafRuntimeLayout();
        } else {
          await s[1].createRuntimeLayouts();
        }
      }
    }
    if (this.group) {
      for (const s of this.group) {
        await s[1].createRuntimeLayouts();
      }
    }
    if (this.dynamic) {
      await this.dynamic[1].createRuntimeLayouts();
    }
    if (this.parallel) {
      await this.parallel[1].createRuntimeLayouts();
    }
  }
}
class Storage {
  static?: Map<string, Node>;
  group?: Map<string, Node>;
  dynamic?: [string, Node];
  parallel?: [string, Node];
  add(url: string) {
    const splitted = splitUrl(url);
    const idx = 0;
    //@ts-ignore
    const currentPart = splitted[idx];
    const currentClientScripts: string[] = [];
    const currentLayoutScripts: string[] = [];
    const clientPath = resolve("./pages/client.ts");
    const client = existsSync(clientPath) ? clientPath : undefined;
    if (client) {
      currentClientScripts.push(client);
    }
    const layoutPath = resolve("./pages/layout.ts");
    const layout = existsSync(layoutPath) ? clientPath : undefined;
    if (layout) {
      currentLayoutScripts.push(layout);
    }
    const scripts = {
      currentClientScripts,
      currentLayoutScripts,
      path: "./pages/",
    };

    if (isFile(currentPart)) {
      if (!this.static) {
        this.static = new Map();
      }
      this.static?.set(
        currentPart,
        new Node({
          name: currentPart,
          isLeaf: true,
          clients: scripts.currentClientScripts,
          layouts: scripts.currentLayoutScripts,
          path: resolve(`./pages/${url}}`),
        }),
      );
      return;
    }

    if (isDynamicFolder(currentPart)) {
      if (isGroup(currentPart)) {
        let node = this.group?.get(currentPart);
        if (!node) {
          node = new Node({
            name: currentPart,
          });
          if (!this.group) {
            this.group = new Map();
          }
          this.group?.set(currentPart, node);
        }
        node.add(splitted, 1, scripts);
        return;
      }
      if (isParallel(currentPart)) {
        const node = this.parallel || [
          currentPart,
          new Node({
            name: currentPart,
          }),
        ];
        node[1].add(splitted, 0, {
          ...scripts,
          parallelSegment: currentPart,
        });
        this.parallel = node;
        return;
      }

      if (this.dynamic) {
        if (this.dynamic[0] !== currentPart) {
          throw new Error("Cannot be to dynamic [] folders on one level");
        }
      } else {
        this.dynamic = [
          currentPart,
          new Node({
            name: currentPart,
          }),
        ];
      }

      this.dynamic[1].add(splitted, 1, scripts);
      return;
    }

    let node = this.static?.get(currentPart);

    if (!node) {
      node = new Node({
        name: currentPart,
      });
      if (!this.group) {
        this.group = new Map();
      }

      this.group?.set(currentPart, node);
    }
    node.add(splitted, 1, scripts);
  }
  find(url: string) {
    // biome-ignore lint/style/noParameterAssign: <explanation>
    url += "page.ts";
    const splitted = splitUrl(url).filter(Boolean);
    const isSegmentFile = isFile(splitted[0]);
    if (isSegmentFile) {
      const staticNode = this.static?.get(splitted[0]);
      if (staticNode) {
        const matchResult = staticNode.find(splitted, 1);
        if (matchResult) {
          return matchResult;
        }
      }
    }
    const groupNode = this.group?.get(splitted[0]);
    if (groupNode) {
      const matchResult = groupNode.find(splitted, 0);
      if (matchResult) {
        return matchResult;
      }
    }
    const parallelNode = this.parallel?.[1];
    if (parallelNode) {
      const matchResult = parallelNode.find(splitted, 1);
      if (matchResult) {
        return matchResult;
      }
    }

    return this.dynamic?.[1]?.find(splitted, 1);
  }
  async createRuntimeLayouts() {
    if (this.static) {
      for (const s of this.static) {
        if (s[1].isLeaf) {
          await s[1].createLeafRuntimeLayout();
        } else {
          await s[1].createRuntimeLayouts();
        }
      }
    }
    if (this.group) {
      for (const s of this.group) {
        await s[1].createRuntimeLayouts();
      }
    }
    if (this.dynamic) {
      await this.dynamic[1].createRuntimeLayouts();
    }
    if (this.parallel) {
      await this.parallel[1].createRuntimeLayouts();
    }
  }
}
export class FileSystemRouter {
  private files: string[] = [];

  private routesMap = new Storage();

  constructor({ dir = "./pages" }: FileSystemRouterArgs) {
    this.files = getAllPagesPaths(dir);
    console.table(this.files);
    for (const file of this.files) {
      this.routesMap.add(file);
    }
  }
  async createRuntimeLayouts() {
    $`mkdir ./dist/runtime`;
    await this.routesMap.createRuntimeLayouts();
  }
  match(url: string) {
    return this.routesMap.find(url);
  }
}
