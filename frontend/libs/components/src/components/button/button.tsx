import { component$, useStylesScoped$, Slot, useStyles$ } from "@builder.io/qwik";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  color: "green" | "blue";
  type: "lol" | "nelol";
}
export const Button = component$<ButtonProps>(({ size = "medium", color = "blue", type = "nelol" }) => {
  console.log("color = ", color);
  console.log("type = ", type);
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button class={"w-full m-auto mb-8"}>
      <Slot />
    </button>
  );
});
