
import { Meta, StoryFn, StoryObj } from 'storybook-framework-qwik/*';
import { Avatar } from './Avatar';
import { component$ } from '@builder.io/qwik';

type Story = StoryObj;

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

const Template = component$((args: { rounded?: boolean, stacked?: boolean }) => (
  <Avatar img="https://flowbite.com/docs/images/people/profile-picture-1.jpg" {...args} />
));

export const RoundedAvatar: Story = {
  args: {
    label: "Rounded",
    rounded: true,
    stacked: false,
    size: 'xl'
  },
  render: (props) => <Template {...props} />,
};

export const NotRoundedAvatar: Story = {
  args: {
    label: "NotRounded",
    rounded: false,
    stacked: false,
    size: 'lg'
  },
  render: (props) => <Template {...props} />,
};
