"use client";

import { Footer } from "flowbite-react";
import type { FC } from "react";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const DashboardFooter: FC = () => (
  <div className="mx-4 my-6">
    <Footer className="p-4 md:p-6 xl:p-8" container>
      <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        <Footer.LinkGroup>
          <Footer.Link href="#" className="mb-3 mr-3 text-gray-500 dark:text-gray-400 lg:mb-0">
            Terms and conditions
          </Footer.Link>
          <Footer.Link href="#" className="mb-3 mr-3 text-gray-500 dark:text-gray-400 lg:mb-0">
            Privacy Policy
          </Footer.Link>
          <Footer.Link href="#" className="mr-3 text-gray-500 dark:text-gray-400">
            Licensing
          </Footer.Link>
          <Footer.Link href="#" className="mr-3 text-gray-500 dark:text-gray-400">
            Cookie Policy
          </Footer.Link>
          <Footer.Link href="#" className="text-gray-500 dark:text-gray-400">
            Contact
          </Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup className="flex-nowrap gap-6 sm:justify-center">
          <Footer.Link href="#" className="m-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:m-0">
            <MdFacebook className="h-5 w-5" />
          </Footer.Link>
          <Footer.Link href="#" className="m-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:m-0">
            <FaInstagram className="h-5 w-5" />
          </Footer.Link>
          <Footer.Link href="#" className="m-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:m-0">
            <FaTwitter className="h-5 w-5" />
          </Footer.Link>
          <Footer.Link href="#" className="m-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:m-0">
            <FaGithub className="h-5 w-5" />
          </Footer.Link>
          <Footer.Link href="#" className="m-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:m-0">
            <FaDribbble className="h-5 w-5" />
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
    <p className="my-10 text-center text-sm text-gray-500">
      &copy; 2019-{new Date().getFullYear()}{" "}
      <a href="https://flowbite.com/" className="hover:underline" target="_blank" rel="noreferrer">
        Flowbite.com
      </a>
      . All rights reserved.
    </p>
  </div>
);

export default DashboardFooter;
