import { getFolderList, rm } from "./utils";

const frontendApps = await getFolderList("./frontend/apps");
const backendApps = await getFolderList("./backend/apps");
const frontendLibs = await getFolderList("./frontend/libs");
const backendLibs = await getFolderList("./backend/libs");

export const clean = async () => {
  await Promise.all(
    [
      "./bun.lockb",
      "./node_modules",
      ...frontendApps.map((p) => `./frontend/apps/${p}/node_modules`),
      ...backendApps.map((p) => `./backend/apps/${p}/node_modules`),
      ...frontendLibs.map((p) => `./frontend/libs/${p}/node_modules`),
      ...backendLibs.map((p) => `./backend/libs/${p}/node_modules`),
    ].map(rm),
  );
};
