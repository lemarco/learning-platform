export interface Dashboard {
  salesThisWeek: DashboardSalesThisWeek;
  newProductsThisWeek: DashboardNewProductsThisWeek;
  visitorsThisWeek: DashboardVisitorsThisWeek;
  userSignupsThisWeek: DashboardUserSignupsThisWeek;
  sessionsByCountryMap: DashboardSessionsByCountryMap;
  latestCustomers: DashboardLatestCustomer[];
  acquisitionOverview: DashboardAcquisitionOverview;
  transactions: Transaction[];
}

export interface DashboardSalesThisWeek {
  sales: number;
  percentage: number;
  categories: string[];
  series: DashboardSalesThisWeekSeries[];
}

export interface DashboardSalesThisWeekSeries {
  name: string;
  data: number[];
  color: string;
}

export interface DashboardNewProductsThisWeek {
  products: number;
  percentage: number;
  series: DashboardNewProductsThisWeekSeries[];
}

export interface DashboardNewProductsThisWeekSeries {
  name: string;
  color: string;
  data: {
    x: string;
    y: number;
  }[];
}

export interface DashboardVisitorsThisWeek {
  visitors: number;
  percentage: number;
  labels: string[];
  series: DashboardVisitorsThisWeekSeries[];
}

export interface DashboardVisitorsThisWeekSeries {
  name: string;
  data: number[];
}

export interface DashboardUserSignupsThisWeek {
  signups: number;
  percentage: number;
  labels: string[];
  series: DashboardUserSignupsThisWeekSeries[];
}

export interface DashboardUserSignupsThisWeekSeries {
  name: string;
  data: number[];
}

export interface DashboardSessionsByCountryMap {
  [country: string]: {
    visitors: number;
    change: number;
  };
}

export interface DashboardLatestCustomer {
  name: string;
  avatar: string;
  email: string;
  spent: number;
}

export interface DashboardAcquisitionOverview {
  labels: string[];
  series: number[];
  topChannels: DashboardAcquisitionOverviewTopChannel[];
}

export interface DashboardAcquisitionOverviewTopChannel {
  channel: string;
  users: number;
  acquisition: number;
}

export interface Transaction {
  transaction: string;
  date: string;
  amount: number;
  status: string;
}
