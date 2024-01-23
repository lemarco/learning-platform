import { twMerge } from "tailwind-merge";
export const UndoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={twMerge("w-[16px] h-[16px] text-gray-800 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
      />
    </svg>
  );
};

export const RedoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={twMerge("w-[16px] h-[16px] text-gray-800 ", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"
      />
    </svg>
  );
};

export const ParagraphIcon = ({ className }: { className?: string }) => {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 5v7m0 7v-7m4-7v14m3-14H8.5C6.5 5 5 6.6 5 8.5v0c0 2 1.6 3.5 3.5 3.5H12"
      />
    </svg>
  );
};
