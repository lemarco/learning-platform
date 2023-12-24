export const replace = (str, substr, newstr) => {
  if (substr === "") return str;
  let src = str;
  let res = "";
  do {
    const index = src.indexOf(substr);
    if (index === -1) return res + src;
    const start = src.substring(0, index);
    src = src.substring(index + substr.length, src.length);
    res += start + newstr;
    // eslint-disable-next-line no-constant-condition
  } while (true);
};

export const between = (s, prefix, suffix) => {
  let i = s.indexOf(prefix);
  if (i === -1) return "";
  s = s.substring(i + prefix.length);
  if (suffix) {
    i = s.indexOf(suffix);
    if (i === -1) return "";
    s = s.substring(0, i);
  }
  return s;
};

export const split = (s, separator) => {
  const i = s.indexOf(separator);
  if (i < 0) return [s, ""];
  return [s.slice(0, i), s.slice(i + separator.length)];
};

export const inRange = (x, min, max) => x >= min && x <= max;

export const isFirstUpper = (s) => !!s && inRange(s[0], "A", "Z");

export const isFirstLower = (s) => !!s && inRange(s[0], "a", "z");

export const isFirstLetter = (s) => isFirstUpper(s) || isFirstLower(s);

export const toLowerCamel = (s) => s.charAt(0).toLowerCase() + s.slice(1);

export const toUpperCamel = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const toLower = (s) => s.toLowerCase();

export const toCamel = (separator) => (s) => {
  const words = s.split(separator);
  const first = words.length > 0 ? words.shift().toLowerCase() : "";
  return first + words.map(toLower).map(toUpperCamel).join("");
};

export const spinalToCamel = toCamel("-");

export const snakeToCamel = toCamel("_");

export const isConstant = (s: string) => s === s.toUpperCase();

export const fileExt = (fileName) => {
  const dot = fileName.lastIndexOf(".");
  const slash = fileName.lastIndexOf("/");
  if (slash > dot) return "";
  return fileName.substring(dot + 1, fileName.length).toLowerCase();
};

export const trimLines = (s) => {
  const chunks = s.split("\n").map((d) => d.trim());
  return chunks.filter((d) => d !== "").join("\n");
};
