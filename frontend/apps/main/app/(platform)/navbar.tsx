"use client";

import { Avatar, DarkThemeToggle, Dropdown, Label, Navbar, TextInput, Tooltip, useThemeMode } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import {
  HiArchive,
  HiBell,
  HiCog,
  HiCurrencyDollar,
  HiEye,
  HiInbox,
  HiLogout,
  HiMenuAlt1,
  HiOutlineTicket,
  HiSearch,
  HiShoppingBag,
  HiUserCircle,
  HiUsers,
  HiViewGrid,
  HiX,
} from "react-icons/hi";
import { useSidebarContext } from "../../context/SidebarContext";
import { isSmallScreen } from "../../helpers/is-small-screen";

export function DashboardNavbar() {
  const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } = useSidebarContext();
  const { computedMode } = useThemeMode();

  return (
    <Navbar fluid className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0">
      <div className="w-full p-3 pr-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Toggle sidebar</span>
              {isSidebarCollapsed || !isSmallScreen() ? <HiMenuAlt1 className="h-6 w-6" /> : <HiX className="h-6 w-6" />}
            </button>
            <Navbar.Brand href="/" className="mr-14">
              <Image className="mr-3 h-8" alt="" src="/images/logo.svg" width={32} height={32} />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Flowbite</span>
            </Navbar.Brand>
            <form className="hidden lg:block lg:pl-2">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput className="w-full lg:w-96" icon={HiSearch} id="search" name="search" placeholder="Search" required type="search" />
            </form>
          </div>
          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden">
                <span className="sr-only">Search</span>
                <HiSearch className="h-6 w-6" />
              </button>
              <NotificationBellDropdown />
              <AppDrawerDropdown />
              <Tooltip content={computedMode === "light" ? "Toggle dark mode" : "Toggle light mode"}>
                <DarkThemeToggle />
              </Tooltip>
            </div>
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

function NotificationBellDropdown() {
  return (
    <Dropdown
      className="rounded"
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Notifications</span>
          <HiBell className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
        </span>
      }
      theme={{ content: "py-0" }}
    >
      <div className="max-w-[24rem]">
        <div className="block rounded-t-xl bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div>
          <Link href="#" className="flex border-y px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
            <div className="shrink-0">
              <Image alt="" height={44} src="/images/users/bonnie-green.png" width={44} className="rounded-full" />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary-700 dark:border-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                New message from&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: &quot;Hey, what&apos;s up? All set for
                the presentation?&quot;
              </div>
              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
            </div>
          </Link>
          <Link href="#" className="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
            <div className="shrink-0">
              <Image alt="" height={44} src="/images/users/jese-leos.png" width={44} className="rounded-full" />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>
                &nbsp;and&nbsp;
                <span className="font-medium text-gray-900 dark:text-white">5 others</span>
                &nbsp;started following you.
              </div>
              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">10 minutes ago</div>
            </div>
          </Link>
          <Link href="#" className="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
            <div className="shrink-0">
              <Image alt="" height={44} src="/images/users/joseph-mcfall.png" width={44} className="rounded-full" />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span>
                &nbsp;and&nbsp;
                <span className="font-medium text-gray-900 dark:text-white">141 others</span>
                &nbsp;love your story. See it and view more stories.
              </div>
              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">44 minutes ago</div>
            </div>
          </Link>
          <Link href="#" className="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
            <div className="shrink-0">
              <Image alt="" height={44} src="/images/users/leslie-livingston.png" width={44} className="rounded-full" />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span>
                &nbsp;mentioned you in a comment:&nbsp;
                <span className="font-medium text-primary-700 dark:text-primary-500">@bonnie.green</span>
                &nbsp;what do you say?
              </div>
              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">1 hour ago</div>
            </div>
          </Link>
          <Link href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="shrink-0">
              <Image alt="" height={44} src="/images/users/robert-brown.png" width={44} className="rounded-full" />
              <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-700">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span>
                &nbsp;posted a new video: Glassmorphism - learn how to implement the new design trend.
              </div>
              <div className="text-xs font-medium text-primary-700 dark:text-primary-400">3 hours ago</div>
            </div>
          </Link>
        </div>
        <Link
          href="#"
          className="block rounded-b-xl border-t border-gray-200 bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div className="inline-flex items-center gap-x-2">
            <HiEye className="h-5 w-5" />
            <span>View all</span>
          </div>
        </Link>
      </div>
    </Dropdown>
  );
}

function AppDrawerDropdown() {
  return (
    <Dropdown
      className="rounded"
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </span>
      }
    >
      <div className="block rounded-t-lg border-b bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiShoppingBag className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Sales</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiUsers className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Users</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiInbox className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Inbox</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiUserCircle className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Profile</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiCog className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiArchive className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Products</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiCurrencyDollar className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Pricing</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiOutlineTicket className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Billing</div>
        </Link>
        <Link href="#" className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <HiLogout className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-gray-400" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">Logout</div>
        </Link>
      </div>
    </Dropdown>
  );
}

function UserDropdown() {
  return (
    <Dropdown
      className="rounded"
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar alt="" img="/images/users/neil-sims.png" rounded size="sm" />
        </span>
      }
    >
      <Dropdown.Header className="px-4 py-3">
        <span className="block text-sm">Neil Sims</span>
        <span className="block truncate text-sm font-medium">neil.sims@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
