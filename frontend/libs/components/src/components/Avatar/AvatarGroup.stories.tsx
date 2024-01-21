
import { Meta, StoryFn, StoryObj } from 'storybook-framework-qwik/*';
import { Avatar } from './Avatar';
import { AvatarGroup, type AvatarGroupProps } from './AvatarGroup';
import { AvatarGroupCounter } from './AvatarGroupCounter';
import { component$ } from '@builder.io/qwik';

type Story = StoryObj;

export default {
  title: 'Components/Avatar',
  component: AvatarGroup,
} as Meta;

const Template = component$((args: { rounded?: boolean, stacked?: boolean }) => (
  <AvatarGroup >
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-1.jpg" {...args} />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-2.jpg" {...args} />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" {...args} />
    <Avatar img="https://flowbite.com/docs/images/people/profile-picture-4.jpg" {...args} />
    <AvatarGroupCounter total={99} href="#" />
  </AvatarGroup>
));

export const RoundedGroup: Story = {
  args: {
    label: "Rounded Group",
    rounded: true,
    stacked: false,
    size: 'xl'
  },
  render: (props) => <Template {...props} />,
};

export const NotRoundedGroup: Story = {
  args: {
    label: "NotRounded Group",
    rounded: false,
    stacked: false
  },
  render: (props) => <Template {...props} />,
};
