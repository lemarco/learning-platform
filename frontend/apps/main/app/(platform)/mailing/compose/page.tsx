"use client";

import { Button, Label, TextInput, Textarea } from "flowbite-react";
import type { NextPage } from "next";
import Link from "next/link";
import {
  HiArrowNarrowLeft,
  HiChevronLeft,
  HiChevronRight,
  HiPaperAirplane,
  HiPaperClip,
  HiPhotograph,
  HiPrinter,
  HiTrash,
} from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";

// biome-ignore lint/complexity/useArrowFunction: <explanation>
const MailingComposePage: NextPage = function () {
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
          <div className="pr-3">
            <Link
              href="/mailing/inbox"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Go back</span>
              <HiArrowNarrowLeft className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex space-x-2 pl-4 text-gray-500">New Message</div>
        </div>
        <div className="hidden space-x-2 divide-x divide-gray-100 pl-0 dark:divide-gray-700 sm:flex sm:px-2">
          <div className="pr-2">
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Delete</span>
              <HiTrash className="text-2xl" />
            </Link>
          </div>
          <div className="flex gap-1 pl-2">
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <HiChevronLeft className="h-7 w-7" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <HiChevronRight className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
      <form className="bottom-0 right-0 bg-white p-4 pt-8 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 space-y-4 lg:mb-5 lg:pl-4">
          <div>
            <Label htmlFor="message-to" className="sr-only">
              To
            </Label>
            <TextInput id="message-to" name="message-to" placeholder="To" />
          </div>
          <div>
            <Label htmlFor="message-subject" className="sr-only">
              Subject
            </Label>
            <TextInput id="message-subject" name="message-subject" placeholder="Subject" />
          </div>
          <div>
            <Label htmlFor="reply-mail" className="sr-only">
              Your message
            </Label>
            <Textarea id="reply-mail" name="reply-mail" placeholder="Write text here ..." rows={24} />
          </div>
        </div>
        <div className="items-center dark:divide-gray-700 sm:flex sm:divide-x sm:divide-gray-100 lg:pl-4">
          <div className="mb-3 space-y-3 sm:mb-0 sm:flex sm:space-y-0">
            <Button color="blue" type="submit" className="mr-3">
              Send
              <HiPaperAirplane className="-mr-1 ml-2 h-4 w-4 rotate-90 transform" />
            </Button>
          </div>
          <div className="flex space-x-1 pl-0 sm:pl-2">
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Add emoji</span>
              <HiFaceSmile className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Attach</span>
              <HiPaperClip className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Screenshot</span>
              <HiPhotograph className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Print</span>
              <HiPrinter className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default MailingComposePage;
