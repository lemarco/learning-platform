import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { GithubIcon, GoogleIcon } from "../../../../libs/icons";
import { Modal } from "../../../../libs/modal";

// import { ArrowIcon, BurgerIcon, ExploreDesignWorkIcon } from "@frontend/icons";

const Form = component$(({ googleLink }: { googleLink: string }) => {
  return (
    <form q:slot="content">
      <h2 class="mb-4 text-lg font-light text-gray-500 dark:text-white">
        Join over <span class="font-medium text-gray-900 dark:text-white">74,000</span> developers and designers.
      </h2>
      <div class="flex items-center mb-6 space-x-4">
        <a
          href="/"
          class="w-full inline-flex items-center justify-center text-white bg-[#333] hover:bg-[#1a1919] dark:focus:ring-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <GithubIcon />
          Github
        </a>
        <a
          href={googleLink}
          class="w-full inline-flex items-center justify-center text-white bg-[#4284F4] hover:bg-[#3372df] dark:focus:ring-[#0f53c9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <GoogleIcon />
          Google
        </a>
      </div>

      <div class="flex items-start mb-3">
        <div class="ml-3 text-sm">
          <label for="newsletter" class="text-gray-500 dark:text-gray-400">
            I want to receive promotional offers (no spam).
          </label>
        </div>
      </div>
      <div class="flex items-start mb-4">
        <div class="ml-3 text-sm">
          <label for="terms" class="text-gray-500 dark:text-gray-400">
            I agree to all the
            <a class="font-medium underline text-primary-600 hover:text-primary-700 hover:no-underline" href="/">
              Terms
            </a>
            and
            <a class="font-medium underline hover:no-underline text-primary-600 hover:text-primary-700" href="/">
              Privacy Policy
            </a>
            .
          </label>
        </div>
      </div>
    </form>
  );
});

const LoginTriggerAndPopup = component$(({ googleLink }: { googleLink: string }) => {
  return (
    <Modal
      modalId="signin-popup"
      triggerStyle="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      triggerText="Signin"
    >
      <Form q:slot="content" googleLink={googleLink} />
    </Modal>
  );
});

export default LoginTriggerAndPopup;
