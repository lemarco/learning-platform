import { Signal, createContextId } from "@builder.io/qwik";

export interface SidebarContextProps {
  isOpenOnSmallScreens: Signal<boolean>;
  isPageWithSidebar: boolean;
}

export const SidebarContext = createContextId<SidebarContextProps>("SidebarContext");
