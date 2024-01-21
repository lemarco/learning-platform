import { $, useOnWindow } from "@builder.io/qwik";

/**
 * Triggers `onChange` when another browser tab instance mutates the LS value.
 */
export const useWatchLocalStorageValue = ({
  key: watchKey,
  onChange,
}: {
  key: string;
  onChange(newValue: string | null): void;
}) => {
  function handleStorageChange({ key, newValue }: StorageEvent) {
    if (key === watchKey) onChange(newValue);
  }
  useOnWindow(
    "storage",
    $(({ key, newValue }) => {
      if (key === watchKey) onChange(newValue);
    }),
  );
  // useEffect(() => {
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => window.removeEventListener('storage', handleStorageChange);
  // }, []); // eslint-disable-line
};
