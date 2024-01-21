import type { ComponentProps, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../helpers/merge-deep';
import { getTheme } from '../theme-store';
import type { DeepPartial, FlowbiteBoolean, FlowbiteColors, FlowbiteSizes } from '../types';
import { Slot, component$ } from '@builder.io/qwik';
import { Icon, IconName } from '../icons'
export interface FlowbiteBadgeTheme {
  root: FlowbiteBadgeRootTheme;
  icon: FlowbiteBadgeIconTheme;
}

export interface FlowbiteBadgeRootTheme {
  base: string;
  color: FlowbiteColors;
  href: string;
  size: BadgeSizes;
}

export interface FlowbiteBadgeIconTheme extends FlowbiteBoolean {
  size: BadgeSizes;
}

export interface BadgeSizes extends Pick<FlowbiteSizes, 'xs' | 'sm'> {
  [key: string]: string;
}

export interface BadgeProps {
  color?: keyof FlowbiteColors;
  href?: string;
  size?: keyof BadgeSizes;
  theme?: DeepPartial<FlowbiteBadgeTheme>;
  className?: string
  iconName?: IconName
}

export const Badge = component$<BadgeProps>(({
  color = 'info',
  href,
  size = 'xs',
  className,
  theme: customTheme = {},
  iconName,
  ...props
}) => {
  const theme = mergeDeep(getTheme().badge, customTheme);

  const Content = () => (
    <span
      class={twMerge(
        theme.root.base,
        theme.root.color[color],
        theme.root.size[size],
        theme.icon[iconName ? 'on' : 'off'],
        className,
      )}
      data-testid="flowbite-badge"
      {...props}
    >
      {Icon && <Icon className={theme.icon.size[size]} name={iconName} />}
      <span><Slot/></span>
    </span>
  );

  return href ? (
    <a class={theme.root.href} href={href}>
      <Content />
    </a>
  ) : (
    <Content />
  );
});

