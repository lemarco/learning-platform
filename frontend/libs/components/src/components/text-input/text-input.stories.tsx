import type { Meta, StoryObj } from "storybook-framework-qwik";
import { TextInput, TextInputProps } from "./text-input";

const meta: Meta<TextInputProps> = {
  component: TextInput,
};

type Story = StoryObj<TextInputProps>;

export default meta;

export const Checkbox: Story = {
  args: {
    label: "input",
    value: "input",
    type: "checkbox",
  },
  render: (props) => <TextInput {...props} />,
};

export const EmailInput: Story = {
  args: {
    label: "EmailInput",
    value: "...",
    type: "email",
    placeholder: "placeholder",
  },
  render: (props) => <TextInput {...props} />,
};
