import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../helpers/merge-deep';
import { getTheme } from '../theme-store';
import type { DeepPartial } from '../types';
import { ComponentBaseProps, Slot, component$ } from '@builder.io/qwik';

export interface FlowbiteAvatarGroupTheme {
  base: string;
}

export interface AvatarGroupProps {
  theme?: DeepPartial<FlowbiteAvatarGroupTheme>;
  className?: string;
}

export const AvatarGroup = component$<AvatarGroupProps>(({ className, theme: customTheme = {}, ...props }) => {
  const theme = mergeDeep(getTheme().avatar.group, customTheme);

  return (
    <div data-testid="avatar-group-element" class={twMerge(theme.base, className)} {...props}>
      <Slot/>
    </div>
  );
});

