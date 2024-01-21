import { Signal, Slot, component$, createContextId, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
// import { MdFacebook } from "react-icons/md";
// import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
// import { SidebarProvider, useSidebarContext } from "../context/SidebarContext";
import classNames from "classnames";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

import { useLocation } from "@builder.io/qwik-city";
import { isBrowser, isSmallScreen } from "~/utils/dom";
import { SidebarContext } from "./context";

export default component$(() => {
  const location = useLocation().url.pathname;
  const isOpen = useSignal(isBrowser() ? window.localStorage.getItem("isSidebarOpen") === "true" : false);
  useVisibleTask$(() => {
    window.localStorage.setItem("isSidebarOpen", isOpen.toString());
    if (isSmallScreen()) {
      isOpen.value = false;
    }
    function handleMobileTapInsideMain(event: MouseEvent) {
      const main = document.querySelector("main");
      const isClickInsideMain = main?.contains(event.target as Node);

      if (isSmallScreen() && isClickInsideMain) {
        isOpen.value = false;
      }
    }

    document.addEventListener("mousedown", handleMobileTapInsideMain);
  });
  const ctx = {
    isOpenOnSmallScreens: isOpen,
    isPageWithSidebar: true,
  };
  useContextProvider(SidebarContext, ctx);

  return (
    <>
      <Navbar />
      <div class="flex items-start pt-16">
        <Sidebar />
        <main
          class={classNames("overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900", isOpen.value ? "lg:ml-16" : "lg:ml-64")}
        >
          <Slot />
        </main>
      </div>
    </>
  );
});
