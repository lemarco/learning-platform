import billingData from "../../../../../data/e-commerce/billing.json";
import type { ECommerceBillingNextPayment, ECommerceBillingTransaction } from "../../../../../types/e-commerce/billing";
import ECommerceBillingPageContent from "./content";

export interface ECommerceBillingPageData {
  nextPayment: ECommerceBillingNextPayment;
  orderHistory: ECommerceBillingTransaction[];
}

async function getData() {
  return {
    nextPayment: billingData.nextPayment,
    orderHistory: billingData.orderHistory,
  } as ECommerceBillingPageData;
}

export default async function UsersListPage() {
  return <ECommerceBillingPageContent {...(await getData())} />;
}
