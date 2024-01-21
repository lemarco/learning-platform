'use client';

import type { Placement } from '@floating-ui/core';
import { autoUpdate, useFocus } from '@floating-ui/react';
import type { ComponentProps, FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBaseFLoating, useFloatingInteractions } from '../../hooks/use-floating';
import { getArrowPlacement } from './helpers';
import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export interface FlowbiteFloatingTheme {
  arrow: FlowbiteFloatingArrowTheme;
  animation: string;
  base: string;
  content: string;
  hidden: string;
  style: {
    auto: string;
    dark: string;
    light: string;
  };
  target: string;
}

export interface FlowbiteFloatingArrowTheme {
  base: string;
  placement: string;
  style: {
    dark: string;
    light: string;
    auto: string;
  };
}

export type FloatingStyle = 'dark' | 'light' | 'auto';

export interface FloatingProps extends Omit<ComponentProps<'div'>, 'content' | 'style'> {
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  // content: ReactNode;
  placement?: 'auto' | Placement;
  style?: FloatingStyle;
  theme: FlowbiteFloatingTheme;
  trigger?: 'hover' | 'click';
  minWidth?: number;
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Floating = component$<FloatingProps>(({
  animation = 'duration-300',
  arrow = true,
  className,
  // content,
  placement = 'top',
  style = 'dark',
  theme,
  trigger = 'hover',
  minWidth,
  ...props
}) => {
  // const arrowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useSignal<Element>();
  const isOpen = useSignal(false);

  const floatingProperties = useBaseFLoating({
    open: isOpen.value,
    placement,
    arrowRef,
    setOpen: (value: boolean) => isOpen.value = value,
  });

  const {
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs,
    strategy,
    update,
    x,
    y,
  } = floatingProperties;

  const focus = useFocus(context);
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: 'tooltip',
    trigger,
    interactions: [focus],
  });

  useVisibleTask$(() => {
    if (refs.reference.current && refs.floating.current && isOpen.value) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  });

  return (
    <>
      <div
        ref={refs.setReference}
        class={theme.target}
        data-testid="flowbite-tooltip-target"
        {...getReferenceProps()}
      >
        <Slot/>
      </div>
      <div
        ref={refs.setFloating}
        data-testid="flowbite-tooltip"
        {...getFloatingProps({
          className: twMerge(
            theme.base,
            animation && `${theme.animation} ${animation}`,
            !isOpen.value && theme.hidden,
            theme.style[style],
            className,
          ),
          style: {
            position: strategy,
            top: y ?? ' ',
            left: x ?? ' ',
            minWidth,
          },
          ...props,
        })}
      >
        <div class={theme.content}><Slot name='content'/></div>
        {arrow && (
          <div
            class={twMerge(
              theme.arrow.base,
              style === 'dark' && theme.arrow.style.dark,
              style === 'light' && theme.arrow.style.light,
              style === 'auto' && theme.arrow.style.auto,
            )}
            data-testid="flowbite-tooltip-arrow"
            ref={arrowRef}
            style={{
              top: arrowY ?? ' ',
              left: arrowX ?? ' ',
              right: ' ',
              bottom: ' ',
              [getArrowPlacement({ placement: floatingProperties.placement })]: theme.arrow.placement,
            }}
          >
            &nbsp;
          </div>
        )}
      </div>
    </>
  );
});
