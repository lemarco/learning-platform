import type { ReactNode } from "react";
import { Footer } from "../../widgets/footer";
import { Header } from "../../widgets/header";
// export const useGetGoogleLink = routeLoader$(async () => {
//   return await fetch("http://0.0.0.0:6004/auth/google/link")
//     .then((data) => data.json())
//     .then((data) => data.link || "")
//     .catch(() => "");
// });
export default ({ children }: { children: ReactNode }) => {
  // const googleLink = useGetGoogleLink();
  // const link = String(googleLink.value);
  const link = "";
  return (
    <>
      <Header link={link} />
      {children}
      <Footer />
    </>
  );
};
