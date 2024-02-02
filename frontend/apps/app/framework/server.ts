import { $ } from "bun";
import path, { resolve } from "node:path";
import { readdirSync } from "node:fs";
import { builder, fileMap } from "./builder";
import {
	allNamesInFolder,
	filterFolders,
	filterTsFiles,
	getLastElement,
	getMime,
	hasExt,
	isClient,
	isJs,
	isLayout,
	isPage,
	isServer,
} from "./utils";
import { FileSystemRouter, Node as FileNode } from "./router";
import { watcher } from "./watcher";

// const buildTemplate = async (path: string[]) => {
// 	let currentTemplate = "";
// 	let link = fileMap;
// 	for (let i = 0; i < path.length; i++) {
// 		const chunk = path[i];
// 		const isInnerLayout = link[chunk] && link["layout.ts"];
// 		if (isInnerLayout) {
// 			const innerLayout = await (await import(link["layout.ts"])).server();
// 			if (currentTemplate) {
// 				currentTemplate = currentTemplate.replace("<!--slot-->", innerLayout);
// 			} else {
// 				currentTemplate = innerLayout;
// 			}
// 		}

// 		link = link[chunk];
// 	}
// 	return currentTemplate;
// };
// const getPageFiles = async (path: string[]) => {
// 	let link = fileMap;
// 	const clientScripts: string[] = [];
// 	let currentPath = "";
// 	for (const chunk of path) {
// 		currentPath += chunk;
// 		if (link["client.ts"]) {
// 			clientScripts.push(link["client.ts"]);
// 		}
// 		if (!link[chunk] || chunk.endsWith(".ts")) {
// 			return {
// 				clientScripts,
// 				server: link["index.ts"]
// 					? await (await import(link["index.ts"])).server()
// 					: "",
// 			};
// 		}
// 		link = link[chunk];
// 	}
// 	return null;
// };

const startBuild = async (path = "./pages", outpath = "./dist") => {
	const list = (await allNamesInFolder(path)).filter(Boolean);
	if (list.length) {
		const jsFiles = filterTsFiles(list);
		for (const file of jsFiles) {
			await builder(`${path}/${file}`, `${outpath}`);
		}
		const folders = filterFolders(list);
		for (const folder of folders) {
			await $`mkdir -p ${outpath}/${folder}`;
			await startBuild(`${path}/${folder}`, `${outpath}/${folder}`);
		}
	}
};

type ServerArgs = {
	port: number;
	routes?: string;
	base?: string;
	dist?: string;
	watch?: boolean;
	i18n?: boolean;
	i18nResources?: string;
};
// const getScriptSrc = (url: string): string => {
// 	return "";
// };
const getScriptContent = async (url: string): Promise<string> => {
	// console.log("getScriptContent = ", `./dist${url}`);
	return await Bun.file(`./dist${url}`).text();
};
const handleStatic = async () => {
	return { type: "", file: "" };
};
const generateSupportedLanguages = (resourcesPath = "./i18n"): string[] => {
	const paths = readdirSync(resourcesPath);
	//console.log("generateSupportedLanguages = ", paths);
	return paths;
};

const generateI18nRedirect = (
	headers: Headers,
	base: string,
	replaced: string,
) => {
	const langHeader = headers.get("accept-language");
	const lang = langHeader?.slice(0, 2) || "en";

	console.log("langHeader -=", lang);
	const redirrectUrl = `${base}/${lang}${replaced}`;
	console.log("redirect = ", redirrectUrl);
	return redirrectUrl;
};

const prepareScriptsToDistPaths = (
	paths: string[] | string,
	dist: string,
): string[] => {
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
			// console.log("withoutFile= ", withoutFile);
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
			// console.log(baseRelative);
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

// const prepareClientScriptsToDistPaths = (
// 	paths: string[] | string,
// 	dist: string,
// ) => {};
// const addScriptsToTampate = (template: string, scripts: string[])=>{
// 	// let base = "";
// 	for (const s of scripts) {

// 		// const { layout } = await import(l);
// 		// if (!base) {
// 		// 	base = await layout();
// 		// 	continue;
// 		// }

// 	}
//     template.replace("<!--slot-->", await layout());
// }
const processLayouts = async (template: string, layouts: string[]) => {
	let base = "";
	for (const l of layouts) {
		//console.log("current layout = ", l);
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

export const server = async ({
	port,
	routes: dir = "./pages",
	dist = "./dist",
	base = "http://localhost:3000",
	watch = false,
	i18n = false,
	i18nResources = resolve("./i18n"),
}: ServerArgs) => {
	const router = new FileSystemRouter({
		base,
		dir,
	});
	const template = await Bun.file("./index.html").text();
	await startBuild(dir, dist);
	if (watch) {
		watcher({ dir, dist });
	}
	const supportedLanguages: string[] = i18n
		? generateSupportedLanguages(i18nResources)
		: [];
	Bun.serve({
		port,
		async fetch(req) {
			const replaced = req.url.replace(base, "");
			//console.log("CURRENT REQUEST to ", replaced);
			const splitted = replaced.split("/").filter(Boolean);
			let isRoot = false;
			//	console.log("SPLITTED = ", splitted);
			if (!splitted.length) {
				isRoot = true;
			}
			if (!isRoot) {
				const lastElem = getLastElement(replaced);
				//		console.log(" EXTENSION = ", lastElem);

				if (hasExt(lastElem)) {
						console.log("REQUEST WITH EXTENSION");
					if (isJs(lastElem)) {
						//	console.log("REQUEST WITH JS EXTENSION =", replaced);
						const script = await getScriptContent(replaced);
						return new Response(script, {
							headers: { "Content-type": "application/javascript" },
						});
					}
					console.log("REQUEST WITH EXTENSION 2");
					const { file, type } = await handleStatic();
					console.log("file = ",req.url)
					const mime = getMime(type);
					return new Response(await Bun.file('./dist/styles.css'), {
						headers: { "Content-type": "text/css" },
					});
				}
			}
			if ((i18n && !supportedLanguages.includes(splitted[0])) || !splitted[0]) {
				return Response.redirect(
					generateI18nRedirect(req.headers, base, replaced),
				);
				// const langHeader = req.headers.get("accept-language");
				// const lang = langHeader?.slice(0, 2) || "en";

				// console.log("langHeader -=", lang);
				// const redirrectUrl = `${base}/${lang}${replaced}`;
				// console.log("redirect = ", redirrectUrl);
				// return Response.redirect(redirrectUrl);
			}
			// console.log(req);
			//  accept-language

			const res = router.match(replaced || "/");

			if (!res) {
				return new Response("404!");
			}
			// const node = {
			// 	match: matchedPath,
			// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			// 	paths: [] as any,
			// };
			// // biome-ignore lint/style/noNonNullAssertion: <explanation>
			// for (const route of this.parallel!) {
			// 	if (route[0] !== this.name) {
			// 		const clientScriptSrc = route[1].clients?.at(-1);
			// 		const layoutScriptSrc = route[1].layouts?.at(-1);
			// 		// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// 		const pageScriptSrc = route[1].path!;
			// 		node.paths.push({
			// 			layout:
			// 				matchedPath.layouts?.at(-1) === layoutScriptSrc
			// 					? undefined
			// 					: layoutScriptSrc,
			// 			client:
			// 				matchedPath.clients?.at(-1) === clientScriptSrc
			// 					? undefined
			// 					: clientScriptSrc,
			// 			path: pageScriptSrc,
			// 		});
			// 	}
			// }
			// return {
			// 	parallelMatch: true,
			// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			// 	node: node as any,
			// };
			//@ts-ignore
			// if (res.parallelMatch) {
			// 	//@ts-ignore
			// 	const match = res.node.match as unknown as FileNode;
			// 	const matchClientsOrig = match.clients ? Array.from(match.clients) : [];
			// 	const matchLayoutsOrig = match.layouts ? Array.from(match.layouts) : [];
			// 	const matchPathOrig = match.path;
			// 	const matchName = match.name;

			// 	//@ts-ignore
			// 	const otherParallels = res.node.paths as {
			// 		name: string;
			// 		client?: string;
			// 		layout?: string;
			// 		path: string;
			// 	}[];
			// 	const processedLayoutsForParallels = [] as {
			// 		name: string;
			// 		html: string;
			// 	}[];
			// 	for (const p of otherParallels) {
			// 		if (p.client) {
			// 			matchClientsOrig.push(p.client);
			// 		}
			// 		let layout = "";
			// 		if (p.layout) {
			// 			const { layout: l } = await import(p.layout);
			// 			layout = await l();
			// 		}
			// 		const { server: s } = await import(p.path);
			// 		const serverHtml = await s();
			// 		processedLayoutsForParallels.push({
			// 			name: p.name,
			// 			html: layout
			// 				? layout.replace("<!--slot-->", serverHtml)
			// 				: serverHtml,
			// 		});
			// 	}

			// 	console.log();
			// 	// const nodes = res.parallel.entries();
			// }

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
				//console.log("paralles = ", paralles);
				let baseCommonLayout = "";
				const commonLayouts = cl?.length
					? prepareScriptsToDistPaths(cl, dist)
					: [];

				const clients = prepareScriptsToDistPaths(clientsOrig, dist);

				if (commonLayouts?.length) {
					for (const l of commonLayouts) {
						const { layout } = await import(l);
						const renderedLayout = await layout();

						if (baseCommonLayout) {
							baseCommonLayout = baseCommonLayout.replace(
								"<!--slot-->",
								renderedLayout,
							);
						} else {
							baseCommonLayout = renderedLayout;
						}
					}
				}

				for (const [name, path] of paralles) {
					const preparedPath = prepareScriptsToDistPaths(path, dist);
					const { server } = await import(preparedPath[0]);
					const serverHtml = await server();
					//	console.log("serverHtml =", serverHtml);
					const thisNameLayouts = parallelLayouts?.[name];
					let thisNameLayout = "";
					if (thisNameLayouts) {
						for (const l of thisNameLayouts) {
							const { layout } = await import(l);
							if (thisNameLayout) {
								thisNameLayout = thisNameLayout.replace(
									"<!--slot-->",
									await layout(),
								);
							} else {
								thisNameLayout = await layout();
							}
						}
					}

					if (thisNameLayout) {
						thisNameLayout = thisNameLayout.replace("<!--slot-->", serverHtml);
					}

					// if (name === "@right") {
					// 	console.log("NEMED SLOT =", `<!--${name}-->`);
					// }
					baseCommonLayout = baseCommonLayout.replace(
						`<!--${name}-->`,
						thisNameLayout,
					);
				}
				//	console.log("baseCommonLayout =", baseCommonLayout);
				const allDeferScripts =
					clients
						.map((client) => `<script src="${base}/${client}"  defer></script>`)
						.join("") || "";
				//		console.log("----------------------");
				//			console.log("allDeferScripts = ", allDeferScripts);
				//			console.log("----------------------");
				// console.log("BEFORE HTML = ", baseCommonLayout);
				const html = template
					.replace("<!--app-client-->", allDeferScripts)
					.replace("<!--app-html-->", baseCommonLayout);
				//console.log("html = ", html);
				return new Response(html, {
					headers: { "Content-type": "text/html" },
				});
			}
			//		console.log("MATCHED!!!!=", res);
			//		console.log(clientsOrig);
			//		console.log(layoutsOrig);
			const clients = prepareScriptsToDistPaths(clientsOrig, dist);
			const layouts = prepareScriptsToDistPaths(layoutsOrig, dist);
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const path = prepareScriptsToDistPaths(pathOrig!, dist);
			//console.log("AFTER PROCESSING");
			// console.log("clients = ", clients);
			// console.log("layouts = ", layouts);
			// console.log("path = ", path);
			// console.log("clients = ", clients);
			const allDeferScripts =
				clients
					.map((client) => `<script src="${base}/${client}" defer></script>`)
					.join("") || "";
			//	console.log("AFTER SCRIPTS PROCESSING");
			const finalLayout = await processLayouts(
				template.replace("<!--app-client-->", allDeferScripts),

				layouts,
			);
			//	console.log("AFTER FINAL LAYOUT PROCESSIND PROCESSING");
			const html = await addPageToLayout(finalLayout, path[0]);
			//	console.log("AFTE PAGE PROCESSING!!!");
			return new Response(html, {
				headers: { "Content-type": "text/html" },
			});
			// console.log(res);
			// if (path) {
			// 	//@ts-ignore
			// 	const splittedPath = path.scriptSrc.split("/");
			// 	// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// 	const data = await getPageFiles(splittedPath)!;
			// 	if (data) {
			// 		const { clientScripts, server } = data;
			// 		const layout = await buildTemplate(splittedPath);
			// 		const replacedLayout = layout.replace("<!--slot-->", server);
			// 		const scriptsWrapped =
			// 			clientScripts
			// 				.map((client) => `<script src=${base}/${client} defer></script>`)
			// 				.join("") || "";

			// 		const html = template
			// 			// .replace("<!--app-head-->", rendered.head ?? "")
			// 			.replace("<!--app-html-->", replacedLayout ?? "")
			// 			.replace("<!--app-client-->", scriptsWrapped);
			// 		return new Response(html, {
			// 			headers: { "Content-type": "text/html" },
			// 		});
			// 	}
			// }
			// if (req.url.endsWith(".js")) {
			// 	req.url.split("/");
			// 	const file = await Bun.file(`./dist${replaced}`).text();

			// 	return new Response(file, {
			// 		headers: { "Content-type": "application/javascript" },
			// 	});
			// }
			// req.referrer;
			// return new Response("404!");
		},
	});
};
