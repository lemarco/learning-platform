import { FooterMain } from "../../../../widgets/footer-main";
import { NavbarMain } from "../../../../widgets/navbar-main";
import { Benefits, FAQ, PricingPlan } from "./sections";

export default function PricingPage() {
  return (
    <>
      <NavbarMain />
      <div className="container mx-auto px-4 pt-32 dark:bg-gray-900 lg:px-0">
        <PricingPlan />
        <Benefits />
        <FAQ />
      </div>
      <FooterMain />
    </>
  );
}
