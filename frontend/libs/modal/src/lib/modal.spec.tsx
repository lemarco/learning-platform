import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Modal } from './modal';

test(`[Modal Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Modal />);
  expect(screen.innerHTML).toContain('Modal works!');
});
