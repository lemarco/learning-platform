
import { Meta, StoryFn, StoryObj } from 'storybook-framework-qwik/*';
import { Badge } from './Badge';
import { Slot, component$ } from '@builder.io/qwik';
import { IconName } from '../icons';

type Story = StoryObj;

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template = component$((args: { color?: string, iconName?: IconName, className?: string }) => (
  <Badge {...args} ><Slot/></Badge>
));

export const GreenBadge: Story = {
  args: {
    label: "GreenBadge",
    color: 'green',
    iconName: 'NoteIcon',
    className: 'w-1/5'
  },
  render: (props) => <Template {...props} >Hello green</Template>,
};

export const IndigoBadge: Story = {
  args: {
    label: "IndigoBadge",
    color: 'indigo',
    iconName: 'NoteIcon'
  },
  render: (props) => <Template {...props} >Hello badge</Template>,
};