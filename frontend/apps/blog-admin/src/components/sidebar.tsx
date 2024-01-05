/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Dropdown, Sidebar, TextInput, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { HiChartPie, HiSearch, HiUsers, HiViewGrid } from "react-icons/hi";

import { useSidebarContext } from "../context";
import isSmallScreen from "../helpers/is-small-screen";

const ExampleSidebar: FC = () => {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } = useSidebarContext();
  console.log("isSidebarOpenOnSmallScreens = ", isSidebarOpenOnSmallScreens);
  const [currentPage, setCurrentPage] = useState("");
  const [isBlogOpen, setBlogOpen] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setBlogOpen(newPage.includes("/blog"));
    setUsersOpen(newPage.includes("/users"));
  }, [setCurrentPage, setBlogOpen, setUsersOpen]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar aria-label="Sidebar with multi-level dropdown example" collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}>
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/" icon={HiChartPie} className={"/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Dashboard
                </Sidebar.Item>

                <Sidebar.Collapse icon={HiViewGrid} label="Blog" open={isBlogOpen}>
                  <Sidebar.Item href="/blog" className={"/blog" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Articles list
                  </Sidebar.Item>
                  <Sidebar.Item href="/blog/new" className={"/e-commerce/billing" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Create Article
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse icon={HiUsers} label="Users" open={isUsersOpen}>
                  <Sidebar.Item href="/users" className={"/users" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Users list
                  </Sidebar.Item>

                  <Sidebar.Item href="/users/settings" className={"/users/settings" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""}>
                    Settings
                  </Sidebar.Item>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default ExampleSidebar;
