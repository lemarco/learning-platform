/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore-file

import { useEffect, useLayoutEffect } from "react";

export const CAN_USE_DOM =
  typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";

export function caretFromPoint(x, y) {
  if (typeof document.caretRangeFromPoint !== "undefined") {
    const range = document.caretRangeFromPoint(x, y);
    if (range === null) {
      return null;
    }
    return {
      node: range.startContainer,
      offset: range.startOffset,
    };
    // @ts-ignore
  } else if (document.caretPositionFromPoint !== "undefined") {
    // @ts-ignore FF - no types
    const range = document.caretPositionFromPoint(x, y);
    if (range === null) {
      return null;
    }
    return {
      node: range.offsetNode,
      offset: range.offset,
    };
  } else {
    // Gracefully handle IE
    return null;
  }
}

const documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;

export const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export const IS_FIREFOX = CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);

export const CAN_USE_BEFORE_INPUT =
  CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;

export const IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);

export const IS_IOS =
  CAN_USE_DOM &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  // @ts-ignore
  !window.MSStream;

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
export const IS_CHROME = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
// export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;

export const IS_APPLE_WEBKIT = CAN_USE_DOM && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !IS_CHROME;

export function invariant(cond, message, ...args) {
  if (cond) {
    return;
  }

  throw new Error(
    "Internal Lexical error: invariant() is meant to be replaced at compile " + "time. There is no runtime version. Error: " + message,
  );
}

export function simpleDiffWithCursor(a, b, cursor) {
  const aLength = a.length;
  const bLength = b.length;
  let left = 0; // number of same characters counting from left
  let right = 0; // number of same characters counting from right
  // Iterate left to the right until we find a changed character
  // First iteration considers the current cursor position
  while (left < aLength && left < bLength && a[left] === b[left] && left < cursor) {
    left++;
  }
  // Iterate right to the left until we find a changed character
  while (right + left < aLength && right + left < bLength && a[aLength - right - 1] === b[bLength - right - 1]) {
    right++;
  }
  // Try to iterate left further to the right without caring about the current cursor position
  while (right + left < aLength && right + left < bLength && a[left] === b[left]) {
    left++;
  }
  return {
    index: left,
    insert: b.slice(left, bLength - right),
    remove: aLength - left - right,
  };
}

export const useLayoutEffectImpl = CAN_USE_DOM ? useLayoutEffect : useEffect;

export function warnOnlyOnce(message) {
  //   if (!__DEV__) {
  //     return;
  //   }
  let run = false;
  return () => {
    if (!run) {
      console.warn(message);
    }
    run = true;
  };
}
