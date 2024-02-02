// import { AuthenticationPopup } from "@/widgets/auth-popup";

import { Modal } from "@/components/modal";
import { UserMenu } from "./header/user-menu";
import Link from "next/link";
const EnglishItem = () => {
  return (
    <a
      href="/"
      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div className="inline-flex items-center">
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
      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
    >
      <div className="inline-flex items-center">
        {/* <EnglishFlagIcon /> */}
        Ukraine
      </div>
    </a>
  );
};
const LangMenu = () => {
  return (
    <div
      className="hidden z-50 my-4 w-48 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      id="language-dropdown"
    >
      <ul className="py-1" role="none">
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
    <a href="/" className="flex items-center">
      {/* <Image layout="fixed" src={"https://flowbite.com/docs/images/logo.svg"} className="mr-3 h-6 sm:h-9" alt="logo" /> */}
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
  );
};

const UpperHeader = ({ googleLink }: { googleLink: string }) => {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate cache
  }
  return (
    <nav className=" bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <Logo />
        <div className="flex items-center">
          <button
            data-tooltip-target="tooltip-statistics"
            type="button"
            className="hidden items-center p-2 text-sm font-medium text-gray-500 rounded-lg lg:inline-flex dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            {/* <StatisticsIcon /> */}
          </button>
          <div
            id="tooltip-statistics"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            View analytics
            <div className="tooltip-arrow" data-popper-arrow />
          </div>
          <span className="mr-0 ml-2 w-px h-5 bg-gray-200 dark:bg-gray-600 lg:inline lg:mr-3 lg:ml-5" />

          <LangMenu />
          <Modal trigger={"LOGIN"}>
            <form action="#">
              <h2 className="mb-4 text-lg font-light text-gray-500 dark:text-white">
                Join over <span className="font-medium text-gray-900 dark:text-white">74,000</span> developers and designers.
              </h2>
              <div className="flex items-center mb-6 space-x-4">
                <a
                  href="/"
                  className="w-full inline-flex items-center justify-center text-white bg-[#333] hover:bg-[#1a1919] dark:focus:ring-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <svg className="mr-2 -ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    />
                  </svg>
                  Github
                </a>
                <a
                  href="/"
                  className="w-full inline-flex items-center justify-center text-white bg-[#4284F4] hover:bg-[#3372df] dark:focus:ring-[#0f53c9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg
                    className="p-1 mr-2 -ml-1 w-5 h-5 bg-white rounded-full"
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                  Google
                </a>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
                <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@flowbite.com"
                  required={false}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required={false}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Repeat Password
                </label>
                <input
                  type="repeat-password"
                  name="repeat-password"
                  id="repeat-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required={false}
                />
              </div>
              <div className="flex items-start mb-3">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="text-gray-500 dark:text-gray-400">
                    I want to receive promotional offers (no spam).
                  </label>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={false}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-500 dark:text-gray-400">
                    I agree to all the{" "}
                    <a className="font-medium underline text-primary-600 hover:text-primary-700 hover:no-underline" href="/">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a className="font-medium underline hover:no-underline text-primary-600 hover:text-primary-700" href="/">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-medium underline text-primary-600 hover:no-underline dark:text-primary-500 hover:text-primary-700"
                >
                  Log In
                </a>
              </p>
            </form>
          </Modal>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

// const dialog = document.querySelector("dialog");
// const showButton = document.querySelector("dialog + button");
// const closeButton = document.querySelector("dialog button");
// showButton?.addEventListener("click", () => {
//   dialog?.showModal();
// });
// closeButton?.addEventListener("click", () => {
//   dialog?.close();
// });

const SearchBlock = () => {
  const categoriesToSearch = ["Mockups", "Templates", "Design", "Logos"];
  return (
    <form className="flex mb-4 lg:order-2 lg:mb-0">
      <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Your Email
      </label>
      <button
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        className="hidden md:inline-flex flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        All categories
        {/* <DownArrowIcon className="ml-1 w-4 h-4" /> */}
      </button>
      <div
        id="dropdown"
        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        // style={"position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(897px, 5637px, 0px);"}
      >
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
          {categoriesToSearch.map((name, idx) => {
            return (
              <li key={`${idx}${name}`}>
                <button
                  type="button"
                  className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg md:rounded-l-none md:border-l-gray-50 border-l-1 md:border-l-6 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-l-gray-600  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500"
          placeholder="Search anything..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {/* <SearchIcon className="w-5 h-5" /> */}
        </button>
      </div>
    </form>
  );
};

const BottomHeader = () => {
  return (
    <nav className="z-100 bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 border-y">
      <div className="grid py-4 px-4 mx-auto max-w-screen-xl lg:grid-cols-2 md:px-6">
        <SearchBlock />
        <div className="flex items-center lg:order-1">
          <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium">
            <li>
              <a href="/" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Blog
              </a>
            </li>
            <li>
              <a href="/editor" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-500">
                Editor
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const Header = ({ link = "" }: { link: string }) => {
  return (
    <header className="shadow-md z-[99] sticky top-0 ">
      <UpperHeader googleLink={link} />

      <BottomHeader />
    </header>
  );
};
