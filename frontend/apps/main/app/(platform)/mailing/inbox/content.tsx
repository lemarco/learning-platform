"use client";

import { Checkbox, Label, Progress, Table } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import {
  HiArchive,
  HiChevronLeft,
  HiChevronRight,
  HiDotsVertical,
  HiExclamationCircle,
  HiEye,
  HiOutlineStar,
  HiOutlineViewGrid,
  HiPlusSm,
  HiStar,
  HiTrash,
  HiViewGrid,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import type { MailingInboxPageData } from "./page";

const MailingInboxPageContent: FC<MailingInboxPageData> = ({ inboxMessages }) => (
  <>
    <Menu inboxMessages={inboxMessages} />
    <Inbox inboxMessages={inboxMessages} />
    <Footer />
  </>
);

const Menu: FC<MailingInboxPageData> = ({ inboxMessages }) => {
  const [page, setPage] = useState(0);
  const numEntriesPerPage = Math.min(20, inboxMessages.length);
  const numPages = Math.floor(inboxMessages.length / numEntriesPerPage);

  const previousPage = () => {
    setPage(page > 0 ? page - 1 : page);
  };

  const nextPage = () => {
    setPage(page < numPages - 1 ? page + 1 : page);
  };

  return (
    <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
        <div className="pr-3">
          <Label htmlFor="checkbox-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="checkbox-all" name="checkbox-all" />
        </div>
        <div className="flex space-x-2 px-0 sm:px-2">
          <Link
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Delete</span>
            <HiTrash className="text-2xl" />
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
            <span className="sr-only">Purge</span>
            <HiExclamationCircle className="text-2xl" />
          </Link>
          <Link
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Settings</span>
            <HiDotsVertical className="text-2xl" />
          </Link>
        </div>
        <div className="pl-3">
          <Link
            href="/mailing/compose"
            className="mr-3 inline-flex items-center gap-x-2 rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <HiPlusSm className="h-5 w-5" />
            Compose
          </Link>
        </div>
      </div>
      <div className="hidden items-center space-x-0 space-y-3 sm:flex sm:space-x-3 sm:space-y-0">
        <Link
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Apps</span>
          <HiOutlineViewGrid className="h-7 w-7" />
        </Link>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={previousPage}
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous</span>
          <HiChevronLeft className="h-7 w-7" />
        </button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={nextPage}
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next</span>
          <HiChevronRight className="h-7 w-7" />
        </button>
        <span className="font-normal text-gray-500 dark:text-gray-400 sm:text-xs md:text-sm">
          Show&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {page * inboxMessages.length + 1}-{numEntriesPerPage * page + numEntriesPerPage}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">{inboxMessages.length}</span>
        </span>
      </div>
    </div>
  );
};

const Inbox: FC<MailingInboxPageData> = ({ inboxMessages }) => {
  const router = useRouter();

  function onRowClick() {
    router.push("/mailing/read");
  }

  function onRowSelect(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.stopPropagation();
  }

  function onRowStar(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <Table className="min-w-full divide-y divide-gray-200">
              <Table.Body
                theme={{ cell: { base: "rounded-none" } }}
                className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
              >
                {inboxMessages.map(({ avatar, sender, subject, time, read, starred }) => (
                  <Table.Row
                    key={`${sender}-${time}-${subject}`}
                    className="cursor-pointer bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                    onClick={onRowClick}
                  >
                    <Table.Cell className="w-4 p-4">
                      <div className="inline-flex items-center space-x-4">
                        <Checkbox id="checkbox-1" onClick={onRowSelect} />
                        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                        <button onClick={onRowStar}>
                          {starred ? (
                            <HiStar className="h-6 w-6 text-gray-500 hover:text-yellow-300 dark:text-gray-400 dark:hover:text-yellow-300" />
                          ) : (
                            <HiOutlineStar className="h-6 w-6 text-gray-500 hover:text-yellow-300 dark:text-gray-400 dark:hover:text-yellow-300" />
                          )}
                        </button>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="relative flex items-center space-x-4 whitespace-nowrap p-4">
                      <Image alt="" height={24} src={avatar} width={24} className="rounded-full" />
                      <span
                        className={twMerge(
                          "text-base text-gray-700 after:absolute after:inset-0 dark:text-gray-400",
                          !read && "font-semibold text-gray-900 dark:text-white",
                        )}
                      >
                        {sender}
                      </span>
                    </Table.Cell>
                    <Table.Cell
                      className={twMerge(
                        "max-w-sm overflow-hidden truncate p-4 text-base text-gray-700 dark:text-gray-400 xl:max-w-screen-md 2xl:max-w-screen-lg",
                        !read && "font-semibold text-gray-900 dark:text-white",
                      )}
                    >
                      {subject}
                    </Table.Cell>
                    <Table.Cell
                      className={twMerge(
                        "whitespace-nowrap p-4 text-base text-gray-700 dark:text-gray-400",
                        !read && "font-medium text-gray-900 dark:text-white",
                      )}
                    >
                      {time}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: FC = () => (
  <div className="w-full items-center space-y-4 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:sticky sm:flex sm:justify-between sm:space-y-0">
    <div className="flex flex-col gap-1">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">3.24 GB of 15 GB used</div>
      <Progress color="blue" progress={22} className="w-full sm:w-52 md:w-96" />
    </div>
    <div className="hidden items-center gap-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 sm:flex">
      Last account activity: 2 hours ago
      <HiEye className="h-4 w-4" />
    </div>
    <div className="mb-4 flex items-center sm:mb-0 sm:hidden">
      <Link href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
        <span className="sr-only">Apps</span>
        <HiViewGrid className="text-2xl" />
      </Link>
      <Link href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
        <span className="sr-only">Previous</span>
        <HiChevronLeft className="text-2xl" />
      </Link>
      <Link href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
        <span className="sr-only">Next</span>
        <HiChevronRight className="text-2xl" />
      </Link>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">1-25</span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">2290</span>
      </span>
    </div>
  </div>
);

export default MailingInboxPageContent;
