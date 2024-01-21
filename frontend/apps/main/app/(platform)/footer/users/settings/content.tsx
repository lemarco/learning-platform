"use client";

import { Breadcrumb, Button, Card, Label, Select, TextInput, ToggleSwitch } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { HiCloudUpload, HiHome, HiOutlineDesktopComputer, HiOutlineDeviceMobile } from "react-icons/hi";
import type { UserSettingsPageData } from "./page";

const UserSettingsPageContent: FC<UserSettingsPageData> = ({ languages, timezones, userProfile, userSettings }) => (
  <>
    <div className="grid grid-cols-1 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-3 xl:gap-4">
      <div className="col-span-full mb-4 xl:mb-2">
        <Breadcrumb className="mb-5">
          <Breadcrumb.Item href="#">
            <div className="flex items-center gap-x-3">
              <HiHome className="text-xl" />
              <span className="dark:text-white">Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">User settings</h1>
      </div>
      <div className="col-span-full mb-4 xl:col-auto xl:mb-0">
        <div className="grid grid-cols-1 gap-y-4">
          <UserProfileCard userProfile={userProfile} />
          <LanguageTimeCard languages={languages} timezones={timezones} userSettings={userSettings} />
          <SocialAccountsCard userSettings={userSettings} />
          <OtherAccountsCard userSettings={userSettings} />
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-cols-1 gap-y-4">
          <GeneralInformationCard userProfile={userProfile} />
          <PasswordInformationCard />
          <SessionsCard userSettings={userSettings} />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-y-6 px-4 pt-4 xl:grid-cols-2 xl:gap-4">
      <AlertsNotificationsCard userSettings={userSettings} />
      <EmailNotificationsCard userSettings={userSettings} />
    </div>
  </>
);

const UserProfileCard: FC<Pick<UserSettingsPageData, "userProfile">> = ({ userProfile }) => (
  <Card>
    <div className="items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4">
      <Image alt="" height={112} src={userProfile.avatar} width={112} className="mb-4 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0" />
      <div>
        <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h3>
        <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{userProfile.position}</div>
        <Link
          href="#"
          className="inline-flex items-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiCloudUpload className="mr-2" />
          Change picture
        </Link>
      </div>
    </div>
  </Card>
);

const LanguageTimeCard: FC<Pick<UserSettingsPageData, "languages" | "timezones" | "userSettings">> = ({
  languages,
  timezones,
  userSettings,
}) => {
  const { language, timeZone } = userSettings;

  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold dark:text-white">Language &amp; Time</h3>
      <div className="mb-4 grid grid-cols-1 gap-y-2">
        <Label htmlFor="settings-language">Select language</Label>
        <Select id="settings-language" name="settings-language">
          {languages.map((eachLanguage) => (
            <option key={eachLanguage} selected={eachLanguage === language}>
              {eachLanguage}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-2">
        <Label htmlFor="settings-timezone">Time Zone</Label>
        <Select id="settings-timezone" name="settings-timezone">
          {timezones.map((eachTimezone) => (
            <option key={eachTimezone} selected={eachTimezone === timeZone}>
              {eachTimezone}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Button color="blue">Save all</Button>
      </div>
    </Card>
  );
};

const SocialAccountsCard: FC<Pick<UserSettingsPageData, "userSettings">> = ({ userSettings }) => {
  const { socialAccounts } = userSettings;
  return (
    <Card>
      <div className="flow-root">
        <h3 className="text-xl font-bold dark:text-white">Social accounts</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {socialAccounts.map(({ social, icon, account }) => (
            <li key={social} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <Image alt="" height={20} src={icon} width={20} className="h-5 w-5 dark:invert" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">{social} account</span>
                  {account === "" ? (
                    <span className="block truncate text-sm font-normal text-gray-500 dark:text-gray-400">Not connected</span>
                  ) : (
                    <Link
                      href={`https://${account}`}
                      className="block truncate text-sm font-normal text-primary-700 hover:underline dark:text-primary-500"
                    >
                      {account}
                    </Link>
                  )}
                </div>
                <div className="inline-flex items-center">
                  <Button size="sm" color={account === "" ? "blue" : "gray"}>
                    {account === "" ? "Connect" : "Disconnect"}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Button color="blue">Save all</Button>
      </div>
    </Card>
  );
};

const OtherAccountsCard: FC<Pick<UserSettingsPageData, "userSettings">> = ({ userSettings }) => {
  const { otherAccounts } = userSettings;

  return (
    <Card>
      <div className="flow-root">
        <h3 className="text-xl font-bold dark:text-white">Other accounts</h3>
        <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
          {otherAccounts.map(({ name, avatar, lastLocation, lastSeen }) => (
            <li key={name} className="py-4 last:pb-0">
              <div className="flex justify-between xl:block 2xl:flex 2xl:space-x-4">
                <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                  <div>
                    <Image alt="" height={24} src={avatar} width={24} className="rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 truncate text-base font-semibold leading-none text-gray-900 dark:text-white">{name}</p>
                    <p className="mb-1 truncate text-sm font-normal text-primary-700 dark:text-primary-500">{lastLocation}</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Last seen:&nbsp;
                      {lastSeen > 59 ? `${lastSeen / 60} hours ago` : lastSeen === 1 ? "1 min ago" : `${lastSeen} mins ago`}
                    </p>
                  </div>
                </div>
                <div className="inline-flex w-auto items-center xl:w-full 2xl:w-auto">
                  <Button size="sm" color="gray" href="#" className="w-full">
                    Disconnect
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Button color="blue">Save all</Button>
      </div>
    </Card>
  );
};

const GeneralInformationCard: FC<Pick<UserSettingsPageData, "userProfile">> = ({ userProfile }) => (
  <Card>
    <h3 className="mb-4 text-xl font-bold dark:text-white">General information</h3>
    <form action="#">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="first-name">First Name</Label>
          <TextInput id="first-name" name="first-name" placeholder={userProfile.name.split(" ")[0]} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="last-name">Last Name</Label>
          <TextInput id="last-name" name="last-name" placeholder={userProfile.name.split(" ")[1]} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="country">Country</Label>
          <TextInput id="country" name="country" placeholder={userProfile.location.split(", ")[2]} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="city">City</Label>
          <TextInput id="city" name="city" placeholder={userProfile.location.split(", ")[0]} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="address">Address</Label>
          <TextInput id="address" name="address" placeholder={userProfile.address.split(", ")[0]} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" placeholder={userProfile.email} required type="email" />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="phone-number">Phone Number</Label>
          <TextInput id="phone-number" name="phone-number" placeholder={userProfile.phone} required type="tel" />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="birthday">Birthday</Label>
          <TextInput defaultValue={userProfile.birthday} id="birthday" name="birthday" required type="date" />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="organization">Organization</Label>
          <TextInput id="organization" name="organization" placeholder={userProfile.organization} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="role">Role</Label>
          <TextInput id="role" name="role" placeholder={userProfile.position} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="department">Department</Label>
          <TextInput id="department" name="department" placeholder={userProfile.department} required />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="zip-code">ZIP/postal code</Label>
          <TextInput id="zip-code" name="zip-code" placeholder={userProfile.address.split(" ").pop()} required />
        </div>
        <div className="col-span-6">
          <Button color="blue">Save all</Button>
        </div>
      </div>
    </form>
  </Card>
);

const PasswordInformationCard: FC = () => (
  <Card>
    <h3 className="mb-4 text-xl font-bold dark:text-white">Password information</h3>
    <form action="#">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="current-password">Current password</Label>
          <TextInput id="current-password" name="current-password" placeholder="••••••••" type="password" />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="new-password">New password</Label>
          <TextInput id="new-password" name="new-password" placeholder="••••••••" type="password" />
        </div>
        <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <TextInput id="confirm-password" name="confirm-password" placeholder="••••••••" type="password" />
        </div>
        <div className="col-span-full">
          <div className="text-sm font-medium dark:text-white">Password requirements:</div>
          <div className="mb-1 text-sm font-normal text-gray-500 dark:text-gray-400">Ensure that these requirements are met:</div>
          <ul className="space-y-1 pl-4 text-gray-500 dark:text-gray-400">
            <li className="text-xs font-normal">At least 10 characters (and up to 100 characters)</li>
            <li className="text-xs font-normal">At least one lowercase character</li>
            <li className="text-xs font-normal">Inclusion of at least one special character, e.g., ! @ # ?</li>
          </ul>
        </div>
        <div className="col-span-6">
          <Button color="blue">Save all</Button>
        </div>
      </div>
    </form>
  </Card>
);

const SessionsCard: FC<Pick<UserSettingsPageData, "userSettings">> = ({ userSettings }) => (
  <Card>
    <div className="flow-root">
      <h3 className="text-xl font-bold dark:text-white">Sessions</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {userSettings.sessions.map(({ location, ipAddress, userAgent }) => (
          <li key={`${location}-${ipAddress}-${userAgent}`} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                {userAgent.includes("iPhone") || userAgent.includes("Android") ? (
                  <HiOutlineDeviceMobile className="text-2xl dark:text-white" />
                ) : (
                  <HiOutlineDesktopComputer className="text-2xl dark:text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                  {location} {ipAddress}
                </p>
                <p className="truncate text-sm font-normal text-gray-500 dark:text-gray-400">{userAgent}</p>
              </div>
              <div className="inline-flex items-center">
                <Button size="sm" color="gray">
                  Revoke
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button color="blue" className="mt-2">
        See more
      </Button>
    </div>
  </Card>
);

const AlertsNotificationsCard: FC<Pick<UserSettingsPageData, "userSettings">> = ({ userSettings }) => {
  const [isCompanyNews, setCompanyNews] = useState(userSettings.alertsNotifications.companyNews);
  const [isAccountActivity, setAccountActivity] = useState(userSettings.alertsNotifications.accountActivity);
  const [isMeetupsNearYou, setMeetupsNearYou] = useState(userSettings.alertsNotifications.meetups);
  const [isNewMessages, setNewMessages] = useState(userSettings.alertsNotifications.newMessages);

  return (
    <Card>
      <div className="flow-root">
        <h3 className="text-xl font-bold dark:text-white">Alerts &amp; Notifications</h3>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up Themesberg to get notifications</p>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Company News</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get Themesberg news, announcements, and product updates
              </div>
            </div>
            <Label htmlFor="company-news" className="sr-only">
              Toggle company news
            </Label>
            <ToggleSwitch
              color="blue"
              checked={isCompanyNews}
              id="company-news"
              label=""
              name="company-news"
              onChange={() => setCompanyNews(!isCompanyNews)}
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Account Activity</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get important notifications about you or activity you've missed
              </div>
            </div>
            <Label htmlFor="account-activity" className="sr-only">
              Toggle account activity
            </Label>
            <ToggleSwitch
              checked={isAccountActivity}
              id="account-activity"
              label=""
              name="account-activity"
              onChange={() => setAccountActivity(!isAccountActivity)}
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Meetups Near You</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get an email when a Dribbble Meetup is posted close to my location
              </div>
            </div>
            <Label htmlFor="meetups-near-you" className="sr-only">
              Toggle meetups near you
            </Label>
            <ToggleSwitch
              checked={isMeetupsNearYou}
              id="meetups-near-you"
              label=""
              name="meetups-near-you"
              onChange={() => setMeetupsNearYou(!isMeetupsNearYou)}
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">New Messages</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get Themsberg news, announcements, and product updates
              </div>
            </div>
            <Label htmlFor="new-messages" className="sr-only">
              Toggle new messages
            </Label>
            <ToggleSwitch
              checked={isNewMessages}
              id="new-messages"
              label=""
              name="new-messages"
              onChange={() => setNewMessages(!isNewMessages)}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button color="blue">Save all</Button>
        </div>
      </div>
    </Card>
  );
};

const EmailNotificationsCard: FC<Pick<UserSettingsPageData, "userSettings">> = ({ userSettings }) => {
  const [isRatingReminders, setRatingReminders] = useState(userSettings.emailNotifications.ratingReminders);
  const [isItemUpdateNotifications, setItemUpdateNotifications] = useState(userSettings.emailNotifications.itemUpdates);
  const [isItemCommentNotifications, setItemCommentNotifications] = useState(userSettings.emailNotifications.itemComments);
  const [isBuyerReviewNotifications, setBuyerReviewNotifications] = useState(userSettings.emailNotifications.buyerReviews);

  return (
    <Card>
      <div className="flow-root">
        <h3 className="text-xl font-bold dark:text-white">Email Notifications</h3>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up Themesberg to get email notifications</p>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Rating reminders</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Send an email reminding me to rate an item a week after purchase
              </div>
            </div>
            <Label htmlFor="rating-reminders" className="sr-only">
              Toggle rating reminders
            </Label>
            <ToggleSwitch
              checked={isRatingReminders}
              id="rating-reminders"
              label=""
              name="rating-reminders"
              onChange={() => setRatingReminders(!isRatingReminders)}
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Item update notifications</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send user and product notifications for you</div>
            </div>
            <Label htmlFor="item-update-notifications" className="sr-only">
              Toggle item update notifications
            </Label>
            <ToggleSwitch
              checked={isItemUpdateNotifications}
              id="item-update-notifications"
              label=""
              name="item-update-notifications"
              onChange={() => setItemUpdateNotifications(!isItemUpdateNotifications)}
            />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Item comment notifications</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Send me an email when someone comments on one of my items
              </div>
            </div>
            <Label htmlFor="item-comment-notifications" className="sr-only">
              Toggle item comment notifications
            </Label>
            <ToggleSwitch
              checked={isItemCommentNotifications}
              id="item-comment-notifications"
              label=""
              name="item-comment-notifications"
              onChange={() => setItemCommentNotifications(!isItemCommentNotifications)}
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex grow flex-col">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Buyer review notifications</div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Send me an email when someone leaves a review with their rating
              </div>
            </div>
            <Label htmlFor="buyer-review-notifications" className="sr-only">
              Toggle buyer review notifications
            </Label>
            <ToggleSwitch
              checked={isBuyerReviewNotifications}
              id="buyer-review-notifications"
              label=""
              name="buyer-review-notifications"
              onChange={() => setBuyerReviewNotifications(!isBuyerReviewNotifications)}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button color="blue">Save all</Button>
        </div>
      </div>
    </Card>
  );
};

export default UserSettingsPageContent;
