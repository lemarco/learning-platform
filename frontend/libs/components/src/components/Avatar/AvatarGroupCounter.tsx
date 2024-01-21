import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../helpers/merge-deep';
import { getTheme } from '../theme-store';
import type { DeepPartial } from '../types';
import { component$ } from '@builder.io/qwik';

export interface FlowbiteAvatarGroupCounterTheme {
  base: string;
}

export interface AvatarGroupCounterProps {
  theme?: DeepPartial<FlowbiteAvatarGroupCounterTheme>;
  total?: number;
  className?: string;
  href?: string
}

export const AvatarGroupCounter = component$<AvatarGroupCounterProps>(({
  className,
  href,
  theme: customTheme = {},
  total,
  ...props
}) => {
  const theme = mergeDeep(getTheme().avatar.groupCounter, customTheme);

  return (
    <a href={href} class={twMerge(theme.base, className)} {...props}>
      +{total}
    </a>
  );
});

