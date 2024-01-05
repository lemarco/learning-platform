import { Avatar, Dropdown, Label, Navbar, TextInput } from "flowbite-react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import { HiMenuAlt1, HiSearch, HiX } from "react-icons/hi";
import { useSidebarContext } from "../context";
import isSmallScreen from "../helpers/is-small-screen";
import { NotificationBellDropdown } from "./notification-dropdown";

const ExampleNavbar: FC = () => {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } = useSidebarContext();

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPageWithSidebar && (
              // biome-ignore lint/a11y/useButtonType: <explanation>
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? <HiX className="h-6 w-6" /> : <HiMenuAlt1 className="h-6 w-6" />}
              </button>
            )}
            <Navbar.Brand href="/">
              <img alt="" src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Flowbite</span>
            </Navbar.Brand>
            <form className="ml-16 hidden md:block">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput icon={HiSearch} id="search" name="search" placeholder="Search" required size={32} type="search" />
            </form>
          </div>
          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <span className="sr-only">Search</span>
                <HiSearch className="h-6 w-6" />
              </button>
              <NotificationBellDropdown />
            </div>
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const UserDropdown: FC = () => (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <span>
        <span className="sr-only">User menu</span>
        <Avatar alt="" img="../images/users/neil-sims.png" rounded size="sm" />
      </span>
    }
  >
    <Dropdown.Header>
      <span className="block text-sm">Neil Sims</span>
      <span className="block truncate text-sm font-medium">neil.sims@flowbite.com</span>
    </Dropdown.Header>

    <Dropdown.Divider />
    <Dropdown.Item>Sign out</Dropdown.Item>
  </Dropdown>
);

export default ExampleNavbar;
