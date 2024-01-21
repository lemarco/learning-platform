export const CAN_USE_DOM: boolean =
  typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
export function isSmallScreen(): boolean {
  return isBrowser() && window.innerWidth < 768;
}
