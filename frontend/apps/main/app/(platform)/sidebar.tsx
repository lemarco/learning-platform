"use client";

import { useSidebarContext } from "../../context/SidebarContext";
import { Dropdown, Sidebar, TextInput, Tooltip } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiChartPie,
  HiClipboardList,
  HiCog,
  HiCollection,
  HiDocumentReport,
  HiInboxIn,
  HiLockClosed,
  HiSearch,
  HiShoppingBag,
  HiSupport,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export function DashboardSidebar() {
  const { isCollapsed, setCollapsed } = useSidebarContext();
  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);
  const [isPreview, setIsPreview] = useState(isCollapsed);

  // Visually highlight page category, if current page is one of its children
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [setCurrentPage, setEcommerceOpen, setUsersOpen]);

  useEffect(() => {
    if (isCollapsed) setIsPreview(false);
  }, [isCollapsed]);

  const preview = {
    enable() {
      if (!isCollapsed) return;

      setIsPreview(true);
      setCollapsed(false);
    },
    disable() {
      if (!isPreview) return;

      setCollapsed(true);
    },
  };

  return (
    <Sidebar
      onMouseEnter={preview.enable}
      onMouseLeave={preview.disable}
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={isCollapsed}
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 flex h-full shrink-0 flex-col border-r border-gray-200 pt-16 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden w-16",
      )}
      id="sidebar"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="py-2">
          <form className="pb-3 md:hidden">
            <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup className="mt-0 border-t-0 pb-1 pt-0">
              <Sidebar.Item href="/" icon={HiChartPie} className={"/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/kanban" icon={HiViewGrid} className={"/kanban" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Kanban
              </Sidebar.Item>
              <Sidebar.Item
                href="/mailing/inbox"
                icon={HiInboxIn}
                label="3"
                className={"/mailing/inbox" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
              >
                Inbox
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce" open={isEcommerceOpen}>
                <Sidebar.Item
                  href="/e-commerce/products"
                  className={"/e-commerce/products" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  Products
                </Sidebar.Item>
                <Sidebar.Item
                  href="/e-commerce/billing"
                  className={"/e-commerce/billing" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  Billing
                </Sidebar.Item>
                <Sidebar.Item
                  href="/e-commerce/invoice"
                  className={"/e-commerce/invoice" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  Invoice
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiUsers} label="Users" open={isUsersOpen}>
                <Sidebar.Item href="/users/list" className={"/users/list" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Users list
                </Sidebar.Item>
                <Sidebar.Item href="/users/profile" className={"/users/profile" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Profile
                </Sidebar.Item>
                <Sidebar.Item href="/users/feed" className={"/users/feed" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Feed
                </Sidebar.Item>
                <Sidebar.Item href="/users/settings" className={"/users/settings" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Settings
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiDocumentReport} label="Pages">
                <Sidebar.Item href="/pages/pricing">Pricing</Sidebar.Item>
                <Sidebar.Item href="/pages/maintenance">Maintenace</Sidebar.Item>
                <Sidebar.Item href="/pages/404">404 not found</Sidebar.Item>
                <Sidebar.Item href="/pages/500">500 server error</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiLockClosed} label="Authentication">
                <Sidebar.Item href="/authentication/sign-in">Sign in</Sidebar.Item>
                <Sidebar.Item href="/authentication/sign-up">Sign up</Sidebar.Item>
                <Sidebar.Item href="/authentication/forgot-password">Forgot password</Sidebar.Item>
                <Sidebar.Item href="/authentication/reset-password">Reset password</Sidebar.Item>
                <Sidebar.Item href="/authentication/profile-lock">Profile lock</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup className="mt-2 pt-2">
              <Sidebar.Item href="https://github.com/themesberg/flowbite-react/" icon={HiClipboardList}>
                Docs
              </Sidebar.Item>
              <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                Components
              </Sidebar.Item>
              <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiSupport}>
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
        <BottomMenu isCollapsed={isCollapsed} />
      </div>
    </Sidebar>
  );
}

function BottomMenu({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={twMerge("flex items-center justify-center gap-4", isCollapsed && "flex-col")}>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Tweaks</span>
        <HiAdjustments className="h-6 w-6" />
      </button>
      <Tooltip content="Settings page">
        <Link
          href="/users/settings"
          className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Settings page</span>
          <HiCog className="h-6 w-6" />
        </Link>
      </Tooltip>
      <div>
        <LanguageDropdown />
      </div>
    </div>
  );
}

function LanguageDropdown() {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Current language</span>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
            className="h-5 w-5 rounded-full"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300" />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z" />
                      <use xlinkHref="#a" y="420" />
                      <use xlinkHref="#a" y="840" />
                      <use xlinkHref="#a" y="1260" />
                    </g>
                    <use xlinkHref="#a" y="1680" />
                  </g>
                  <use xlinkHref="#b" x="247" y="210" />
                </g>
                <use xlinkHref="#c" x="494" />
              </g>
              <use xlinkHref="#d" x="988" />
              <use xlinkHref="#c" x="1976" />
              <use xlinkHref="#e" x="2470" />
            </g>
          </svg>
        </span>
      }
    >
      {/* biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
      <ul className="py-1" role="none">
        <li>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg className="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512">
                <g fillRule="evenodd">
                  <g strokeWidth="1pt">
                    <path
                      fill="#bd3d44"
                      d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                      transform="scale(3.9385)"
                    />
                    <path
                      fill="#fff"
                      d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                      transform="scale(3.9385)"
                    />
                  </g>
                  <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                  <path
                    fill="#fff"
                    d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                    transform="scale(3.9385)"
                  />
                </g>
              </svg>
              <span className="whitespace-nowrap">English (US)</span>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg className="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512">
                <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                <path d="M0 0h512v170.7H0z" />
                <path fill="#d00" d="M0 170.7h512v170.6H0z" />
              </svg>
              Deutsch
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg className="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512">
                <g fillRule="evenodd" strokeWidth="1pt">
                  <path fill="#fff" d="M0 0h512v512H0z" />
                  <path fill="#009246" d="M0 0h170.7v512H0z" />
                  <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                </g>
              </svg>
              Italiano
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="mr-2 h-4 w-4 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                id="flag-icon-css-cn"
                viewBox="0 0 512 512"
              >
                <defs>
                  <path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" />
                </defs>
                <path fill="#de2910" d="M0 0h512v512H0z" />
                <use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" xlinkHref="#a" />
                <use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkHref="#a" />
                <use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlinkHref="#a" />
                <use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkHref="#a" />
                <use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkHref="#a" />
              </svg>
              <span className="whitespace-nowrap">中文 (繁體)</span>
            </div>
          </Link>
        </li>
      </ul>
    </Dropdown>
  );
}
