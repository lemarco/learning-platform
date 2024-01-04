import type { DocumentHead } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
const RelatedArticles = component$(() => {
  return (
    <aside aria-label="Related articles" class="py-8 lg:py-24 bg-white dark:bg-gray-900">
      <div class="px-4 mx-auto max-w-screen-xl">
        <h2 class="mb-6 lg:mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
        <div class="grid gap-6 lg:gap-12 md:grid-cols-2">
          <article class="flex flex-col xl:flex-row">
            <a href="/" class="mb-2 xl:mb-0">
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mr-5 max-w-sm" alt="1 " />
            </a>
            <div class="flex flex-col justify-center">
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="/">Our first office</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400 max-w-sm">
                Over the past year, Volosoft has undergone many changes! After months of preparation.
              </p>
              <a
                href="/"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </div>
          </article>
          <article class="flex flex-col xl:flex-row">
            <a href="/" class="mb-2 xl:mb-0">
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" class="mr-5 max-w-sm" alt=" 2" />
            </a>
            <div class="flex flex-col justify-center">
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="/">Enterprise design tips</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400 max-w-sm">
                Over the past year, Volosoft has undergone many changes! After months of preparation.
              </p>
              <a
                href="/"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 12 minutes
              </a>
            </div>
          </article>
          <article class="flex flex-col xl:flex-row">
            <a href="/" class="mb-2 xl:mb-0">
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" class="mr-5 max-w-sm" alt=" 3" />
            </a>
            <div class="flex flex-col justify-center">
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="/">We partnered up with Google</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400 max-w-sm">
                Over the past year, Volosoft has undergone many changes! After months of preparation.
              </p>
              <a
                href="/"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 8 minutes
              </a>
            </div>
          </article>
          <article class="flex flex-col xl:flex-row">
            <a href="/" class="mb-2 xl:mb-0">
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" class="mr-5 max-w-sm" alt=" 4" />
            </a>
            <div class="flex flex-col justify-center">
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="/">Our first project with React</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400 max-w-sm">
                Over the past year, Volosoft has undergone many changes! After months of preparation.
              </p>
              <a
                href="/"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 12 minutes
              </a>
            </div>
          </article>
        </div>
      </div>
    </aside>
  );
});

const CommentForm = component$(() => {
  return (
    <form class="mb-6">
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div class="py-2 px-4 bg-gray-50 rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={6}
            class="px-0 w-full text-sm text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          />
        </div>
        <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                />
              </svg>
              <span class="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              <span class="sr-only">Set location</span>
            </button>
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <span class="sr-only">Upload image</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
});
const Comments = component$(() => {
  return (
    <>
      <article class=" p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                class="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />
              Michael Gough
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {/* <time  datetime="2022-02-08" title="February 8th, 2022">
                Feb. 8, 2022
              </time> */}
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span class="sr-only">Comment settings</span>
          </button>

          <div
            id="dropdownComment1"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Edit
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Remove
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">
          Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The
          knowledge of the design tools are as important as the creation of the design strategy.
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
            </svg>
            11 Likes
          </button>
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
            Reply
          </button>
        </div>
      </article>
      <article class="p-6 mb-6 ml-12 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />
              Jese Leos
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {/* <time pubdate datetime="2022-02-12" title="February 12th, 2022">
                Feb. 12, 2022
              </time> */}
            </p>
          </div>
          <button
            id="dropdownComment2Button"
            data-dropdown-toggle="dropdownComment2"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span class="sr-only">Comment settings</span>
          </button>

          <div
            id="dropdownComment2"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Edit
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Remove
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
        <div class="flex items-center mt-4 space-x-4">
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
            </svg>
            3 Likes
          </button>
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
            Reply
          </button>
        </div>
      </article>
      <article class="p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                class="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie Green"
              />
              Bonnie Green
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {/* <time pubdate datetime="2022-03-12" title="March 12th, 2022">
                Mar. 12, 2022
              </time> */}
            </p>
          </div>
          <button
            id="dropdownComment3Button"
            data-dropdown-toggle="dropdownComment3"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span class="sr-only">Comment settings</span>
          </button>

          <div
            id="dropdownComment3"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Edit
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Remove
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">
          The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design
          strategy.
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
            </svg>
            24 Likes
          </button>
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
            Reply
          </button>
        </div>
      </article>
      <article class="p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                class="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                alt="Helene Engels"
              />
              Helene Engels
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {/* <time pubdate datetime="2022-06-23" title="June 23rd, 2022">
                Jun. 23, 2022
              </time> */}
            </p>
          </div>
          <button
            id="dropdownComment4Button"
            data-dropdown-toggle="dropdownComment4"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <div
            id="dropdownComment4"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Edit
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Remove
                </a>
              </li>
              <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">
          Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
            </svg>
            9 Likes
          </button>
          <button type="button" class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
            Reply
          </button>
        </div>
      </article>
    </>
  );
});

const SidebarLatestArticles = component$(() => {
  return (
    <div class="mb-12">
      <h4 class="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">Latest news</h4>
      <div class="mb-6 flex items-center">
        <a href="/" class="shrink-0">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-1.png"
            class="mr-4 max-w-full w-24 h-24 rounded-lg"
            alt=" 1"
          />
        </a>
        <div>
          <h5 class="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">Our first office</h5>
          <p class="mb-2 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone changes.</p>
          <a
            href="/"
            class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
          >
            Read in 9 minutes
          </a>
        </div>
      </div>
      <div class="mb-6 flex items-center">
        <a href="/" class="shrink-0">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-2.png"
            class="mr-4 max-w-full w-24 h-24 rounded-lg"
            alt=" 2"
          />
        </a>
        <div>
          <h5 class="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">Enterprise Design tips</h5>
          <p class="mb-2 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone changes.</p>
          <a
            href="/"
            class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
          >
            Read in 14 minutes
          </a>
        </div>
      </div>
      <div class="mb-6 flex items-center">
        <a href="/" class="shrink-0">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-3.png"
            class="mr-4 max-w-full w-24 h-24 rounded-lg"
            alt=" 3"
          />
        </a>
        <div>
          <h5 class="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">Partnered up with Google</h5>
          <p class="mb-2 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone changes.</p>
          <a
            href="/"
            class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
          >
            Read in 9 minutes
          </a>
        </div>
      </div>
    </div>
  );
});
const AdsPlaceholder = component$(() => {
  return (
    <div>
      {/* biome-ignore lint/a11y/useAnchorContent: <explanation> */}
      <a href="/" class="flex justify-center items-center mb-3 w-full h-48 bg-gray-100 rounded-lg dark:bg-gray-700">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>X</title>
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          />
        </svg>
      </a>

      <p class="text-xs text-gray-400 uppercase dark:text-gray-500">Ads placeholder</p>
    </div>
  );
});

const Sidebar = component$(() => {
  return (
    <aside class="hidden xl:block" aria-labelledby="sidebar-label">
      <div class="xl:w-[336px] sticky top-6">
        <h3 id="sidebar-label" class="sr-only">
          Sidebar
        </h3>
        <SidebarLatestArticles />
        <AdsPlaceholder />
      </div>
    </aside>
  );
});

const CommentsSection = component$(() => {
  return (
    <section class=" mt-4 not-format">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
      </div>
      <CommentForm />
      <Comments />
    </section>
  );
});
const SocialMediaShare = component$(() => {
  return (
    <aside aria-label="Share social media">
      <div class="not-format">
        <button
          data-tooltip-target="tooltip-facebook"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          id="tooltip-facebook"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Share on Facebook
          <div class="tooltip-arrow" data-popper-arrow />
        </div>

        <button
          data-tooltip-target="tooltip-twitter"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
            />
          </svg>
        </button>
        <div
          id="tooltip-twitter"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Share on Twitter
          <div class="tooltip-arrow" data-popper-arrow />
        </div>

        <button
          data-tooltip-target="tooltip-reddit"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            viewBox="0 0 18 18"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_13676_82300)">
              <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" />
              <path
                d="M15.0004 8.99997C15.0004 8.27365 14.411 7.68418 13.6846 7.68418C13.3267 7.68418 13.011 7.82102 12.7794 8.0526C11.8846 7.41049 10.6425 6.98944 9.27412 6.93681L9.87412 4.12628L11.8215 4.53681C11.8425 5.03155 12.2531 5.43155 12.7583 5.43155C13.2741 5.43155 13.6952 5.01049 13.6952 4.4947C13.6952 3.97891 13.2741 3.55786 12.7583 3.55786C12.3899 3.55786 12.0741 3.76839 11.9267 4.08418L9.7478 3.62102C9.68464 3.61049 9.62148 3.62102 9.56885 3.6526C9.51622 3.68418 9.48464 3.73681 9.46359 3.79997L8.80043 6.93681C7.40043 6.97891 6.1478 7.38944 5.24254 8.0526C5.01096 7.83155 4.68464 7.68418 4.33727 7.68418C3.61096 7.68418 3.02148 8.27365 3.02148 8.99997C3.02148 9.53681 3.33727 9.98944 3.80043 10.2C3.77938 10.3263 3.76885 10.4631 3.76885 10.6C3.76885 12.621 6.11622 14.2526 9.02149 14.2526C11.9267 14.2526 14.2741 12.621 14.2741 10.6C14.2741 10.4631 14.2636 10.3368 14.2425 10.2105C14.6741 9.99997 15.0004 9.53681 15.0004 8.99997ZM6.00043 9.93681C6.00043 9.42102 6.42148 8.99997 6.93727 8.99997C7.45306 8.99997 7.87412 9.42102 7.87412 9.93681C7.87412 10.4526 7.45306 10.8737 6.93727 10.8737C6.42148 10.8737 6.00043 10.4526 6.00043 9.93681ZM11.232 12.4105C10.5899 13.0526 9.36885 13.0947 9.01096 13.0947C8.65306 13.0947 7.42148 13.0421 6.7899 12.4105C6.69517 12.3158 6.69517 12.1579 6.7899 12.0631C6.88464 11.9684 7.04254 11.9684 7.13727 12.0631C7.53727 12.4631 8.40043 12.6105 9.02149 12.6105C9.64254 12.6105 10.4952 12.4631 10.9057 12.0631C11.0004 11.9684 11.1583 11.9684 11.2531 12.0631C11.3267 12.1684 11.3267 12.3158 11.232 12.4105ZM11.0636 10.8737C10.5478 10.8737 10.1267 10.4526 10.1267 9.93681C10.1267 9.42102 10.5478 8.99997 11.0636 8.99997C11.5794 8.99997 12.0004 9.42102 12.0004 9.93681C12.0004 10.4526 11.5794 10.8737 11.0636 10.8737Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_13676_82300">
                <rect width="18" height="18" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div
          id="tooltip-reddit"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Post on Reddit
          <div class="tooltip-arrow" data-popper-arrow />
        </div>

        <button
          data-tooltip-target="tooltip-link"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 19 19"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
            />
          </svg>
        </button>
        <div
          id="tooltip-link"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Share link
          <div class="tooltip-arrow" data-popper-arrow />
        </div>

        <button
          data-tooltip-target="tooltip-save"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
            />
          </svg>
        </button>
        <div
          id="tooltip-save"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Save this article
          <div class="tooltip-arrow" data-popper-arrow />
        </div>
      </div>
    </aside>
  );
});
const ArticleJumbotron = component$(() => {
  return (
    <header class="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/background.png')] w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative">
      {/* <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" /> */}
      <div class="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
        <span class="block mb-4 text-gray-300">
          Published in{" "}
          <a href="/" class="font-semibold text-white hover:underline">
            World News
          </a>
        </span>
        <h1 class="mb-4 max-w-4xl text-2xl font-extrabold leading-none text-white sm:text-3xl lg:text-4xl">
          Blocks Tutorial - Learn how to get started with custom sections using the Flowbite Blocks
        </h1>
        <p class="text-lg font-normal text-gray-300">Before going digital, you might scribbling down some ideas in a sketchbook.</p>
      </div>
    </header>
  );
});

const ArticleHeader = component$(() => {
  return (
    <div class="flex flex-col lg:flex-row justify-between lg:items-center">
      <div class="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-base mb-2 lg:mb-0">
        <span>
          By{" "}
          <a href="/" class="text-gray-900 dark:text-white hover:underline no-underline font-semibold">
            Jese Leos
          </a>
        </span>
        <span class="bg-gray-300 dark:bg-gray-400 w-2 h-2 rounded-full" />
        <span>
          {/* <time class="uppercase font-normal text-gray-500 dark:text-gray-400" pubdate datetime="2022-03-08" title="August 3rd, 2022">
            August 3, 2022, 2:20am EDT
          </time> */}
        </span>
      </div>
      <SocialMediaShare />
    </div>
  );
});
const Article = component$(() => {
  return (
    <article class="xl:w-[828px] w-full max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert dark:text-white">
      <ArticleHeader />
      <p class="dark:text-white">
        An open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive
        elements such as dropdowns, modals, datepickers.
      </p>
      <p class="dark:text-white">
        Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through
        before committing to an actual design project.
      </p>
      <p class="dark:text-white">
        But then I found a <a href="/">component library based on Tailwind CSS</a>. It comes with the most commonly used UI components, such
        as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.
      </p>
      <figure>
        <img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt="" class="mx-auto" />
        <figcaption>Digital art by Anonymous</figcaption>
      </figure>
      <h2>Getting started </h2>
      <p class="dark:text-white">
        First of all you need to understand how works. This library is not another framework. Rather, it is a set of components based on
        Tailwind CSS that you can just copy-paste from the documentation.
      </p>
      <p class="dark:text-white">
        It also includes a JavaScript file that enables interactive components, such as modals, dropdowns, and datepickers which you can
        optionally include into your project via CDN or NPM.
      </p>
      <p class="dark:text-white">
        You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart guide</a> to explore the elements
        by including the CDN files into your project. But if you want to build a project with I recommend you to follow the build tools
        steps so that you can purge and minify the generated CSS.
      </p>
      <p class="dark:text-white">
        You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help you get started with your
        projects even faster. You can check out this <a href="/">comparison table</a> to better understand the differences between the
        open-source and pro version of .
      </p>
      <h2>When does design come in handy?</h2>
      <p class="dark:text-white">
        While it might seem like extra work at a first glance, here are some key moments in which prototyping will come in handy:
      </p>

      <h3>Laying the groundwork for best design</h3>
      <p class="dark:text-white">
        Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through
        before committing to an actual design project.
      </p>
      <p class="dark:text-white">
        Let's start by including the CSS file inside the <code>head</code> tag of your HTML.
      </p>
      <h3 class="dark:text-white">Understanding typography</h3>
      <h4 class="dark:text-white"> Type properties</h4>
      <p class="dark:text-white">
        A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents
        shared patterns across a collection of letters.
      </p>
      <h4 class="dark:text-white">Baseline</h4>
      <p class="dark:text-white">
        A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents
        shared patterns across a collection of letters.
      </p>
      <h4 class="dark:text-white">Measurement from the baseline</h4>
      <p class="dark:text-white">
        A typeface is a collection of letters. While each letter is unique, certain shapes are shared across letters. A typeface represents
        shared patterns across a collection of letters.
      </p>
      <h3 class="dark:text-white">Type classification</h3>
      <h4 class="dark:text-white">Serif</h4>
      <p>
        A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter. Typefaces with serifs are
        called serif typefaces. Serif fonts are classified as one of the following:
      </p>
      <h4 class="dark:text-white">Old-Style serifs</h4>
      <ul class="dark:text-white">
        <li>Low contrast between thick and thin strokes</li>
        <li>Diagonal stress in the strokes</li>
        <li>Slanted serifs on lower-case ascenders</li>
      </ul>

      <ol class="dark:text-white">
        <li>Low contrast between thick and thin strokes</li>
        <li>Diagonal stress in the strokes</li>
        <li>Slanted serifs on lower-case ascenders</li>
      </ol>
      <h3 class="dark:text-white">Laying the best for successful prototyping</h3>
      <p class="dark:text-white">A serif is a small shape or projection that appears at the beginning:</p>
      <blockquote>
        <p class="dark:text-white">
          is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect
          choice for your next SaaS application.
        </p>
      </blockquote>
      <h4 class="dark:text-white">Code example</h4>
      <p class="dark:text-white">
        A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter. Typefaces with serifs are
        called serif typefaces. Serif fonts are classified as one of the following:
      </p>

      <h4>Table example</h4>
      <p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.</p>

      <h3>Best practices for setting up your prototype</h3>
      <p>
        <strong>Low fidelity or high fidelity?</strong> Fidelity refers to how close a prototype will be to the real deal. If you’re simply
        preparing a quick visual aid for a presentation, a low-fidelity prototype — like a wireframe with placeholder images and some basic
        text — would be more than enough. But if you’re going for more intricate usability testing, a high-fidelity prototype — with
        on-brand colors, fonts and imagery — could help get more pointed results.
      </p>
      <p>
        <strong>Consider your user</strong>. To create an intuitive user flow, try to think as your user would when interacting with your
        product. While you can fine-tune this during beta testing, considering your user’s needs and habits early on will save you time by
        setting you on the right path.
      </p>
      <p>
        <strong>Start from the inside out</strong>. A nice way to both organize your tasks and create more user-friendly prototypes is by
        building your prototypes ‘inside out’. Start by focusing on what will be important to your user, like a Buy now button or an image
        gallery, and list each element by order of priority. This way, you’ll be able to create a prototype that puts your users’ needs at
        the heart of your design.
      </p>
      <p>And there you have it! Everything you need to design and share prototypes — right in Flowbite Figma.</p>
      <CommentsSection />
    </article>
  );
});
const Page = component$(() => {
  return (
    <>
      <main class="pb-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <ArticleJumbotron />
        <div class="flex sticky z-20 justify-between p-6 -m-36 mx-4 max-w-screen-xl bg-white dark:bg-gray-800 rounded xl:-m-32 xl:p-9 xl:mx-auto">
          <Article />
          <span id="hiddenspan" class="hidden" />
          <Sidebar />
        </div>
      </main>

      <RelatedArticles />
    </>
  );
});
export default Page;

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
