import classNames from "classnames";
import { Dropdown, Sidebar as SidebarComponent, TextInput, Tooltip } from "components";

import {
  HiAdjustments,
  HiChartPie,
  HiChartSquareBar,
  HiClipboard,
  HiCog,
  HiCollection,
  HiInboxIn,
  HiInformationCircle,
  HiLockClosed,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";

import { component$, useContext } from "@builder.io/qwik";
import { isSmallScreen } from "~/utils/dom";
import { SidebarContext } from "./context";

export const Sidebar = component$(() => {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } = useContext(SidebarContext);

  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [setCurrentPage, setEcommerceOpen, setUsersOpen]);

  return (
    <div
      class={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <SidebarComponent aria-label="Sidebar with multi-level dropdown example" collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}>
        <div class="flex h-full flex-col justify-between py-2">
          <div>
            <form class="pb-3 md:hidden">
              <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
            </form>
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem href="/" icon={HiChartPie} class={"/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Dashboard
                </SidebarItem>
                <SidebarItem href="/kanban" icon={HiViewGrid} class={"/kanban" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Kanban
                </SidebarItem>
                <SidebarItem
                  href="/mailing/inbox"
                  icon={HiInboxIn}
                  label="3"
                  class={"/mailing/inbox" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  Inbox
                </SidebarItem>
                <SidebarCollapse icon={HiShoppingBag} label="E-commerce" open={isEcommerceOpen}>
                  <SidebarItem
                    href="/e-commerce/products"
                    class={"/e-commerce/products" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                  >
                    Products
                  </SidebarItem>
                  <SidebarItem
                    href="/e-commerce/billing"
                    class={"/e-commerce/billing" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                  >
                    Billing
                  </SidebarItem>
                  <SidebarItem
                    href="/e-commerce/invoice"
                    class={"/e-commerce/invoice" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}
                  >
                    Invoice
                  </SidebarItem>
                </SidebarCollapse>
                <SidebarCollapse icon={HiUsers} label="Users" open={isUsersOpen}>
                  <SidebarItem href="/users/list" class={"/users/list" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Users list
                  </SidebarItem>
                  <SidebarItem href="/users/profile" class={"/users/profile" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Profile
                  </SidebarItem>
                  <SidebarItem href="/users/feed" class={"/users/feed" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Feed
                  </SidebarItem>
                  <SidebarItem href="/users/settings" class={"/users/settings" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Settings
                  </SidebarItem>
                </SidebarCollapse>
                <SidebarCollapse icon={HiChartSquareBar} label="Pages">
                  <SidebarItem href="/pages/pricing">Pricing</SidebarItem>
                  <SidebarItem href="/pages/maintenance">Maintenace</SidebarItem>
                  <SidebarItem href="/pages/404">404 not found</SidebarItem>
                  <SidebarItem href="/pages/500">500 server error</SidebarItem>
                </SidebarCollapse>
                <SidebarCollapse icon={HiLockClosed} label="Authentication">
                  <SidebarItem href="/authentication/sign-in">Sign in</SidebarItem>
                  <SidebarItem href="/authentication/sign-up">Sign up</SidebarItem>
                  <SidebarItem href="/authentication/forgot-password">Forgot password</SidebarItem>
                  <SidebarItem href="/authentication/reset-password">Reset password</SidebarItem>
                  <SidebarItem href="/authentication/profile-lock">Profile lock</SidebarItem>
                </SidebarCollapse>
              </SidebarItemGroup>
              <SidebarItemGroup>
                <SidebarItem href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                  Docs
                </SidebarItem>
                <SidebarItem href="https://flowbite-react.com/" icon={HiCollection}>
                  Components
                </SidebarItem>
                <SidebarItem href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                  Help
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </div>
          <BottomMenu />
        </div>
      </SidebarComponent>
    </div>
  );
});

const BottomMenu = component$(() => (
  <div class="flex items-center justify-center gap-x-5">
    <button class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
      <span class="sr-only">Tweaks</span>
      <HiAdjustments class="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
    </button>
    <div>
      <Tooltip content="Settings page">
        <a
          href="/users/settings"
          class="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Settings page</span>
          <HiCog class="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </a>
      </Tooltip>
    </div>
    <div>
      <LanguageDropdown />
    </div>
  </div>
));

const LanguageDropdown = component$(() => (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <span class="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Current language</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 3900 3900"
          class="h-5 w-5 rounded-full"
        >
          <path fill="#b22234" d="M0 0h7410v3900H0z"></path>
          <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"></path>
          <path fill="#3c3b6e" d="M0 0h2964v2100H0z"></path>
          <g fill="#fff">
            <g id="d">
              <g id="c">
                <g id="e">
                  <g id="b">
                    <path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"></path>
                    <use xlinkHref="#a" y="420"></use>
                    <use xlinkHref="#a" y="840"></use>
                    <use xlinkHref="#a" y="1260"></use>
                  </g>
                  <use xlinkHref="#a" y="1680"></use>
                </g>
                <use xlinkHref="#b" x="247" y="210"></use>
              </g>
              <use xlinkHref="#c" x="494"></use>
            </g>
            <use xlinkHref="#d" x="988"></use>
            <use xlinkHref="#c" x="1976"></use>
            <use xlinkHref="#e" x="2470"></use>
          </g>
        </svg>
      </span>
    }
  >
    <ul class="py-1" role="none">
      <li>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <div class="inline-flex items-center">
            <svg class="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512">
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
            <span class="whitespace-nowrap">English (US)</span>
          </div>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <div class="inline-flex items-center">
            <svg class="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512">
              <path fill="#ffce00" d="M0 341.3h512V512H0z" />
              <path d="M0 0h512v170.7H0z" />
              <path fill="#d00" d="M0 170.7h512v170.6H0z" />
            </svg>
            Deutsch
          </div>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <div class="inline-flex items-center">
            <svg class="mr-2 h-4 w-4 rounded-full" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512">
              <g fillRule="evenodd" strokeWidth="1pt">
                <path fill="#fff" d="M0 0h512v512H0z" />
                <path fill="#009246" d="M0 0h170.7v512H0z" />
                <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
              </g>
            </svg>
            Italiano
          </div>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <div class="inline-flex items-center">
            <svg
              class="mr-2 h-4 w-4 rounded-full"
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
            <span class="whitespace-nowrap">中文 (繁體)</span>
          </div>
        </a>
      </li>
    </ul>
  </Dropdown>
));
