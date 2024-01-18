import { component$ } from "@builder.io/qwik";

export const BookMarkIcon = component$(({ className }: { className?: string }) => {
  return (
    <svg class={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
      />
    </svg>
  );
});
