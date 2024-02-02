import { Footer } from "./footer";
import { Header } from "./header";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  const link = "";
  return (
    <>
      <Header link={link} />
      {children}
      <Footer />
    </>
  );
};
