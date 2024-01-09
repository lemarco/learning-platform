import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900 h-[900px]">
        <div class=" py-8 px-4 my-auto mx-auto max-w-screen-xl text-center sm:py-16 lg:px-6">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">The most trusted learning platform</h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here are a few reasons why you should choose our company</p>
          <div class="mt-8 lg:mt-12 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <svg
                class="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Secure storage</h3>
              <p class="mb-4 text-gray-500 dark:text-gray-400">
                We store the vast majority of the digital assets in secure offline storage.
              </p>
            </div>
            <div>
              <svg
                class="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Insurance</h3>
              <p class="mb-4 text-gray-500 dark:text-gray-400">
                Flowbite maintains crypto insurance and all USD cash balances are covered.
              </p>
            </div>
            <div>
              <svg
                class="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Best practices</h3>
              <p class="mb-4 text-gray-500 dark:text-gray-400">
                Flowbite marketplace supports a variety of the most popular digital currencies.
              </p>
            </div>
          </div>
          <h4 class="mt-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white"> There is no vacancy available</h4>
        </div>
      </section>
    </>
  );
});
