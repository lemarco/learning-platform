import { isClient, isDot, isLayout, isServer } from "./utils";
type RouteObj = {
	"client.ts"?: string;
	"index.ts"?: string;
	"layout.ts"?: string;
};
export const fileMap = {};
const getRelatedPath = (file: string) => {
	const splitted = file.split("/");
	const idx = splitted.findIndex((v) => v === "dist");
	if (idx !== -1) {
		for (let i = 0; i <= idx; i++) {
			splitted[i] = "";
		}
	}
	const scriptSrc = splitted.filter(Boolean).join("/");
	return scriptSrc;
};
export const builder = async (input: string, outPath: string) => {
	const output = await Bun.build({
		entrypoints: [input],
		outdir: outPath,
		format: "esm",
		minify: true,
		naming: {
			entry: "[dir]/[name].[hash].[ext]",
		},
	});


	if (isClient(input)) {
		await Bun.write(
			output.outputs[0].path,
			(await Bun.file(output.outputs[0].path).text()).replace(
				/export{([a-zA-Z]) as client};/g,
				(_, letter) => `${letter}()`,
			),
		);
	} else {
		await Bun.write(
			output.outputs[0].path,
			(await Bun.file(output.outputs[0].path).text())
				.replace(/[\t\n]/g, "")
				.replaceAll('className=""', ""),
		);
	}

	const path = input.split("/").filter((v) => !isDot(v) && v !== "pages");
	if (path.length === 1) {
		if (isClient(input)) {
			const scriptSrc = getRelatedPath(output.outputs[0].path);
			fileMap[path[0]] = scriptSrc;
			return;
		}
		fileMap[path[0]] = output.outputs[0].path;
	} else {
		let link = fileMap;
		for (let i = 0; i < path.length; i++) {
			const isLast = path.length - 1 === i;
			const file = output.outputs[0].path;
			if (isLast) {
				if (isClient(input)) {
					const scriptSrc = getRelatedPath(file);

					link["client.ts"] = scriptSrc;
					return;
				}
				if (isServer(input)) {
					link["index.ts"] = file;
					return;
				}
				if (isLayout(input)) {
					link["layout.ts"] = file;
					return;
				}
			}
			if (!link[path[i]]) {
				link[path[i]] = {} as RouteObj;
			}
			link = link[path[i]];
		}
	}
};
