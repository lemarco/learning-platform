import { Slot } from "@builder.io/qwik";
import "./Placeholder.css";

export function Placeholder({
  className,
}: {
  className?: string;
}) {
  return (
    <div class={className || "Placeholder__root"}>
      <Slot />
    </div>
  );
}
