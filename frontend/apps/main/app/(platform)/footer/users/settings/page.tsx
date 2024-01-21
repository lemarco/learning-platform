import languages from "../../../../../data/languages.json";
import timezones from "../../../../../data/timezones.json";
import userProfile from "../../../../../data/user/profile.json";
import userSettings from "../../../../../data/user/settings.json";
import type { UserProfile } from "../../../../../types/user/profile";
import type { UserSettings } from "../../../../../types/user/settings";
import UserSettingsPageContent from "./content";

export interface UserSettingsPageData {
  languages: string[];
  timezones: string[];
  userProfile: UserProfile;
  userSettings: UserSettings;
}

async function getData() {
  return {
    languages,
    timezones,
    userProfile,
    userSettings,
  } as UserSettingsPageData;
}

export default async function UsersListPage() {
  return <UserSettingsPageContent {...(await getData())} />;
}
