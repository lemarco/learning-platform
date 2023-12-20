import { Slot, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { QRL } from "@builder.io/qwik";
import { $, useStore } from "@builder.io/qwik";
import { LoginPopup } from "../login-popup";
import { ExploreDesignWorkIcon } from "~/icons/exploreDesignWork";
import { ArrowIcon } from "~/icons/arrow";
import { BurgerIcon } from "~/icons/burger";

const LoginButton = component$(() => {
  const store = useStore({
    modal: false,
  });

  const onClose = $(() => {
    store.modal = false;
  });
  return (
    <div>
      <button
        onClick$={() => {
          store.modal = true;
        }}
        type="button"
        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Login
      </button>
      {store.modal && <LoginPopup onClose={onClose} />}
    </div>
  );
});

export const MegaMenu = component$(() => {
  return (
    <div
      id="mega-menu"
      class="grid  absolute z-10 w-full bg-white border border-gray-100 shadow-md dark:border-gray-700 lg:rounded-lg lg:w-auto lg:grid-cols-3 dark:bg-gray-700"
    >
      <div class="p-2 text-gray-900 bg-white lg:rounded-lg dark:text-white lg:col-span-2 dark:bg-gray-800">
        <ul>
          <li>
            <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                <ExploreDesignWorkIcon />
              </div>
              <div>
                <div class="font-semibold">Explore Design Work</div>
                <div class="text-sm font-light text-gray-500 dark:text-gray-400">Trending designs to inspire you</div>
              </div>
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div class="font-semibold">New & Noteworthy</div>
                <div class="text-sm font-light text-gray-500 dark:text-gray-400">Up-and-coming designers</div>
              </div>
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div>
                <div class="font-semibold">Playoffs</div>
                <div class="text-sm font-light text-gray-500 dark:text-gray-400">Work designers are riffing on</div>
              </div>
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                  <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
                </svg>
              </div>
              <div>
                <div class="font-semibold">Blog</div>
                <div class="text-sm font-light text-gray-500 dark:text-gray-400">Interviews, tutorials, and more</div>
              </div>
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div class="font-semibold">Weekly Warm-up</div>
                <div class="text-sm font-light text-gray-500 dark:text-gray-400">Prompt to flex your skills</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="py-5 px-5 bg-gray-50 lg:rounded-lg lg:col-span-1 dark:bg-gray-700">
        <h3 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Browse categories</h3>
        <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Animation
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Branding
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Illustration
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Mobile
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Print
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Product Design
            </a>
          </li>
          <li>
            <a href="/" class="hover:text-primary-600 dark:hover:text-primary-500">
              Web Design
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
});

const CustomDropDown = component$(() => {
  const subMenuIsOpen = useSignal(false);
  return (
    <>
      <button
        type="button"
        onClick$={() => {
          subMenuIsOpen.value = !subMenuIsOpen.value;
        }}
        class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 lg:w-auto hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
      >
        Company
        <ArrowIcon />
      </button>
      {subMenuIsOpen.value && <MegaMenu />}
    </>
  );
});
const MainMenu = component$(() => {
  const state = useStore({
    links: [
      { name: "Home", href: "/" },
      { name: "Features", href: "/" },
      { name: "Marketplace", href: "/" },
      { component: <CustomDropDown /> },
      { name: "Team", href: "/" },
      { name: "Contact", href: "/" },
    ],
  });
  const list = state.links.map((curr, idx) => {
    if (curr.component) {
      return <li>{curr.component}</li>;
    }

    const style = !idx
      ? "block py-2 pr-4 pl-3 border-b border-gray-100 text-primary-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-primary-500 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700"
      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700";

    return (
      <li>
        <a href={curr.href} class={style}>
          {curr.name}
        </a>
      </li>
    );
  });

  return (
    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
      <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">{list}</ul>
    </div>
  );
});

const Logo = component$(() => {
  return (
    <a href="https://flowbite.com" class="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
  );
});
const MobileMenuButton = component$(() => {
  return (
    <button
      type="button"
      class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <BurgerIcon />
    </button>
  );
});
export default component$(() => {
  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Logo />
          <div class="flex items-center lg:order-2">
            <LoginButton />
            <MobileMenuButton />
          </div>
          <MainMenu />
        </div>
      </nav>
    </header>
  );
});
