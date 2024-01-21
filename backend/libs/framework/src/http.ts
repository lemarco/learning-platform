export const parseParams = (params: string) => Object.fromEntries(new URLSearchParams(params));

export const parseCookies = (cookie: string) => {
  const values = [];
  const items = cookie.split(";");
  for (const item of items) {
    const [key, val = ""] = item.split("=");
    values.push([key.trim(), val.trim()]);
  }
  return Object.fromEntries(values);
};

export const receiveBody = async (stream: ReadableStream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const IPV4_OCTETS = 4;

export const ipToInt = (ip: string) => {
  if (typeof ip !== "string") return Number.NaN;
  const bytes = ip.split(".");
  if (bytes.length !== IPV4_OCTETS) return Number.NaN;
  let res = 0;
  for (const byte of bytes) {
    res = res * 256 + parseInt(byte, 10);
  }
  return res;
};

const MAX_32_BIT = 0xffffffff;

export const intToIp = (int: number) => {
  if (!Number.isInteger(int) || int < 0 || int > MAX_32_BIT) {
    throw new Error("Invalid integer for IPv4 address");
  }
  const octets = new Array(IPV4_OCTETS);
  for (let i = 0; i < IPV4_OCTETS; i++) {
    const shift = 8 * (IPV4_OCTETS - 1 - i);
    octets[i] = (int >>> shift) & 0xff;
  }
  return octets.join(".");
};

type httpApiCallArgs = { method?: string; body?: Buffer; headers?: Record<string, string> };

export const httpApiCall = async <T>(url: string, args: httpApiCallArgs | undefined = undefined): Promise<T | null> => {
  const mimeType = "application/json";
  const defaultHeaders = { "Content-Type": mimeType };
  const headers = args?.headers ? { ...defaultHeaders, ...args.headers } : defaultHeaders;

  const res = await fetch(url, { method: args?.method || "GET", headers, body: args?.body }).catch(() => null);
  if (res?.status !== 200) {
    return null;
  }
  const json = (await res.json()) as T;
  return json;
};

export const cookiesExtractor = (cookiesHeader: string) => {
  const cookies: Record<string, string> = {};
  if (cookiesHeader) {
    const splitted = cookiesHeader.split(";");
    for (const cookie of splitted) {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
    }
  }
  return cookies;
};
