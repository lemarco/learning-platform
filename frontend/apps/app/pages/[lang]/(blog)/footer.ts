import { html } from "../../../utils/html";

export const Footer = () => {
  const date = new Date();

  return html`
    <footer className="bg-gray-50 dark:bg-gray-800 absolute left-0 bottom-0 w-full">
      <div className="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-2">
            <a href="/" className="flex items-center mb-2 text-2xl font-semibold text-gray-900 sm:mb-0 dark:text-white">
              COMPANY NAME
            </a>
            <p className="my-4 font-light text-gray-500 dark:text-gray-400">COMPANY NAME is super cool</p>
            <ul className="flex mt-5 space-x-6">
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                
                </a>
              </li>

              <li>
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
 
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
              
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="/about" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>

              <li className="mb-4">
                <a href="/blog" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="/" className="hover:underline">
                  Discord Server
                </a>
              </li>

              <li className="mb-4">
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="/policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>

              <li className="mb-4">
                <a href="/terms" className="hover:underline">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
          © {date.getFullYear()}
          <a href="/" className="hover:underline">
            COMPANY NAME™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  `;
};
