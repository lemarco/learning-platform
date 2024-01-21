export interface ECommerceBillingNextPayment {
  service: string;
  logo: string;
  serviceDescription: string;
  amount: number;
  interval: string;
  date: string;
}

export interface ECommerceBillingTransaction {
  transaction: string;
  time: string;
  amount: number;
  status: string;
}
