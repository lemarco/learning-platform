

import {Slot,createContextId,useContextProvider,useVisibleTask$,useSignal,component$,Signal} from '@builder.io/qwik'

import { DashboardNavbar } from "./navbar";
import { DashboardSidebar } from "./sidebar";
// import { isBrowser } from "../helpers/is-browser";
// import { isSmallScreen } from "../helpers/is-small-screen";


interface SidebarContextProps {
  isCollapsed:Signal< boolean>

}

const SidebarContext = createContextId<SidebarContextProps >('SidebarContextId');

// export function SidebarProvider() {
//   const location = isBrowser() ? window.location.pathname : "/";
//   const storedIsCollapsed = isBrowser() ? localStorage.getItem("isSidebarCollapsed") === "true" : false;

//   const isCollapsed = useSignal(storedIsCollapsed);

//   // Close Sidebar on page change on mobile
//   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//   useVisibleTask$(() => {
//     if (isSmallScreen()) {
//         isCollapsed.value =true
//     }
//   });

//   // Close Sidebar on mobile tap inside main content
//   useEffect(() => {
//     function handleMobileTapInsideMain(event: MouseEvent) {
//       const main = document.querySelector("#main-content");
//       const isClickInsideMain = main?.contains(event.target as Node);

//       if (isSmallScreen() && isClickInsideMain) {
//         setCollapsed(true);
//       }
//     }

//     document.addEventListener("mousedown", handleMobileTapInsideMain);

//     return () => {
//       document.removeEventListener("mousedown", handleMobileTapInsideMain);
//     };
//   }, []);

//   // Update local storage when collapsed state changed
//   useEffect(() => {
//     localStorage.setItem("isSidebarCollapsed", isCollapsed ? "true" : "false");
//   }, [isCollapsed]);
//   useContextProvider(SidebarContext, {isCollapsed,})
//   return (

//      <Slot/>

//   );
// }

// export function useSidebarContext(): SidebarContextProps {
//   const context = useContext(SidebarContext);

//   if (!context) {
//     throw new Error("useSidebarContext should be used within the SidebarContext provider!");
//   }

//   return context;
// }


export default component$(()=> {
    const location = isBrowser() ? window.location.pathname : "/";
    const storedIsCollapsed = isBrowser() ? localStorage.getItem("isSidebarCollapsed") === "true" : false;
    const isCollapsed = useSignal(storedIsCollapsed);
    useContextProvider(SidebarContext, {isCollapsed})
  return   <>
  <DashboardNavbar />
  <div class="mt-16 flex items-start">
    <DashboardSidebar />
    <div
      id="main-content"
      class={twMerge("relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900", isCollapsed ? "lg:ml-16" : "lg:ml-64")}
    >
<Slot />
    </div>
  </div>
</>
})

