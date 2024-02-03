import { FileSystemRouter } from "./router";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";
import { fileMap } from "./builder";
import { startBuild } from "./builder";
import { watcher } from "./watcher";

export type ServerArgs = {
  routes?: string;
  base?: string;
  dist?: string;
  watch?: boolean;
  i18n?: boolean;
  i18nResources?: string;
};
type RuntimeDataStore = {
  template: string;
  supportedLanguages: string[];
  base: string;
  dir: string;
  dist: string;
  router: FileSystemRouter | null;
  i18n: boolean;
};
export const runtimeDataStore: RuntimeDataStore = {
  template: "",
  supportedLanguages: [] as string[],
  base: "http://localhost:3000",
  dir: "./pages",
  dist: "./dist",
  router: null,
  i18n: false,
};
const generateSupportedLanguages = (resourcesPath = "./i18n"): string[] => {
  const paths = readdirSync(resourcesPath);
  return paths;
};

export const config = async ({
  routes: dir = "./pages",
  dist = "./dist",
  base = "http://localhost:3000",
  watch = false,
  i18n = false,
  i18nResources = resolve("./i18n"),
}: ServerArgs) => {
  runtimeDataStore.router = new FileSystemRouter({
    base,
    dir,
  });
  runtimeDataStore.template = await Bun.file("./index.html").text();
  await startBuild(dir, dist);
  await runtimeDataStore.router.createRuntimeLayouts();

  console.log("fileMap = ", fileMap);
  if (watch) {
    watcher({ dir, dist });
  }
  if (base) {
    runtimeDataStore.base = base;
  }
  if (dir) {
    runtimeDataStore.dir = dir;
  }
  if (dist) {
    runtimeDataStore.dist = dist;
  }
  runtimeDataStore.i18n = Boolean(i18n);
  runtimeDataStore.supportedLanguages = i18n ? generateSupportedLanguages(i18nResources) : ([] as string[]);
};
