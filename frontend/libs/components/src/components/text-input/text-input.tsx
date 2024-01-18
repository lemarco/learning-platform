import { HTMLInputTypeAttribute, Slot, component$, useStyles$, useStylesScoped$ } from "@builder.io/qwik";

export interface TextInputProps {
  "data-test-id"?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  className: string;
}

export const TextInput = component$<TextInputProps>(
  ({ "data-test-id": dataTestId, type, className, value, placeholder, onChange, label }) => {
    return (
      // biome-ignore lint/a11y/useButtonType: <explanation>
      <div class="">
        <label class="">{label}</label>
        <input
          type={type}
          class=""
          placeholder={placeholder}
          value={value}
          onChange$={(e, target) => {
            onChange(target.value);
          }}
          data-test-id={dataTestId}
        />
      </div>
    );
  },
);
