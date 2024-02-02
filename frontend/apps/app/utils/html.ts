export function html(
	strings: TemplateStringsArray,
	...args: unknown[]
): string {
	let result = "";
	const argsLength = args.length;
	let counterBefore = 0;
	while (counterBefore < argsLength) {
		result += strings[counterBefore] + args[counterBefore];
		counterBefore++;
	}
	let counterAfter = argsLength;
	while (counterAfter < strings.length) {
		result += strings[counterAfter];
		counterAfter++;
	}

	return result;
}
