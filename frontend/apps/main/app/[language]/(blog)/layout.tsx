import type { ReactNode } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

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
