import { Slot, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$, Link } from "@builder.io/qwik-city";

import { QRL } from "@builder.io/qwik";
import { $, useStore } from "@builder.io/qwik";
// import { Image } from "qwik-image";
import LoginButton from "./login-popup";

const EnglishIcon = component$(() => {
  return (
    <svg class="h-3.5 w-3.5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512">
      <title>EnglishIcon</title>
      <g fill-rule="evenodd">
        <g stroke-width="1pt">
          <path
            fill="#bd3d44"
            d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
            transform="scale(3.9385)"
          />
          <path
            fill="#fff"
            d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
            transform="scale(3.9385)"
          />
        </g>
        <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
        <path
          fill="#fff"
          d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
          transform="scale(3.9385)"
        />
      </g>
    </svg>
  );
});

const UserMenu = component$(() => {
  return (
    <>
      <button
        type="button"
        class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-profile-dropdown"
      >
        <span class="sr-only">Open user menu</span>
        {/* <Image
          layout="fixed"
          src={"https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
          class="w-8 h-8 rounded-full"
          alt="user"
        /> */}
        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user " />
      </button>

      <div
        class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        id="user-profile-dropdown"
      >
        <div class="py-3 px-4">
          <span class="block text-sm font-semibold text-gray-900 dark:text-white">Neil sims</span>
          <span class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="user-profile-dropdown">
          <li>
            <a href="/" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
              My profile
            </a>
          </li>
          <li>
            <a href="/" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
              Account settings
            </a>
          </li>
        </ul>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="user-profile-dropdown">
          <li>
            <a href="/" class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Likes</title>
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              My likes
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Collections</title>
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Collections
            </a>
          </li>
          <li>
            <a
              href="/"
              class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span class="flex items-center">
                <svg
                  class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>X</title>
                  <path
                    fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"
                  />
                </svg>
                Pro version
              </span>
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>X</title>
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="user-profile-dropdown">
          <li>
            <a href="/" class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
});
const EnglishItem = component$(() => {
  return (
    <a
      href="/"
      class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div class="inline-flex items-center">
        <EnglishIcon />
        English (US)
      </div>
    </a>
  );
});
const UkrainianItem = component$(() => {
  return (
    <a
      href="/"
      class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div class="inline-flex items-center">
        <EnglishIcon />
        Ukraine
      </div>
    </a>
  );
});
const LangMenu = component$(() => {
  return (
    <div
      class="hidden z-50 my-4 w-48 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      id="language-dropdown"
    >
      {/* biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
      <ul class="py-1" role="none">
        <li>
          <EnglishItem />
        </li>
        <li>
          <UkrainianItem />
        </li>
      </ul>
    </div>
  );
});

const Logo = component$(() => {
  return (
    <a href="/" class="flex items-center">
      {/* <Image layout="fixed" src={"https://flowbite.com/docs/images/logo.svg"} class="mr-3 h-6 sm:h-9" alt="logo" /> */}
      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
  );
});
// import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";

// 'use client';
// import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { HiMoon, HiSun } from 'react-icons/hi';
// import { twMerge } from 'tailwind-merge';
// import { useIsMounted } from '../../hooks/use-is-mounted';
// import { mergeDeep } from '../../helpers/merge-deep';
// import { useThemeMode } from '../../hooks/use-theme-mode';
// import { getTheme } from '../../theme-store';
// export const DarkThemeToggle = ({ className, theme: customTheme = {}, iconDark: IconDark = HiSun, iconLight: IconLight = HiMoon, ...props }) => {
//     const isMounted = useIsMounted();
//     const { computedMode, toggleMode } = useThemeMode();
//     const theme = mergeDeep(getTheme().darkThemeToggle, customTheme);
//     return (_jsxs("button", { type: "button", "aria-label": "Toggle dark mode", "data-testid": "dark-theme-toggle", className: twMerge(theme.root.base, className), onClick: toggleMode, ...props, children: [_jsx(IconDark, { "aria-label": "Currently dark mode", "data-active": isMounted && computedMode === 'dark', className: twMerge(theme.root.icon, 'hidden dark:block') }), _jsx(IconLight, { "aria-label": "Currently light mode", "data-active": isMounted && computedMode === 'light', className: twMerge(theme.root.icon, 'dark:hidden') })] }));
// };
// DarkThemeToggle.displayName = 'DarkThemeToggle';
// if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//   themeToggleLightIcon.classList.remove('hidden');
// } else {
//   themeToggleDarkIcon.classList.remove('hidden');
// }

// var themeToggleBtn = document.getElementById('theme-toggle');

// let event = new Event('dark-mode');

// themeToggleBtn.addEventListener('click', function() {

//   // toggle icons
//   themeToggleDarkIcon.classList.toggle('hidden');
//   themeToggleLightIcon.classList.toggle('hidden');

//   // if set via local storage previously
//   if (localStorage.getItem('color-theme')) {
//       if (localStorage.getItem('color-theme') === 'light') {
//           document.documentElement.classList.add('dark');
//           localStorage.setItem('color-theme', 'dark');
//       } else {
//           document.documentElement.classList.remove('dark');
//           localStorage.setItem('color-theme', 'light');
//       }

//   // if NOT set via local storage previously
//   } else {
//       if (document.documentElement.classList.contains('dark')) {
//           document.documentElement.classList.remove('dark');
//           localStorage.setItem('color-theme', 'light');
//       } else {
//           document.documentElement.classList.add('dark');
//           localStorage.setItem('color-theme', 'dark');
//       }
//   }

//   document.dispatchEvent(event);

// });
const UpperHeader = component$(({ googleLink }: { googleLink: string }) => {
  return (
    <nav class=" bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <Logo />
        <div class="flex items-center">
          <button
            type="button"
            data-dropdown-toggle="language-dropdown"
            class="hidden items-center text-gray-900 dark:text-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-4 py-2 lg:py-2.5 mr-2 md:mr-3 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            <svg
              class="w-5 h-5 rounded-full md:mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 3900 3900"
            >
              <title>language-dropdown</title>
              <path fill="#b22234" d="M0 0h7410v3900H0z" />
              <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300" />
              <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
              <g fill="#fff">
                <g id="d">
                  <g id="c">
                    <g id="e">
                      <g id="b">
                        <path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z" />
                        <use xlink:href="#a" y="420" />
                        <use xlink:href="#a" y="840" />
                        <use xlink:href="#a" y="1260" />
                      </g>
                      <use xlink:href="#a" y="1680" />
                    </g>
                    <use xlink:href="#b" x="247" y="210" />
                  </g>
                  <use xlink:href="#c" x="494" />
                </g>
                <use xlink:href="#d" x="988" />
                <use xlink:href="#c" x="1976" />
                <use xlink:href="#e" x="2470" />
              </g>
            </svg>
            <span class="hidden mr-2 md:inline">English</span>
            <svg
              class="hidden w-4 h-4 md:inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </button>
          <button
            data-tooltip-target="tooltip-dark"
            type="button"
            class="hidden items-center p-2 mr-1 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>tooltip-dark</title>
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          <div
            id="tooltip-dark"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Toggle dark mode
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
          {/* <DarkThemeToggle/> */}
          <button
            data-tooltip-target="tooltip-statistics"
            type="button"
            class="hidden items-center p-2 text-sm font-medium text-gray-500 rounded-lg lg:inline-flex dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>X</title>
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          <div
            id="tooltip-statistics"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            View analytics
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
          <span class="mr-0 ml-2 w-px h-5 bg-gray-200 dark:bg-gray-600 lg:inline lg:mr-3 lg:ml-5" />

          <LangMenu />

          <LoginButton googleLink={googleLink} />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
});

const SearchBlock = component$(() => {
  const categoriesToSearch = ["Mockups", "Templates", "Design", "Logos"];
  return (
    <form class="flex mb-4 lg:order-2 lg:mb-0">
      <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Your Email
      </label>
      <button
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        class="hidden md:inline-flex flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        All categories
        <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title> All categories</title>
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(897px, 5637px, 0px);"
      >
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
          {categoriesToSearch.map((name, idx) => {
            return (
              <li key={`${idx}${name}`}>
                <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg md:rounded-l-none md:border-l-gray-50 border-l-1 md:border-l-6 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-l-gray-600  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500"
          placeholder="Search anything..."
          required
        />
        <button
          type="submit"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Search</title>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
});

const BottomHeader = component$(() => {
  return (
    <nav class="z-100 bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 border-y">
      <div class="grid py-4 px-4 mx-auto max-w-screen-xl lg:grid-cols-2 md:px-6">
        <SearchBlock />
        <div class="flex items-center lg:order-1">
          <ul class="flex flex-row mt-0 space-x-8 text-sm font-medium">
            <li>
              <a href="/" class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Blog
              </a>
            </li>
            <li>
              {/* <a href="/editor" class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Editor
              </a>{" "} */}
              <a href="/editor" class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Editor
              </a>
            </li>
            {/* <li>
              <button
                id="mega-menu-button"
                data-dropdown-toggle="mega-menu"
                type="button"
                class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 lg:w-auto hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Company
                <svg class="ml-1 w-5 h-5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Company</title>
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="mega-menu"
                class="grid hidden absolute z-10 w-full bg-white border border-gray-100 shadow-md dark:border-gray-700 lg:rounded-lg lg:w-auto lg:grid-cols-3 dark:bg-gray-700"
              >
                <div class="p-2 text-gray-900 bg-white lg:rounded-lg dark:text-white lg:col-span-2 dark:bg-gray-800">
                  <ul>
                    <li>
                      <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div class="p-2 mr-4 bg-white rounded-lg shadow dark:bg-gray-700">
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Explore Design Work</title>
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
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
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>New & Noteworthy</title>
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
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Playoffs</title>
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
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Interviews</title>
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
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Weekly Warm-up</title>
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
            </li> */}

            {/* <li>
              <a href="/" class="hidden text-gray-900 dark:text-white hover:text-primary-600 md:inline dark:hover:text-primary-500">
                Resources
              </a>
            </li>
            <li>
              <a href="/" class="hidden text-gray-900 dark:text-white hover:text-primary-600 md:inline dark:hover:text-primary-500">
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
});
export const useGetGoogleLink = routeLoader$(async () => {
  return await fetch("http://0.0.0.0:6004/auth/google/link")
    .then((data) => data.json())
    .then((data) => data.link || "")
    .catch(() => "");
});
export default component$(() => {
  const googleLink = useGetGoogleLink();
  const link = String(googleLink.value);
  return (
    <header class="shadow-md z-[99] sticky top-0 ">
      <UpperHeader googleLink={link} />
      <BottomHeader />
    </header>
  );
});
