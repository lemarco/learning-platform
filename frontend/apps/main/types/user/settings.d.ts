export interface UserSettings {
  language: string;
  timeZone: string;
  socialAccounts: UserSettingsSocialAccount[];
  otherAccounts: UserSettingsOtherAccount[];
  sessions: UserSettingsSession[];
  alertsNotifications: UserSettingsAlerts;
  emailNotifications: UserSettingsEmailNotifications;
}

export interface UserSettingsAlerts {
  companyNews: boolean;
  accountActivity: boolean;
  meetups: boolean;
  newMessages: boolean;
}

export interface UserSettingsEmailNotifications {
  ratingReminders: boolean;
  itemUpdates: boolean;
  itemComments: boolean;
  buyerReviews: boolean;
}

export interface UserSettingsOtherAccount {
  name: string;
  avatar: string;
  lastLocation: string;
  lastSeen: number;
}

export interface UserSettingsSession {
  location: string;
  ipAddress: string;
  userAgent: string;
}

export interface UserSettingsSocialAccount {
  social: string;
  account: string;
  icon: string;
}
