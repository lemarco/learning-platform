import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import Popup from "../features/modal";
import { GithubIcon } from "../icons/github";
import { GoogleIcon } from "../icons/google";

const Form = component$(() => {
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
          href="/"
          class="w-full inline-flex items-center justify-center text-white bg-[#4284F4] hover:bg-[#3372df] dark:focus:ring-[#0f53c9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <GoogleIcon />
          Google
        </a>
      </div>
      {/* <div class="flex items-center mb-6">
    <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
    <div class="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
    <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
  </div> */}
      {/* <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@flowbite.com" required={false}/>
</div>
<div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="">
</div>
<div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat Password</label>
    <input type="repeat-password" name="repeat-password" id="repeat-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="">
</div> */}
      <div class="flex items-start mb-3">
        {/* <div class="flex items-center h-5">
        <input id="newsletter" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
    </div> */}
        <div class="ml-3 text-sm">
          <label for="newsletter" class="text-gray-500 dark:text-gray-400">
            I want to receive promotional offers (no spam).
          </label>
        </div>
      </div>
      <div class="flex items-start mb-4">
        {/* <div class="flex items-center h-5">
        <input id="terms" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
    </div> */}
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
      {/* <button
    type="submit"
    class="w-full text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
  >
    Create an account
  </button>
  <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
    Already have an account?{" "}
    <a href="/" class="font-medium underline text-primary-600 hover:no-underline dark:text-primary-500 hover:text-primary-700">
      Log In
    </a>
  </p> */}
    </form>
  );
});

const LoginTriggerAndPopup = component$(() => {
  return (
    <Popup
      modalId="signin-popup"
      triggerStyle="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      triggerText="Signin"
    >
      <Form q:slot="content" />
    </Popup>
  );
});

export default LoginTriggerAndPopup;
