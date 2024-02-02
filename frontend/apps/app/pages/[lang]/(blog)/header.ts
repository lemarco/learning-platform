

import { html } from "../../../utils/html"


const Logo = () => {
  return html`
    <a href="/" class="flex items-center">

      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
  `
};

const UpperHeader = (link:string ) => {

  return html`
    <nav class=" bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        ${Logo() }
        <div class="flex items-center">
          <button
            data-tooltip-target="tooltip-statistics"
            type="button"
            class="hidden items-center p-2 text-sm font-medium text-gray-500 rounded-lg lg:inline-flex dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >

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

       

          
        </div>
      </div>
    </nav>
    `
  
};



const SearchBlock = () => {
  const categoriesToSearch = ["Mockups", "Templates", "Design", "Logos"];
  const categories =    categoriesToSearch.map((name, idx) => {
    return  html`
      <li key=${idx}${name}>
        <button
          type="button"
          class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          ${name}
        </button>
      </li>
      `})


  return html`
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
       ${categories}

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
   
        </button>
      </div>
    </form>
  `
};

const BottomHeader = () => {
  return html`
    <nav class="z-100 bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 border-y">
      <div class="grid py-4 px-4 mx-auto max-w-screen-xl lg:grid-cols-2 md:px-6">
        ${SearchBlock()}
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
    </nav>`
  
};

export const Header = ( link = "" ) => {
  return html`
    <header class="shadow-md z-[99] sticky top-0 ">
      ${UpperHeader(link)}
      ${BottomHeader()}
    </header>
    `
};
