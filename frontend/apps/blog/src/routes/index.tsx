import { component$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { Image, type ImageTransformerProps, useImageProvider } from "qwik-image";

const ArticlePreview = component$(() => {
  return (
    <article class="w-full max-w-4xl">
      <header class="mb-4 lg:mb-6 ">
        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          Prototyping from A to Z: best practices for successful prototypes
        </h1>
        <div class="text-base">
          <address class="inline">
            {" "}
            By
            <a rel="author" class="text-gray-900 no-underline dark:text-white hover:underline" href="/">
              {" "}
              Jese Leos{" "}
            </a>{" "}
          </address>
          in{" "}
          <a href="/" class="text-gray-900 no-underline dark:text-white hover:underline">
            Design
          </a>
          on{" "}
          {/* <time pubdate class="uppercase" datetime="2022-02-08" title="February 8th, 2022">
        Feb. 8, 2022
      </time> */}
        </div>
      </header>
      <div class="flex justify-between items-center mb-4">
        <aside aria-label="Share social media">
          <a
            href="/"
            class="inline-flex items-center py-2 px-3 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg class="mr-2 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            Share
          </a>
          <a
            href="/"
            class="inline-flex items-center py-2 px-3 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg class="mr-2 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
              />
            </svg>
            Tweet
          </a>
          <a
            href="/"
            class="inline-flex items-center py-2 px-3 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg class="mr-2 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
              />
            </svg>
            Copy link
          </a>
        </aside>
        <button
          data-tooltip-target="tooltip-save"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
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
      <figure>
        <Image layout="fixed" src={"https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"} alt="" />

        <figcaption>Digital art by Anonymous</figcaption>
      </figure>
      <p class="text-gray-900 no-underline dark:text-white hover:underline">
        Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes
        interactive elements such as dropdowns, modals, datepickers.
      </p>
      <p class="text-gray-900 no-underline dark:text-white hover:underline">
        Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through
        before committing to an actual design project.
      </p>
      <p class="text-gray-900 no-underline dark:text-white hover:underline">
        But then I found a <a href="/">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI
        components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes
        from Tailwind CSS.
      </p>

      <h2>Getting started with Flowbite</h2>
      <p class="text-gray-900 no-underline dark:text-white hover:underline">
        First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components
        based on Tailwind CSS that you can just copy-paste from the documentation.
      </p>
    </article>
  );
});
const RecommendedTopics = component$(() => {
  return (
    <div class="p-6 mb-6 font-medium text-gray-500 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {/* <form class="mb-6">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
      Search
    </label>
    <div class="relative">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        class="block py-2.5 pl-9 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Search..."
        required
      />
    </div>
  </form> */}
      <h4 class="mb-6 font-bold text-gray-900 uppercase dark:text-white">Recommended topics</h4>
      <div class="flex flex-wrap">
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Technology
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Money
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Art
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Productivity
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Psychology
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Design
        </a>
        <a
          href="/"
          class="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
        >
          Mindfulness
        </a>
      </div>
    </div>
  );
});
const AsideProfileCard = component$(() => {
  return (
    <div class="p-6 mb-6 text-gray-500 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <a href="/" class="flex items-center mb-4">
        <div class="mr-3 shrink-0">
          <Image
            class="mt-1 w-8 h-8 rounded-full"
            layout="fixed"
            src={"https://flowbite.com/docs/images/people/profile-picture-1.jpg"}
            alt="Jese Leos"
          />
        </div>
        <div class="mr-3">
          <span class="block font-medium text-gray-900 dark:text-white">Jese Leos</span>
          <span class="text-sm">34k followers</span>
        </div>
      </a>
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">Hey! I'm Jese Leos. I'm a career-changer. Bootcamp grad & Dev.</p>
      <dl class="mb-5">
        <dt class="mb-2 text-sm font-bold text-gray-900 uppercase dark:text-white">Location</dt>
        <dd class="mb-3 text-sm text-gray-500 dark:text-gray-400">California, United States</dd>
        <dt class="mb-2 text-sm font-bold text-gray-900 uppercase dark:text-white">Joined</dt>
        <dd class="text-sm text-gray-500 dark:text-gray-400">September 20, 2018</dd>
      </dl>
    </div>
  );
});
const Sidebar = component$(() => {
  return (
    <aside class="hidden lg:block lg:w-72" aria-labelledby="sidebar-label">
      <div class="sticky z-50 top-36">
        <h3 id="sidebar-label" class="sr-only">
          Sidebar
        </h3>
        <AsideProfileCard />
        <RecommendedTopics />
      </div>
    </aside>
  );
});

const Blog = component$(() => {
  const articles = [1, 2, 3, 4, 5];
  return (
    <>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div class="flex justify-between px-4 xl:px-0 mx-auto max-w-screen-xl ">
          <div class="flex flex-col">
            {articles.map((content, idx) => {
              return <ArticlePreview key={idx + Math.random()} />;
            })}
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
});

export default Blog;
