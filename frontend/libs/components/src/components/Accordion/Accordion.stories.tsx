import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "./";

import { component$ } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";

type Story = StoryObj;

export default {
  title: "Components/Accordion",
  component: Accordion,
  args: {
    alwaysOpen: false,
    flush: false,
  },
} as Meta;

const Template = component$((args: { alwaysOpen: boolean; flush: boolean }) => (
  <Accordion {...args}>
    <AccordionPanel>
      <AccordionTitle>What is Flowbite?</AccordionTitle>
      <AccordionContent>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals,
          navbars, and more.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to&nbsp;
          <a href="https://flowbite.com/docs/getting-started/introduction/" class="text-cyan-600 hover:underline dark:text-cyan-500">
            get started
          </a>
          &nbsp;and start developing websites even faster with components on top of Tailwind CSS.
        </p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel>
      <AccordionTitle>Is there a Figma file available?</AccordionTitle>
      <AccordionContent>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design
          equivalent in our Figma file.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Check out the&nbsp;
          <a href="https://flowbite.com/figma/" class="text-cyan-600 hover:underline dark:text-cyan-500">
            Figma design system
          </a>
          &nbsp;based on the utility classes from Tailwind CSS and components from Flowbite.
        </p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel>
      <AccordionTitle>What are the differences between Flowbite and Tailwind UI?</AccordionTitle>
      <AccordionContent>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid
          product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of
          pages.
        </p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping
          you from using the best of two worlds.
        </p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul class="list-disc pl-5 text-gray-500 dark:text-gray-400">
          <li>
            <a href="https://flowbite.com/pro/" class="text-cyan-600 hover:underline dark:text-cyan-500">
              Flowbite Pro
            </a>
          </li>
          <li>
            <a href="https://tailwindui.com/" rel="nofollow" class="text-cyan-600 hover:underline dark:text-cyan-500">
              Tailwind UI
            </a>
          </li>
        </ul>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
));

export const AlwaysOpen: Story = {
  args: {
    label: "AlwaysOpen",
    alwaysOpen: true,
    flush: false,
  },
  render: (props) => <Template flush={props.flush} alwaysOpen={props.alwaysOpen} />,
};

export const Flush: Story = {
  args: {
    label: "AlwaysOpen",
    alwaysOpen: false,
    flush: true,
  },
  render: (props) => <Template flush={props.flush} alwaysOpen={props.alwaysOpen} />,
};
