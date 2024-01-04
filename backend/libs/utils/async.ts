import { E } from "./error";

export const timeout = (msec: number, signal: AbortSignal) =>
  new Promise((_, reject) => {
    const timer = setTimeout(() => {
      reject(new E(`Timeout of ${msec}ms reached`, "ETIMEOUT"));
    }, msec);
    if (!signal) return;
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new E("Timeout aborted"));
    });
  });

export const delay = (msec: number, signal: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, msec);
    if (!signal) return;
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new E("Delay aborted"));
    });
  });

export const timeoutify = (promise: Promise<unknown>, msec: number) =>
  new Promise((resolve, reject) => {
    let timer: Timer | null = setTimeout(() => {
      timer = null;
      reject(new E(`Timeout of ${msec}ms reached`, "ETIMEOUT"));
    }, msec);
    promise.then(
      (result) => {
        if (!timer) return;
        clearTimeout(timer);
        resolve(result);
      },
      (error) => {
        if (!timer) return;
        clearTimeout(timer);
        reject(error);
      },
    );
  });
