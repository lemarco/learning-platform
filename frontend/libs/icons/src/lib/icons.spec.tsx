import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Icons } from './icons';

test(`[Icons Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Icons />);
  expect(screen.innerHTML).toContain('Icons works!');
});
