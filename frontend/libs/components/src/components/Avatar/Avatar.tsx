import type { ComponentProps, FC, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../helpers/merge-deep';
import { getTheme } from '../theme-store';
import type { DeepPartial } from '../types';
import type { FlowbiteBoolean, FlowbiteColors, FlowbitePositions, FlowbiteSizes } from '../types';
import type { FlowbiteAvatarGroupTheme } from './AvatarGroup';
import { AvatarGroup } from './AvatarGroup';
import type { FlowbiteAvatarGroupCounterTheme } from './AvatarGroupCounter';
import { AvatarGroupCounter } from './AvatarGroupCounter';
import { Slot, component$ } from '@builder.io/qwik';

export interface FlowbiteAvatarTheme {
  root: FlowbiteAvatarRootTheme;
  group: FlowbiteAvatarGroupTheme;
  groupCounter: FlowbiteAvatarGroupCounterTheme;
}

export interface FlowbiteAvatarRootTheme {
  base: string;
  bordered: string;
  color: AvatarColors;
  img: FlowbiteAvatarImageTheme;
  initials: FlowbiteAvatarInitialsTheme;
  rounded: string;
  size: AvatarSizes;
  stacked: string;
  status: FlowbiteAvatarStatusTheme;
  statusPosition: FlowbitePositions;
}

export interface FlowbiteAvatarImageTheme extends FlowbiteBoolean {
  base: string;
  placeholder: string;
}

export interface FlowbiteAvatarStatusTheme {
  away: string;
  base: string;
  busy: string;
  offline: string;
  online: string;
}

export interface FlowbiteAvatarInitialsTheme {
  base: string;
  text: string;
}

export interface AvatarColors
  extends Pick<FlowbiteColors, 'failure' | 'gray' | 'info' | 'pink' | 'purple' | 'success' | 'warning'> {
  [key: string]: string;
}

export interface AvatarSizes extends Pick<FlowbiteSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
  [key: string]: string;
}

export interface AvatarImageProps {
  alt?: string;
  className: string;
  'data-testid': string;
}

export interface AvatarProps {
  alt?: string;
  bordered?: boolean;
  img?: string;
  color?: keyof AvatarColors;
  rounded?: boolean;
  size?: keyof AvatarSizes;
  stacked?: boolean;
  status?: 'away' | 'busy' | 'offline' | 'online';
  statusPosition?: keyof FlowbitePositions;
  placeholderInitials?: string;
  theme?: DeepPartial<FlowbiteAvatarTheme>;

  className?: string
}

export const Avatar = component$<AvatarProps>(({
  alt = '',
  bordered = false,
  className,
  color = 'light',
  img,
  placeholderInitials = '',
  rounded = false,
  size = 'md',
  stacked = false,
  status,
  statusPosition = 'top-left',
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().avatar, customTheme);

  const imgClassName = twMerge(
    theme.root.img.base,
    bordered && theme.root.bordered,
    bordered && theme.root.color[color],
    rounded && theme.root.rounded,
    stacked && theme.root.stacked,
    theme.root.img.on,
    theme.root.size[size],
  );

  const imgProps = {
    className: twMerge(imgClassName, theme.root.img.on),
    'data-testid': 'flowbite-avatar-img',
  };
  return (
    <div class={twMerge(theme.root.base, className)} data-testid="flowbite-avatar" {...props}>
      <div class="relative">
        {img ? <img alt={alt} src={img} {...imgProps} />
         : placeholderInitials ? (
          <div
            class={twMerge(
              theme.root.img.off,
              theme.root.initials.base,
              stacked && theme.root.stacked,
              bordered && theme.root.bordered,
              bordered && theme.root.color[color],
              theme.root.size[size],
              rounded && theme.root.rounded,
            )}
            data-testid="flowbite-avatar-initials-placeholder"
          >
            <span class={twMerge(theme.root.initials.text)} data-testid="flowbite-avatar-initials-placeholder-text">
              {placeholderInitials}
            </span>
          </div>
        ) : (
          <div class={twMerge(imgClassName, theme.root.img.off)} data-testid="flowbite-avatar-img">
            <svg
              class={theme.root.img.placeholder}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        )}
        {status && (
          <span
            data-testid="flowbite-avatar-status"
            class={twMerge(
              theme.root.status.base,
              theme.root.status[status],
              theme.root.statusPosition[statusPosition],
            )}
          />
        )}
      </div>
      <Slot/>
    </div>
  );
});

