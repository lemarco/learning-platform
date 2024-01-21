import { FooterMain } from "@/components/footer-main";
import { NavbarMain } from "@/components/navbar-main";
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
