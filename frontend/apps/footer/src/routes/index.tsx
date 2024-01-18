import { component$ } from "@builder.io/qwik";
import { GithubLinkIcon, TwitterLinkIcon, FacebookLinkIcon } from "components";
const Footer = component$(() => {
  const date = new Date();

  return (
    <footer class="bg-gray-50 dark:bg-gray-800">
      <div class="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:-10">
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div class="col-span-2">
            <a href="/" class="flex items-center mb-2 text-2xl font-semibold text-gray-900 sm:mb-0 dark:text-white">
              COMPANY NAME
            </a>
            <p class="my-4 font-light text-gray-500 dark:text-gray-400">COMPANY NAME is super cool</p>
            <ul class="flex mt-5 space-x-6">
              <li>
                <a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <FacebookLinkIcon className="w-5 h-5" />
                </a>
              </li>

              <li>
                <a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <TwitterLinkIcon className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a href="/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <GithubLinkIcon className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
          <div class="lg:mx-auto">
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul class="text-gray-500 dark:text-gray-400">
              <li class="mb-4">
                <a href="/about" class=" hover:underline">
                  About
                </a>
              </li>
              <li class="mb-4">
                <a href="/careers" class="hover:underline">
                  Careers
                </a>
              </li>

              <li class="mb-4">
                <a href="/blog" class="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div class="lg:mx-auto">
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul class="text-gray-500 dark:text-gray-400">
              <li class="mb-4">
                <a href="/" class="hover:underline">
                  Discord Server
                </a>
              </li>

              <li class="mb-4">
                <a href="/faq" class="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div class="lg:mx-auto">
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-500 dark:text-gray-400">
              <li class="mb-4">
                <a href="/policy" class="hover:underline">
                  Privacy Policy
                </a>
              </li>

              <li class="mb-4">
                <a href="/terms" class="hover:underline">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-center text-gray-500 dark:text-gray-400">
          © {date.getFullYear()}
          <a href="/" class="hover:underline">
            COMPANY NAME™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
});

export default Footer;
