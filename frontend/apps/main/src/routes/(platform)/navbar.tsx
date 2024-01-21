import { Avatar, DarkThemeToggle, Dropdown, Label, Navbar, TextInput } from "flowbite-react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
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
import { useSidebarContext } from "../context/SidebarContext";

const ExampleNavbar: FC = () => {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } = useSidebarContext();

  return (
    <Navbar fluid>
      <div class="w-full p-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                class="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span class="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? <HiX class="h-6 w-6" /> : <HiMenuAlt1 class="h-6 w-6" />}
              </button>
            )}
            <Navbar.Brand href="/">
              <img alt="" src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-8" />
              <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Flowbite</span>
            </Navbar.Brand>
            <form class="ml-16 hidden md:block">
              <Label htmlFor="search" class="sr-only">
                Search
              </Label>
              <TextInput icon={HiSearch} id="search" name="search" placeholder="Search" required size={32} type="search" />
            </form>
          </div>
          <div class="flex items-center lg:gap-3">
            <div class="flex items-center">
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                class="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <span class="sr-only">Search</span>
                <HiSearch class="h-6 w-6" />
              </button>
              <NotificationBellDropdown />
              <AppDrawerDropdown />
              <DarkThemeToggle />
            </div>
            <div class="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const NotificationBellDropdown: FC = () => (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <span class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span class="sr-only">Notifications</span>
        <HiBell class="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
      </span>
    }
  >
    <div class="max-w-[24rem]">
      <div class="block rounded-t-xl bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        Notifications
      </div>
      <div>
        <a href="#" class="flex border-y py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
          <div class="shrink-0">
            <img alt="" src="../images/users/bonnie-green.png" class="h-11 w-11 rounded-full" />
            <div class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary-700 dark:border-gray-700">
              <NewMessageIcon />
            </div>
          </div>
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              New message from&nbsp;
              <span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"
            </div>
            <div class="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
          </div>
        </a>
        <a href="#" class="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
          <div class="shrink-0">
            <img alt="" src="../images/users/jese-leos.png" class="h-11 w-11 rounded-full" />
            <div class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-700">
              <NewFollowIcon />
            </div>
          </div>
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>
              &nbsp;and&nbsp;
              <span class="font-medium text-gray-900 dark:text-white">5 others</span>
              &nbsp;started following you.
            </div>
            <div class="text-xs font-medium text-primary-700 dark:text-primary-400">10 minutes ago</div>
          </div>
        </a>
        <a href="#" class="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
          <div class="shrink-0">
            <img alt="" src="../images/users/joseph-mcfall.png" class="h-11 w-11 rounded-full" />
            <div class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-700">
              <NewLoveIcon />
            </div>
          </div>
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span>
              &nbsp;and&nbsp;
              <span class="font-medium text-gray-900 dark:text-white">141 others</span>
              &nbsp;love your story. See it and view more stories.
            </div>
            <div class="text-xs font-medium text-primary-700 dark:text-primary-400">44 minutes ago</div>
          </div>
        </a>
        <a href="#" class="flex border-b py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
          <div class="shrink-0">
            <img alt="" src="../images/users/leslie-livingston.png" class="h-11 w-11 rounded-full" />
            <div class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-700">
              <NewMentionIcon />
            </div>
          </div>
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span>
              &nbsp;mentioned you in a comment:&nbsp;
              <span class="font-medium text-primary-700 dark:text-primary-500">@bonnie.green</span>
              &nbsp;what do you say?
            </div>
            <div class="text-xs font-medium text-primary-700 dark:text-primary-400">1 hour ago</div>
          </div>
        </a>
        <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div class="shrink-0">
            <img alt="" src="../images/users/robert-brown.png" class="h-11 w-11 rounded-full" />
            <div class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-700">
              <NewVideoIcon />
            </div>
          </div>
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">Robert Brown</span>
              &nbsp;posted a new video: Glassmorphism - learn how to implement the new design trend.
            </div>
            <div class="text-xs font-medium text-primary-700 dark:text-primary-400">3 hours ago</div>
          </div>
        </a>
      </div>
      <a
        href="#"
        class="block rounded-b-xl bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
      >
        <div class="inline-flex items-center gap-x-2">
          <HiEye class="h-6 w-6" />
          <span>View all</span>
        </div>
      </a>
    </div>
  </Dropdown>
);

const NewMessageIcon: FC = () => (
  <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
  </svg>
);

const NewFollowIcon: FC = () => (
  <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
  </svg>
);

const NewLoveIcon: FC = () => (
  <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const NewMentionIcon: FC = () => (
  <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const NewVideoIcon: FC = () => (
  <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
  </svg>
);

const AppDrawerDropdown: FC = () => (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <span class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span class="sr-only">Apps</span>
        <HiViewGrid class="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
      </span>
    }
  >
    <div class="block rounded-t-lg border-b bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white">
      Apps
    </div>
    <div class="grid grid-cols-3 gap-4 p-4">
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiShoppingBag class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Sales</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiUsers class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Users</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiInbox class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Inbox</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiUserCircle class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Profile</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiCog class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiArchive class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Products</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiCurrencyDollar class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Pricing</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiOutlineTicket class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Billing</div>
      </a>
      <a href="#" class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
        <HiLogout class="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
        <div class="text-sm font-medium text-gray-900 dark:text-white">Logout</div>
      </a>
    </div>
  </Dropdown>
);

const UserDropdown: FC = () => (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <span>
        <span class="sr-only">User menu</span>
        <Avatar alt="" img="../images/users/neil-sims.png" rounded size="sm" />
      </span>
    }
  >
    <Dropdown.Header>
      <span class="block text-sm">Neil Sims</span>
      <span class="block truncate text-sm font-medium">neil.sims@flowbite.com</span>
    </Dropdown.Header>
    <Dropdown.Item>Dashboard</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Earnings</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>Sign out</Dropdown.Item>
  </Dropdown>
);

export default ExampleNavbar;
