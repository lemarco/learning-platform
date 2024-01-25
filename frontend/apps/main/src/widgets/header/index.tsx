import { Slot, component$ } from "@builder.io/qwik";
import LoginButton from "./login-popup";

const UserMenu = () => {
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
              {/* <LikeIcon /> */}
              My likes
            </a>
          </li>
          <li>
            <a href="/" class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {/* <CollectionsIcon class="mr-2 w-5 h-5 text-gray-400" /> */}
              Collections
            </a>
          </li>
          <li>
            <a
              href="/"
              class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span class="flex items-center">
                {/* <FireIcon class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500" /> */}
                Pro version
              </span>
              {/* <RightArrowIcon class="w-5 h-5 text-gray-400" /> */}
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
};
const EnglishItem = () => {
  return (
    <a
      href="/"
      class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div class="inline-flex items-center">
        {/* <EnglishFlagIcon /> */}
        English (US)
      </div>
    </a>
  );
};
const UkrainianItem = () => {
  return (
    <a
      href="/"
      class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div class="inline-flex items-center">
        {/* <EnglishFlagIcon /> */}
        Ukraine
      </div>
    </a>
  );
};
const LangMenu = () => {
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
};

const Logo = () => {
  return (
    <a href="/" class="flex items-center">
      {/* <Image layout="fixed" src={"https://flowbite.com/docs/images/logo.svg"} class="mr-3 h-6 sm:h-9" alt="logo" /> */}
      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
  );
};

const UpperHeader = ({ googleLink }: { googleLink: string }) => {
  return (
    <nav class=" bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <Logo />
        <div class="flex items-center">
          <button
            data-tooltip-target="tooltip-statistics"
            type="button"
            class="hidden items-center p-2 text-sm font-medium text-gray-500 rounded-lg lg:inline-flex dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            {/* <StatisticsIcon /> */}
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
};

const SearchBlock = () => {
  const categoriesToSearch = ["Mockups", "Templates", "Design", "Logos"];
  return (
    <form class="flex mb-4 lg:order-2 lg:mb-0">
      <label htmlFor="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Your Email
      </label>
      <button
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        class="hidden md:inline-flex flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        All categories
        {/* <DownArrowIcon class="ml-1 w-4 h-4" /> */}
      </button>
      <div
        id="dropdown"
        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        // style={"position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(897px, 5637px, 0px);"}
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
          {/* <SearchIcon class="w-5 h-5" /> */}
        </button>
      </div>
    </form>
  );
};

const BottomHeader = () => {
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
              <a href="/editor" class="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Editor
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const Header = component$(({ link = "" }: { link: string }) => {
  return (
    <header class="shadow-md z-[99] sticky top-0 ">
      <UpperHeader googleLink={link} />
      <div class="flex">
        <BottomHeader />
      </div>
    </header>
  );
});
