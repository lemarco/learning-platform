import { $, useOnDocument, useOnWindow, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { isClient } from "../helpers/is-client";
import { useWatchLocalStorageValue } from "../hooks/use-watch-localstorage-value";
import { getThemeMode } from "../theme-store";

const DEFAULT_MODE: ThemeMode = "light";
const LS_THEME_MODE = "flowbite-theme-mode";
const SYNC_THEME_MODE = "flowbite-theme-mode-sync";

export type ThemeMode = "light" | "dark" | "auto";

export const useThemeMode = () => {
  const mode = useSignal<ThemeMode>(getInitialMode(getThemeMode()));

  /**
   * Persist `mode` in local storage and add/remove `dark` class on `html`
   */
  useVisibleTask$(() => {
    setModeInLS(mode.value);
    setModeInDOM(mode.value);
  }); // eslint-disable-line

  /**
   * Sync all tabs with the latest theme mode value
   */

  useOnWindow(
    "storage",
    $(({ key, newValue }) => {
      if (newValue && key === LS_THEME_MODE) {
        return handleSetMode(newValue as ThemeMode);
      }
    }),
  );
  // useWatchLocalStorageValue({
  //   key: LS_THEME_MODE,
  //   onChange(newValue) {
  //     if (newValue) return handleSetMode(newValue as ThemeMode);
  //   },
  // });

  /**
   * Keep the other instances of the hook in sync (bi-directional)
   */

  useOnDocument(
    SYNC_THEME_MODE,
    $((e) => {
      const nm = (e as CustomEvent<ThemeMode>).detail;
      mode.value = nm;
    }),
  );
  // useSyncMode((nm) => (mode.value = nm));

  // useVisibleTask$(() => {});
  // const useSyncMode = (onChange: (mode: ThemeMode) => void) => {
  //   useEffect(() => {
  //     function handleSync(e: Event) {
  //       const mode = (e as CustomEvent<ThemeMode>).detail;

  //       onChange(mode);
  //     }

  //     document.addEventListener(SYNC_THEME_MODE, handleSync);
  //     return () => document.removeEventListener(SYNC_THEME_MODE, handleSync);
  //   }, []); // eslint-disable-line
  // };
  /**
   * Sets `mode` to a given value: `light | dark` | `auto`
   */
  const handleSetMode = (nm: ThemeMode) => {
    mode.value = nm;
    setModeInLS(nm);
    setModeInDOM(nm);
    document.dispatchEvent(new CustomEvent(SYNC_THEME_MODE, { detail: mode }));
  };

  /**
   * Toggles between: `light | dark`
   */
  const toggleMode = () => {
    if (mode.value === "auto") mode.value = computeModeValue(mode.value);

    mode.value = mode.value === "dark" ? "light" : "dark";

    handleSetMode(mode.value);
  };

  /**
   * Sets the value to `<Flowbite theme={{ mode }}>` prop
   */
  const clearMode = () => {
    const newMode = getThemeMode() ?? DEFAULT_MODE;

    handleSetMode(newMode);
  };

  return { mode, computedMode: computeModeValue(mode.value), setMode: handleSetMode, toggleMode, clearMode };
};

/**
 * Custom event listener on `SYNC_THEME_MODE`
 */
// const useSyncMode = (onChange: (mode: ThemeMode) => void) => {
//   useEffect(() => {
//     function handleSync(e: Event) {
//       const mode = (e as CustomEvent<ThemeMode>).detail;

//       onChange(mode);
//     }

//     document.addEventListener(SYNC_THEME_MODE, handleSync);
//     return () => document.removeEventListener(SYNC_THEME_MODE, handleSync);
//   }, []); // eslint-disable-line
// };

/**
 * Sets the give value in local storage
 */
const setModeInLS = (mode: ThemeMode) => localStorage.setItem(LS_THEME_MODE, mode);

/**
 * Add or remove class `dark` on `html` element
 */
const setModeInDOM = (mode: ThemeMode) => {
  const computedMode = computeModeValue(mode);

  if (computedMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const getInitialMode = (defaultMode?: ThemeMode): ThemeMode => {
  if (!isClient()) return DEFAULT_MODE;

  const LSMode = localStorage.getItem(LS_THEME_MODE) as ThemeMode | undefined;

  return LSMode ?? defaultMode ?? DEFAULT_MODE;
};

/**
 * Parse `auto` mode value to either `light` or `dark`
 * @returns `light` | `dark`
 */
const computeModeValue = (mode: ThemeMode): ThemeMode => {
  return mode === "auto" ? prefersColorScheme() : mode;
};

/**
 * Get browser prefered color scheme
 * @returns `light` | `dark`
 */
const prefersColorScheme = (): ThemeMode => {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
