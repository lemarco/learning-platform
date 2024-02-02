import { isBrowser } from "./env";

export function isSmallScreen(): boolean {
  return isBrowser() && window.innerWidth < 768;
}
