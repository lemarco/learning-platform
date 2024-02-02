export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
export const isServer = typeof window === "undefined";
