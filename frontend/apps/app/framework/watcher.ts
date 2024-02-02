import { builder } from "./builder";
import { watch } from "fs";

type WatcherArgs = {
	dir?: string;
	dist?: string;
};
export const watcher = ({ dir = "./pages", dist = "./dist" }: WatcherArgs) => {
	watch("./pages", { recursive: true }, async (event, filename) => {
		const splitted = filename?.split("/");

		if (splitted) {
			splitted.pop();
			const outdir = splitted.join("/");
			await builder(`${dir}/${filename}`, `${dist}/${outdir}`);
		}
	});
};
