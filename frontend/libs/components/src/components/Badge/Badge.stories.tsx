
import { Meta, StoryFn, StoryObj } from 'storybook-framework-qwik/*';
import { Badge } from './Badge';
import { component$ } from '@builder.io/qwik';

type Story = StoryObj;

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template = component$((args: { color?: string }) => (
  <Badge {...args} />
));

export const Defualt: Story = {
  args: {
    label: "Defualt",
  },
  render: (props) => <Template {...props} />,
};
