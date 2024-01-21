import type { FC, PropsWithChildren } from "react";
import DashboardFooter from "./footer";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <main>{children}</main>
    <DashboardFooter />
  </>
);

export default DashboardLayout;
