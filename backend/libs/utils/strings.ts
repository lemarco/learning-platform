export const replace = (str: string, substr: string, newstr: string) => {
  if (substr === "") return str;
  let src = str;
  let res = "";
  do {
    const index = src.indexOf(substr);
    if (index === -1) return res + src;
    const start = src.substring(0, index);
    src = src.substring(index + substr.length, src.length);
    res += start + newstr;
    // biome-ignore lint/correctness/noConstantCondition: good case for using such like this
  } while (true);
};

export const between = (str: string, prefix: string, suffix: string) => {
  let i = str.indexOf(prefix);
  if (i === -1) return "";
  let s = str.substring(i + prefix.length);
  if (suffix) {
    i = s.indexOf(suffix);
    if (i === -1) return "";
    s = s.substring(0, i);
  }
  return s;
};

export const split = (s: string, separator: string) => {
  const i = s.indexOf(separator);
  if (i < 0) return [s, ""];
  return [s.slice(0, i), s.slice(i + separator.length)];
};

export const inRange = (x: number | string, min: number | string, max: number | string) => x >= min && x <= max;

export const isFirstUpper = (s: string) => !!s && inRange(s[0], "A", "Z");

export const isFirstLower = (s: string) => !!s && inRange(s[0], "a", "z");

export const isFirstLetter = (s: string) => isFirstUpper(s) || isFirstLower(s);

export const toLowerCamel = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const toUpperCamel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const toLower = (s: string) => s.toLowerCase();

export const toCamel = (separator: string) => (s: string) => {
  const words = s.split(separator);
  const first = words.length > 0 ? words.shift()?.toLowerCase() : "";
  return first + words.map(toLower).map(toUpperCamel).join("");
};

export const spinalToCamel = toCamel("-");

export const snakeToCamel = toCamel("_");

export const isConstant = (s: string) => s === s.toUpperCase();

export const fileExt = (fileName: string) => {
  const dot = fileName.lastIndexOf(".");
  const slash = fileName.lastIndexOf("/");
  if (slash > dot) return "";
  return fileName.substring(dot + 1, fileName.length).toLowerCase();
};

export const trimLines = (s: string) => {
  const chunks = s.split("\n").map((d: string) => d.trim());
  return chunks.filter((d) => d !== "").join("\n");
};
