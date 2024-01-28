import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
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
