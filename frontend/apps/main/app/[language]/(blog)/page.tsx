import { getMetadataGenerator } from "@/services/i18n";
import Image from "next/image";
export const generateMetadata = getMetadataGenerator("home");
const BlogPreview = () => {
  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
          <article>
            <a href="/" title="">
              <img
                className="object-cover w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/blog-featured.png"
                alt="featured "
              />
            </a>

            <div className="mt-5 space-y-3">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                <svg aria-hidden="true" className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Programming
              </span>

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                <a href="/" className="hover:underline" title="">
                  Releasing code in large corporations is slow - and there is a good reason for it
                </a>
              </h2>

              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt=""
                />
                <div className="text-md font-medium leading-tight text-gray-900 dark:text-white">
                  <div>Michael Gough</div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Posted on Jan 31</div>
                </div>
              </div>

              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                One of the things I always loved about the web is its immediacy. You write a piece of code, publish it somewhere and people
                can access it.
              </p>

              <a
                href="/"
                title=""
                className="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500"
              >
                Read more
                <svg aria-hidden="true" className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </article>

          <div className="space-y-8">
            <article>
              <div className="space-y-3">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tutorial
                </span>

                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  <a href="/" className="hover:underline" title="">
                    How to rank higher on Google (6 easy steps)
                  </a>
                </h2>

                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even
                  influence both web designers and developers.
                </p>

                <a
                  href="/"
                  title=""
                  className="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article>
              <div className="space-y-3">
                <span className="bg-pink-100 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Interview
                </span>

                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  <a href="/" className="hover:underline" title="">
                    How to schedule your tweets to send later
                  </a>
                </h2>

                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even.
                </p>

                <a
                  href="/"
                  title=""
                  className="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article>
              <div className="space-y-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Marketing
                </span>

                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  <a href="/" className="hover:underline" title="">
                    12 SEO best practices that everyone should follow
                  </a>
                </h2>

                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Static websites are now used to bootstrap lots of websites and are becoming the basis.
                </p>

                <a
                  href="/"
                  title=""
                  className="inline-flex items-center text-base font-semibold leading-tight text-primary-600 hover:underline dark:text-primary-500"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

const PriceSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic
            growth.
          </p>
          <div className="flex justify-center items-center">
            <span className="text-base font-medium text-gray-900 dark:text-white">Monthly</span>

            <div>
              <label htmlFor="toggle-example" className="flex relative items-center mx-4 cursor-pointer">
                <input type="checkbox" id="toggle-example" className="sr-only" />
                <div className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-700" />
              </label>
            </div>
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">Yearly</span>
          </div>
        </div>
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-10">
          <div className="flex flex-col p-6 mx-auto max-w-xl text-center bg-white rounded-lg border border-gray-200 shadow xl:max-w-lg dark:border-gray-700 dark:bg-gray-800 xl:p-8">
            <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">Starter</h3>
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$29</span>
            <p className="mt-4 mb-1 text-gray-500 text-light dark:text-gray-400">$19 USD per month, paid annually</p>
            <a
              href="/"
              className="inline-flex justify-center items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
            >
              Go to annual plan
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="/"
              className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8 dark:bg-gray-600 dark:text-white  dark:hover:bg-gray-500 dark:focus:ring-gray-600"
            >
              Get started
            </a>

            <ul role="list" className="space-y-4 text-left text-gray-900 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>All tools you need to manage payments</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No setup, monthly, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Comprehensive security</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="line-through">Get hundreds of feature updates</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through"> Payouts to your bank account</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through">Financial reconciliation and reporting</span>
              </li>

              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through">24×7 phone, chat, and email support</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span className="line-through">Robust developer platform</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-xl text-center bg-white rounded-lg border shadow xl:max-w-lg border-primary-600 dark:bg-gray-800 xl:p-8">
            <div className="mb-2">
              <span className="py-1 px-3 text-sm text-primary-800 bg-primary-100 rounded dark:bg-primary-200 dark:text-primary-800">
                Most popular
              </span>
            </div>
            <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">Premium</h3>
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$199</span>
            <p className="mt-4 mb-1 text-gray-500 text-light dark:text-gray-400">$159 USD per month, paid annually</p>
            <a
              href="/"
              className="inline-flex justify-center items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
            >
              Go to annual plan
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="/"
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8"
            >
              Get started
            </a>

            <ul role="list" className="space-y-4 text-left text-gray-900 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>All tools you need to manage payments</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No setup, monthly, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Comprehensive security</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Get hundreds of feature updates</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Payouts to your bank account</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through">Financial reconciliation and reporting</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-through">24×7 phone, chat, and email support</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span className="line-through">Robust developer platform</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-xl text-center bg-white rounded-lg border border-gray-200 shadow xl:max-w-lg dark:border-gray-700 dark:bg-gray-800 xl:p-8">
            <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">Enterprise</h3>
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$599</span>
            <p className="mt-4 mb-1 text-gray-500 text-light dark:text-gray-400">$499 USD per month, paid annually</p>
            <a
              href="/"
              className="inline-flex justify-center items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
            >
              Go to annual plan
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="/"
              className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8 dark:bg-gray-600 dark:text-white  dark:hover:bg-gray-500 dark:focus:ring-gray-600"
            >
              Get started
            </a>

            <ul role="list" className="space-y-4 text-left text-gray-900 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>All tools you need to manage payments</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No setup, monthly, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Comprehensive security</span>
              </li>
              <li className="flex items-center space-x-3">
                {" "}
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Get hundreds of feature updates</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Payouts to your bank account</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Financial reconciliation and reporting</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24×7 phone, chat, and email support</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span>Robust developer platform</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CourseCorousel = () => {
  return (
    <aside aria-label="Related articles" className="py-8 bg-white dark:bg-gray-900 lg:py-16 antialiased">
      <div className="px-4 mx-auto w-full max-w-screen-xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Trending on Flowbite</h2>
        <div id="animation-carousel" data-carousel="slide">
          <div className="relative overflow-hidden rounded-lg h-[480px]">
            <div className="hidden bg-white duration-700 ease-in-out dark:bg-gray-900" data-carousel-item>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article className="p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:border-gray-700">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Jese Leos</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first office</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 sm:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/google-hq.png"
                      alt="google hq"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                      alt="Roberta Casas avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Roberta Casas</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">We partnered up with Google</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 xl:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops-2.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                      alt="Sofia McGuire avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Sofia McGuire</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first project with React</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
              </div>
            </div>
            <div className="hidden bg-white duration-700 ease-in-out dark:bg-gray-900" data-carousel-item>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article className="p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/google-hq.png"
                      alt="google hq"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                      alt="Roberta Casas avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Roberta Casas</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">We partnered up with Google</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 sm:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Jese Leos</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first office</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 xl:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops-2.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                      alt="Sofia McGuire avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Sofia McGuire</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first project with React</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
              </div>
            </div>
            <div className="hidden bg-white duration-700 ease-in-out dark:bg-gray-900" data-carousel-item>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article className="p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops-2.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                      alt="Sofia McGuire avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Sofia McGuire</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first project with React</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 sm:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/google-hq.png"
                      alt="google hq"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                      alt="Roberta Casas avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Roberta Casas</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">We partnered up with Google</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
                <article className="hidden p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-800 xl:block">
                  <a href="/">
                    <img
                      className="mb-5 rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops.png"
                      alt="office laptop working"
                    />
                  </a>
                  <div className="flex items-center mb-3 space-x-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <div className="font-medium dark:text-white">
                      <div>Jese Leos</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Aug 15, 2021 · 16 min read</div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl dark:text-white">
                    <a href="/">Our first office</a>
                  </h3>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our
                    new office.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 hover:no-underline"
                  >
                    Read more{" "}
                    <svg
                      className="mt-px ml-1 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </article>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="button"
              className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                <span className="hidden">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="hidden">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-12 sm:text-center lg:py-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
          <p className="font-light text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48 dark:text-gray-400">
            We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big
            enough to deliver the scope you want at the pace you need.
          </p>
          <iframe
            className="mx-auto mt-8 w-full max-w-2xl h-64 rounded-lg lg:mt-12 sm:h-96"
            src="https://www.youtube.com/embed/nMrTOVy6OOE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          />
        </div>
      </section>
      <BlogPreview />
      <CourseCorousel />
      <PriceSection />
    </>
  );
};
