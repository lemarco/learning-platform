import products from "../../../../data/e-commerce/product.json";
import type { ECommerceProduct } from "../../../../types/e-commerce/product";
import ECommerceProductsPageContent from "./content";

export interface ECommerceProductsPageData {
  products: ECommerceProduct[];
}

async function getData() {
  return { products } as ECommerceProductsPageData;
}

export default async function UsersListPage() {
  return <ECommerceProductsPageContent {...(await getData())} />;
}
