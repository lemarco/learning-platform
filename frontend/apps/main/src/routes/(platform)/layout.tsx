import { Slot, component$ } from "@builder.io/qwik";

// import Navbar from "../components/navbar";
// import Sidebar from "../components/sidebar";
// import { MdFacebook } from "react-icons/md";
// import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
// import { SidebarProvider, useSidebarContext } from "../context/SidebarContext";
import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex items-start pt-16">
        <Sidebar />
        <main
          class={classNames("overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900", isSidebarOpen ? "lg:ml-16" : "lg:ml-64")}
        >
          <Slot />
        </main>
      </div>
    </>
  );
});
