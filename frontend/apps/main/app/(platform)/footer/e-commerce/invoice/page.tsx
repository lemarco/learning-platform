import invoice from "../../../../../data/e-commerce/invoice.json";
import type { ECommerceInvoice } from "../../../../../types/e-commerce/invoice";
import ECommerceInvoicePageContent from "./content";

export interface ECommerceInvoicePageData {
  invoice: ECommerceInvoice;
}

async function getData() {
  return { invoice } as ECommerceInvoicePageData;
}

export default async function UsersListPage() {
  return <ECommerceInvoicePageContent {...(await getData())} />;
}
