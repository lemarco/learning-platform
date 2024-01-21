import userFeed from "../../../../data/user/feed.json";
import userProfile from "../../../../data/user/profile.json";
import type { UserFeedEntry } from "../../../../types/user/feed";
import type { UserProfile } from "../../../../types/user/profile";
import UserFeedPageContent from "./content";

export interface UserFeedPageData {
  userFeed: UserFeedEntry[];
  userProfile: UserProfile;
}

async function getData() {
  return { userFeed, userProfile } as UserFeedPageData;
}

export default async function UsersListPage() {
  return <UserFeedPageContent {...(await getData())} />;
}
