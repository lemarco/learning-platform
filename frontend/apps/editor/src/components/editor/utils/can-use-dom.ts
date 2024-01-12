export const CAN_USE_DOM =
  typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";

export const IS_APPLE: boolean = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

import { useEffect, useLayoutEffect } from "react";

export const useLayoutEffectImpl: typeof useLayoutEffect = CAN_USE_DOM ? useLayoutEffect : useEffect;

export function invariant(cond?: boolean, message?: string, ...args: string[]): asserts cond {
  if (cond) {
    return;
  }

  throw new Error(
    "Internal Lexical error: invariant() is meant to be replaced at compile " + "time. There is no runtime version. Error: " + message,
  );
}
