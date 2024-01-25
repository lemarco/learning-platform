
import {FlChevronLeftOutline } from "@qwikest/icons/flowbite";
import Image404 from '@/images/illustrations/404.svg?jsx'
import {useVisibleTask$ } from "@builder.io/qwik";
import {component$} from '@builder.io/qwik'
export default component$(() =>{
  useVisibleTask$(() => {
    console.log("It s 404 page")
  });
  return (
    <div class="mx-auto flex h-screen flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div class="block md:max-w-lg">
        <Image404 height={600} width={600} />
      </div>
      <div class="text-center xl:max-w-4xl">
        <h1 class="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">Page not found</h1>
        <p class="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
        </p>
        <a href="/" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        {/* <Button color="blue" href="/" class="inline-flex p-[1px]"> */}
          <div class="mr-1 flex items-center gap-x-2">
            <FlChevronLeftOutline class="text-xl" /> Go back home
          </div>
          </a>
      </div>
    </div>
  );
})
