import dashboard from "../../../data/dashboard.json";
import type { Dashboard } from "../../../types/dashboard";
import DashboardPageContent from "./content";

export interface DashboardPageData {
  dashboard: Dashboard;
}

async function getData() {
  return { dashboard } as DashboardPageData;
}

export default async function UsersListPage() {
  return <DashboardPageContent {...(await getData())} />;
}
