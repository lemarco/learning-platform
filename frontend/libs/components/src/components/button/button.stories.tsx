import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps, MetamaskButton } from "./button";

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Primary: Story = {
  args: {
    size: "medium",
  },
  render: (props) => <Button {...props}>Some button</Button>,
};

export const Secondary: Story = {
  args: {
    size: "large",
  },
  render: (props) => <Button {...props}>Some button</Button>,
};

export const Metamask: Story = {
  args: {
    size: "large",
  },
  render: (props) => <MetamaskButton {...props}>Some button</MetamaskButton>,
};
