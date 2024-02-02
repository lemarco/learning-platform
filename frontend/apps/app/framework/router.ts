import { $ } from "bun";
import { watch } from "fs";
import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { builder, fileMap } from "./builder";
import {
	getAllPagesPaths,
	isDynamicFolder,
	isFile,
	isGroup,
	isParallel,
	splitUrl,
} from "./utils";
type FileSystemRouterArgs = {
	dir?: string;
	base?: string;
};

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

	constructor({
		isLeaf,
		path,
		name,
		clients,
		layouts,
		parallelPaths,
		parallelLayouts,
		commonLayouts,
	}: NewNodeArgs) {
		this.isLeaf = isLeaf;
		this.name = name;
		this.clients = clients;
		this.layouts = layouts;
		this.path = path;
		this.parallelPaths = parallelPaths;
		this.parallelLayouts = parallelLayouts;
		this.commonLayouts = commonLayouts;
	}
	// private processParrallelMatch(
	// 	urlSegments: string[],
	// 	matchedPath: Node,
	// ): { parallelMatch: boolean; node: Node } {
	// 	console.log("urlSegments = ", urlSegments);
	// 	console.log("matchedPath = ", matchedPath);
	// 	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// 	const allParalles = Array.from(this.parallel?.keys()!);
	// 	console.log("ALL PARALELS = ", allParalles);
	// 	console.log("MATCHED PARENT", matchedPath.path?.split("/").at(-2));
	// 	const isNested = matchedPath.path?.split("/").at(-3) !== this.name;
	// 	if (!isNested) {
	// 		const node = {
	// 			match: matchedPath,
	// 			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 			paths: [] as any,
	// 		};
	// 		// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// 		for (const route of this.parallel!) {
	// 			if (route[0] !== this.name) {
	// 				const clientScriptSrc = route[1].clients?.at(-1);
	// 				const layoutScriptSrc = route[1].layouts?.at(-1);
	// 				// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// 				const pageScriptSrc = route[1].path!;
	// 				node.paths.push({
	// 					layout:
	// 						matchedPath.layouts?.at(-1) === layoutScriptSrc
	// 							? undefined
	// 							: layoutScriptSrc,
	// 					client:
	// 						matchedPath.clients?.at(-1) === clientScriptSrc
	// 							? undefined
	// 							: clientScriptSrc,
	// 					path: pageScriptSrc,
	// 				});
	// 			}
	// 		}
	// 		return {
	// 			parallelMatch: true,
	// 			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 			node: node as any,
	// 		};
	// 		// biome-ignore lint/style/noUselessElse: <explanation>
	// 	} else {
	// 		// TODO: FIND SOLUTION FOR NESTED
	// 	}
	// 	console.log("isNested  = ", isNested);
	// 	return {
	// 		parallelMatch: true,
	// 		node: this,
	// 	};
	// }
	find(urlSegments: string[], idx: number): Node | undefined {
		// console.log("CURRENT SEGMENT in NODE= ", urlSegments[idx]);
		// console.log("CURREENT NODE = ", this.name);
		// if (this.name === "blog") {
		// 	console.log(this);
		// }
		if (this.static) {
			for (const [name, node] of this.static) {
				//	console.log("11111 name = ", name);

				if (name === urlSegments[idx]) {
					//			console.log("222222");
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
			//console.log("IN STORAGE FIND IN DYNAMIC= ", this.group);
			for (const [name, node] of this.group) {
				const matchResult = node.find(urlSegments, idx);
				if (matchResult) {
					return matchResult;
				}
			}
		}

		if (this.parallel) {
			//console.log("IN parallel FIND IN = ", this.parallel);
			const matchResult = this.parallel?.[1].find(urlSegments, idx);
			if (matchResult) {
				return matchResult;
			}
			// if (parallelNode) {
			// 	const matchResult = parallelNode

			// }
			// for (const [name, node] of this.parallel) {
			// 	const matchResult = node.find(urlSegments, idx);

			// 	if (matchResult) {
			// 		// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// 		return this.processParrallelMatch(
			// 			urlSegments,
			// 			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			// 			matchResult,
			// 			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			// 		) as any;
			// 	}
			// }
		}
		return this.dynamic?.[1].find(urlSegments, idx + 1);
	}
	add(urlSegments: string[], idx: number, scripts: Scripts) {
		//console.log("scripts = ", scripts);
		//console.log("URL SEGMENT = " + urlSegments[idx]);
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
		//console.log("SCRIPTS IN NODE ADD = ", scripts);
		//console.log("THIS ====", this);
		if (isFile(currentPart)) {
			if (!this.static) {
				this.static = new Map();
			}
			// console.log(" creating leaf node with name", currentPart);
			// const clientPath = resolve(
			// 	`./pages/${urlSegments.join("/").replace("page.ts", "client.ts")}`,
			// );
			// const client = existsSync(clientPath) ? clientPath : undefined;
			// const layoutPath = resolve(
			// 	`./pages/${urlSegments.join("/").replace("page.ts", "layout.ts")}`,
			// );
			//const layout = existsSync(layoutPath) ? clientPath : undefined;
			if (scripts.parallelSegment) {
				// console.log("scripts.parallelSegment = ", scripts.parallelSegment);
				const node = this.static.get("page.ts");
				// console.log("current part = ", currentPart);
				// console.log("SEARCH IN STATIC  = ", node);

				if (!node) {
					// console.log("CREATING PARALEL NODE");

					let currentLayout = "";
					if (
						existsSync(
							resolve(
								`./pages/${urlSegments.join("/")}`.replace(
									"page.ts",
									"layout.ts",
								),
							),
						)
					) {
						if (scripts.currentLayoutScripts.length) {
							currentLayout = scripts.currentLayoutScripts.pop() as string;
						}
					}
					let currentScript = "";
					if (
						existsSync(
							resolve(
								`./pages/${urlSegments.join("/")}`.replace(
									"page.ts",
									"client.ts",
								),
							),
						)
					) {
						if (scripts.currentClientScripts.length) {
							currentScript = scripts.currentClientScripts.pop() as string;
						}
					}
					const newNode = new Node({
						name: currentPart,
						isLeaf: true,
						// layouts: scripts.currentLayoutScripts,
						clients: [...scripts.currentClientScripts, currentScript],

						parallelPaths: {
							[scripts.parallelSegment]: resolve(
								`./pages/${urlSegments.join("/")}`,
							),
						},
						parallelLayouts: {
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							[scripts.parallelSegment!]: [currentLayout],
						},
						commonLayouts: scripts.currentLayoutScripts,
					});
					this.static.set(currentPart, newNode);
					// console.log("CREATEDPARALEL NODE", newNode);
					return;
				}
				node.parallelPaths = {
					...node.parallelPaths,
					[scripts.parallelSegment]: resolve(
						`./pages/${urlSegments.join("/")}`,
					),
				};

				for (let i = 0; i < scripts.currentLayoutScripts.length; i++) {
					if (node.commonLayouts?.[i] === scripts.currentLayoutScripts[i]) {
						scripts.currentLayoutScripts[i] = "";
						continue;
					}
					// console.log("INDEX = ", i);
					const newCommonLayouts = node.commonLayouts?.slice(0, i) || [];
					// console.log("oldcommonlayouts = ", node.commonLayouts);
					// console.log("newCommonLayouts =", newCommonLayouts);
					let layoutsNeedsMerge: string[] = [];
					if (node.commonLayouts) {
						layoutsNeedsMerge = node.commonLayouts?.slice(i, -1);

						// console.log("layoutsNeedsMerge =", layoutsNeedsMerge);
					}

					scripts.currentLayoutScripts =
						scripts.currentLayoutScripts.filter(Boolean);
					// console.log(
					// 	"node.parallelLayouts  bedore cycle !!!!=",
					// 	node.parallelLayouts,
					// );
					if (node.parallelLayouts) {
						for (const [name, layouts] of Object.entries(
							node.parallelLayouts,
						)) {
							// console.log("previous layouts = ", layouts);
							const newLayouts = [...layoutsNeedsMerge, ...layouts];
							node.parallelLayouts[name] = newLayouts;
						}
						// console.log("previous layouts = ", layouts);
					}
					// console.log(
					// 	"node.parallelLayouts  after cycle !!!!=",
					// 	node.parallelLayouts,
					// );
					// const newLayouts = layoutsNeedsMerge;
					if (!node.parallelLayouts) {
						node.parallelLayouts = {};
					}
					if (scripts.currentClientScripts.length) {
						// biome-ignore lint/complexity/noForEach: <explanation>
						scripts.currentClientScripts.forEach((sc) =>
							node.clients?.includes(sc) ? undefined : node.clients?.push(sc),
						);
					}

					// node.clients?.push(currentScript);
					node.parallelLayouts[scripts.parallelSegment] =
						scripts.currentLayoutScripts;
					// node.parallelLayouts[scripts.parallelSegment] = newLayouts;
					// node.commonLayouts = newCommonLayouts;
					// console.log(
					// 	"node.parallelLayouts  after UPDATE !!!!=",
					// 	node.parallelLayouts,
					// );
					// console.log("UPDATED PARALEL NODE = ", node);
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
					//console.log(" creating dynamic node with name", currentPart);
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
				// console.log("IN PARALELL segemnts = ", urlSegments);

				// console.log("IN PARALELL segemnts idx= ", urlSegments[idx]);

				// console.log("IN PARALELL segemnts idx+= ", urlSegments[idx + 1]);
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
				//console.log("creating dynamic node with name = ", currentPart);
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
			//console.log("creating static node with name = ", currentPart);
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
	print() {
		// if (this.isLeaf) {
		// 	console.log(`Leaf node with name =  ${this.name} and path ${this.path}`);
		// }
		// if (this.static) {
		// 	for (const [, node] of this.static) {
		// 		node.print();
		// 	}
		// }
		// if (this.group) {
		// 	for (const [, node] of this.group) {
		// 		node.print();
		// 	}
		// }
		// if (this.parallel) {
		// 	for (const [name, node] of this.parallel) {
		// 		node.print();
		// 	}
		// }
		// if (this.dynamic) {
		// 	this.dynamic[1].print();
		// }
	}
	// getOwnPath() {
	//     if (this.isLeaf){
	//         return [this.name]
	//     }
	//     const entries =
	// 	return [...Array.from(this.static?.entries()).map((n) => n[1].getOwnPath())]
	// }
	// optimize() {
	// 	if (this.parallel?.size) {
	// 		const nodes = Array.from(this.parallel.entries()).map((n) => n[1]);
	// 		const allPossiblePaths = [];
	//         for (const n of nodes ){
	//             allPossiblePaths.push(n)
	//         }

	// 		console.log("IN PARALELL SIZE NODE");

	// 		console.log("nodes =", nodes);

	// 		// const notLeafNodes = nodes.filter((n) => !n.paths);
	// 	}
	// 	// biome-ignore lint/complexity/noForEach: <explanation>
	// 	this.static?.forEach((node) => node.optimize());
	// 	// biome-ignore lint/complexity/noForEach: <explanation>
	// 	this.group?.forEach((node) => node.optimize());
	// 	this.dynamic?.[1].optimize();
	// }
}
class Storage {
	static?: Map<string, Node>;
	group?: Map<string, Node>;
	dynamic?: [string, Node];
	parallel?: [string, Node];
	add(url: string) {
		const splitted = splitUrl(url);
		// console.log(splitted);
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
		console.log("BEFORE IS FILE STORAGE = ", currentPart);
		if (isFile(currentPart)) {
			if (!this.static) {
				this.static = new Map();
			}
			//console.log("creating leaf node with name = ", currentPart);
			// const client = resolve(`./pages/${url.replace("page.ts", "client.ts")}}`);
			// const layout = resolve(`./pages/${url.replace("page.ts", "layout.ts")}}`);
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
			//	console.log("Storage dynamic for ", currentPart);
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
			// handle @ case of routing
			if (this.dynamic) {
				if (this.dynamic[0] !== currentPart) {
					throw new Error("Cannot be to dynamic [] folders on one level");
				}
			} else {
				// console.log(
				// 	"in storage creating dynamic node with name = ",
				// 	currentPart,
				// );
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
			// console.log("in storage creating static node with name = ", currentPart);
			this.group?.set(currentPart, node);
		}
		node.add(splitted, 1, scripts);
	}
	find(url: string) {
		// biome-ignore lint/style/noParameterAssign: <explanation>
		url += "page.ts";

		//		console.log("IN STORAGE FIND = ", url);
		const splitted = splitUrl(url).filter(Boolean);
		//		console.log("splitted = ", splitted);
		//		console.log("BEFORE IS FILE STORAGE 2 = ", splitted[0]);
		const isSegmentFile = isFile(splitted[0]);
		// console.log("BEFORE isSegmentFile= ", url);
		if (isSegmentFile) {
			const staticNode = this.static?.get(splitted[0]);
			if (staticNode) {
				const matchResult = staticNode.find(splitted, 1);
				if (matchResult) {
					return matchResult;
				}
			}
		}
		// console.log("STORAGE: BEFORE groupNode= ", url);
		const groupNode = this.group?.get(splitted[0]);
		if (groupNode) {
			const matchResult = groupNode.find(splitted, 0);
			if (matchResult) {
				return matchResult;
			}
		}
		// console.log("STORAGE: BEFORE parallelNode= ", url);
		const parallelNode = this.parallel?.[1];
		if (parallelNode) {
			const matchResult = parallelNode.find(splitted, 1);
			if (matchResult) {
				console.log(this);
				return matchResult;
			}
		}
		// console.log("STORAGE STORAGE DYNAMIC= ", url);
		return this.dynamic?.[1]?.find(splitted, 1);
	}
	print() {
		if (this.static) {
			for (const [name, node] of this.static) {
				node.print();
			}
		}
		if (this.group) {
			for (const [name, node] of this.group) {
				node.print();
			}
		}
		// if (this.parallel) {
		// 	for (const [name, node] of this.parallel) {
		// 		node.print();
		// 	}
		// }
		if (this.dynamic) {
			this.dynamic[1].print();
		}
	}
	// optimize() {
	// 	if (this.parallel?.size) {
	// 		console.log("IN PARALELL SIZE SOTRAGE");
	// 	}
	// 	// biome-ignore lint/complexity/noForEach: <explanation>
	// 	this.static?.forEach((node) => node.optimize());
	// 	// biome-ignore lint/complexity/noForEach: <explanation>
	// 	this.group?.forEach((node) => node.optimize());
	// 	this.dynamic?.[1].optimize();
	// }
}
export class FileSystemRouter {
	private files: string[] = [];

	private routesMap = new Storage();

	constructor({ dir = "./pages" }: FileSystemRouterArgs) {
		this.files = getAllPagesPaths(dir);
		console.table(this.files);
		// if someone pass page.ts file in end of url push 404 or error page from root
		// const file = this.files[0];
		// this.routesMap.add(file);
		for (const file of this.files) {
			this.routesMap.add(file);
		}
		//		console.log("full print ----------- start ");
		this.routesMap.print();
		// console.log("full print -----------end ");
		//console.log(this.routesMap.dynamic?.[1].group?.get("(blog)"));
	}
	// optimize() {
	// 	this.routesMap.optimize();
	// 	return this;
	// }
	match(url: string) {
		//	console.log("url in match = ", url);
		return this.routesMap.find(url);
	}
}
