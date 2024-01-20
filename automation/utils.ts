//@ts-expect-error
import { $ } from "bun";
import { access, rmdir } from "node:fs/promises";
export const getFolderList = async (path = "./") => ((await $`ls ${path}`.text()) as string).split("\n").filter(Boolean);
export const pwd = async () => console.log("Current directory: ", await $`pwd`.text());
export const rm = async (path: string) => {
  try {
    console.log(`deleting ${path} ...`);
    await access(path);
    await rmdir(path, { recursive: true });
  } catch (e) {
    console.log(`No such file or access ${path} ...`);
  }
};
