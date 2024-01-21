export interface ECommerceInvoice {
  id: number;
  issuer: ECommerceInvoiceIssuer;
  date: string;
  billTo: ECommerceInvoiceBillTo;
  services: ECommerceInvoiceService[];
  subtotal: number;
  taxRate: number;
  discount: number;
  total: number;
}

export interface ECommerceInvoiceIssuer {
  name: string;
  logo: string;
  address: string;
}

export interface ECommerceInvoiceBillTo {
  name: string;
  address: string;
  taxId: string;
}

export interface ECommerceInvoiceService {
  item: string;
  category: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}
