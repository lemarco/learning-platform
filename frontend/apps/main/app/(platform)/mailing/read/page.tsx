"use client";

import { Button } from "flowbite-react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import {
  HiArchive,
  HiArrowNarrowLeft,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiClock,
  HiExclamationCircle,
  HiOutlinePhotograph,
  HiOutlineTag,
  HiPaperClip,
  HiPrinter,
  HiReply,
  HiTrash,
} from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";

const MailingReadPage: NextPage = () => (
  <>
    <Menu />
    <div className="p-5">
      <div className="mb-4 flex items-center">
        <div className="shrink-0">
          <Image alt="" height={32} src="/images/users/bonnie-green.png" width={32} className="rounded-full" />
        </div>
        <div className="ml-4">
          <div className="truncate text-base font-semibold text-gray-900 dark:text-white">Bonnie Green</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</div>
        </div>
      </div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Website Hosting Reviews Free The Best Resource For Hosting Comparison
      </h1>
      <div className="space-y-2">
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Do you know what could beat the exciting feeling of having a new computer? Make your own PC easy and compatible!
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          So insisted received is occasion advanced honoured. Among ready to which up. Attacks smiling and may out assured moments man
          nothing outward. Thrown any behind afford either the set depend one temper. Instrument melancholy in acceptance collecting
          frequently be if. Zealously now pronounce existence add you instantly say offending. Merry their far had widen was. Concerns no in
          expenses raillery formerly.
        </p>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Best Regards,
          <br />
          Bonnie Green, CEO Themesberg LLC
        </p>
      </div>
    </div>
    <Footer />
  </>
);

const Menu: FC = () => (
  <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
    <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
      <div className="pr-3">
        <Link
          href="/mailing/inbox"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Go back</span>
          <HiArrowNarrowLeft className="text-2xl" />
        </Link>
      </div>
      <div className="flex space-x-2 pl-0 sm:px-2">
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Save for later</span>
          <HiClock className="text-2xl" />
        </Link>
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Purge</span>
          <HiExclamationCircle className="text-2xl" />
        </Link>
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Move</span>
          <HiArchive className="text-2xl" />
        </Link>
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Tag</span>
          <HiOutlineTag className="text-2xl" />
        </Link>
      </div>
      <div className="pl-3 text-sm font-medium text-gray-500">Today, 08:34 AM</div>
    </div>
    <div className="hidden space-x-2 divide-x divide-gray-100 pl-0 dark:divide-gray-700 sm:flex sm:px-2">
      <div className="flex gap-1 pr-2">
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Reply</span>
          <HiReply className="h-6 w-6" />
        </Link>
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Delete</span>
          <HiTrash className="h-6 w-6" />
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
);

const Footer: FC = () => (
  <div className="bottom-0 right-0 w-full border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:fixed lg:pl-64">
    <div className="items-center dark:divide-gray-700 sm:flex sm:divide-x sm:divide-gray-100 lg:pl-4">
      <div className="mb-3 space-y-3 sm:mb-0 sm:mr-3 sm:flex sm:space-x-3 sm:space-y-0">
        <Button color="blue" href="/mailing/reply">
          <div className="flex items-center gap-x-2">
            <HiReply className="-ml-1 h-5 w-5" />
            Reply
          </div>
        </Button>
        <Button color="gray" href="#">
          <div className="flex items-center gap-x-2">
            <HiArrowRight className="-ml-1 h-5 w-5" />
            Forward
          </div>
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
          <HiOutlinePhotograph className="h-6 w-6" />
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
  </div>
);

export default MailingReadPage;
