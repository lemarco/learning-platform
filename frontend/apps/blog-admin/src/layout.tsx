import classNames from "classnames";
import { Footer } from "flowbite-react";
import type { FC, PropsWithChildren } from "react";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { SidebarProvider, useSidebarContext } from "./context";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}
import { Flowbite, useThemeMode } from "flowbite-react";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import theme from "./theme";

export const Layout: FC = () => {
  const dark = localStorage.getItem("theme") as "light" | "dark";
  const { mode } = useThemeMode();

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);
  return (
    <Flowbite theme={{ mode: dark, theme }}>
      <SidebarProvider>
        <Navbar />
        <div className="flex items-start pt-16">
          <Sidebar />
          <Content isFooter={true}>
            <Outlet />
          </Content>
        </div>
      </SidebarProvider>
    </Flowbite>
  );
};

const Content: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = ({ isFooter = true }) => {
  const { isOpenOnSmallScreens: isSidebarOpen } = useSidebarContext();
  return (
    <main
      className={classNames("overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900", isSidebarOpen ? "lg:ml-16" : "lg:ml-64")}
    >
      <Outlet />
      {isFooter && (
        <div className="mx-4 mt-4">
          <Footer container>
            <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0" />
          </Footer>
          <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">&copy; 2024 All rights reserved.</p>
        </div>
      )}
    </main>
  );
};
