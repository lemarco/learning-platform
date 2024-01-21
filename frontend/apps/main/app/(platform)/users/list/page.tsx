import usersList from "../../../../data/user/users.json";
import type { User } from "../../../../types/user/user";
import UsersListPageContent from "./content";

export interface UsersListPageData {
  usersList: User[];
}

async function getData() {
  return { usersList } as UsersListPageData;
}

export default async function UsersListPage() {
  return <UsersListPageContent {...(await getData())} />;
}
