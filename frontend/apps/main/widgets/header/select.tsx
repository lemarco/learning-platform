"use client";

export const DropDownItem = ({ children, triggerId }: { triggerId: string; children: React.ReactNode }) => {
  return (
    <li>
      <button
        onClick={() => {
          const triggerEl = document.getElementById(triggerId);
          triggerEl?.click();
        }}
        type="button"
        className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <div className="inline-flex items-center">{children}</div>
      </button>
    </li>
  );
};
export const Item = () => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      onClick={() => {
        console.log("onclick");
      }}
    >
      ON CLICK ITEM
    </span>
  );
};
