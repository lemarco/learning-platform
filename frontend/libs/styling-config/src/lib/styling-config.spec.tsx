import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { StylingConfig } from './styling-config';

test(`[StylingConfig Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<StylingConfig />);
  expect(screen.innerHTML).toContain('StylingConfig works!');
});
