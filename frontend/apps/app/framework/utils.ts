import { readdirSync, existsSync } from "node:fs";
import { $ } from "bun";
export const isClient = (input) => input.split("/").at(-1) === "client.ts";
export const isServer = (input) => input.split("/").at(-1) === "page.ts";
export const isLayout = (input) => input.split("/").at(-1) === "layout.ts";
export const isDot = (input: string) => input === ".";
const FileTypes = [
	"layout.ts",
	"client.ts",
	"page.ts",
	"loader.ts",
	"error.ts",
] as const;
const FolderTypes = ["[", "(", "@"] as const;
export const isGroup = (url: string) => url.startsWith("(");
export const isParallel = (url: string) => url.startsWith("@");
export const isRootFile = (splitted: string[]) => splitted.length === 1;
export const isFolder = (file: string) => !file.endsWith(".ts");
export const isDynamicFolder = (file: string) =>
	isFolder(file) && FolderTypes.some((prefix) => file.startsWith(prefix));
export const isFile = (file: string) => file.endsWith(".ts");
export const isFileToMatch = (file: string) =>
	isFile(file) && FileTypes.some((type) => file === type);
export const removeBase = (url: string, base: string) => url.replace(base, "");
export const splitUrl = (url: string) => url.split("/");
export const removeBaseAndSplit = (url: string, base: string) =>
	splitUrl(removeBase(url, base)).filter(Boolean);
export const getAllFilesPaths = (dir = "./pages") =>
	readdirSync(dir, { recursive: true });
export const isPage = (path: string | Buffer) =>
	(path as string).endsWith("page.ts");
export const getAllPagesPaths = (dir = "./pages") =>
	getAllFilesPaths(dir).filter(isPage).filter(Boolean) as string[];

export const ls = async (path: string) => await $`ls ./${path}`.text();
export const allNamesInFolder = async (path: string) =>
	(await ls(path)).split("\n");

export const isTsOrTsx = (file: string) =>
	file.endsWith(".tsx") || file.endsWith(".ts");

export const filterTsFiles = (list: string[]) => list.filter(isTsOrTsx);
export const filterFolders = (list: string[]) =>
	list.filter((file) => !isTsOrTsx(file));
export const getLastElement = (path) => path.split("/").filter(Boolean).at(-1);
export const hasExt = (path) => path.includes(".");
export const isJs = (ext) => ext.endsWith(".js");

const mimeTypes = {};
export const getMime = (type: string) => {
	return mimeTypes[type] || "text/plain";
};
