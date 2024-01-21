"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { HiBriefcase, HiDotsVertical, HiHeart, HiLocationMarker } from "react-icons/hi";
import { MdComment } from "react-icons/md";
import type { UserFeedPageData } from "./page";

const UserFeedPageContent: FC<UserFeedPageData> = ({ userFeed, userProfile }) => (
  <div className="relative grid grid-cols-1 overflow-y-hidden xl:h-[calc(100vh-4rem)] xl:grid-cols-4 xl:gap-4">
    <UserProfile userProfile={userProfile} />
    <UserFeed userFeed={userFeed} userProfile={userProfile} />
  </div>
);

const UserProfile: FC<Pick<UserFeedPageData, "userProfile">> = ({ userProfile }) => (
  <div className="px-4 py-6 xl:sticky xl:mb-0 xl:pb-0">
    <div className="sm:flex sm:space-x-4 xl:block xl:space-x-0">
      <Image alt="" height={80} src={userProfile.avatar} width={80} className="mb-2 rounded-lg" />
      <div>
        <h2 className="text-xl font-bold dark:text-white">{userProfile.name}</h2>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <HiBriefcase className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />
            {userProfile.position}
          </li>
          <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <HiLocationMarker className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />
            {userProfile.location}
          </li>
        </ul>
      </div>
    </div>
    <div className="mb-6 sm:flex xl:block xl:space-y-4">
      <div className="sm:flex-1">
        <div className="text-sm font-normal not-italic text-gray-500 dark:text-gray-400">
          <div className="mt-4">Email address</div>
          <Link className="text-sm font-medium text-gray-900 dark:text-white" href={`mailto:${userProfile.email}`}>
            {userProfile.email}
          </Link>
          <div className="mt-4">Home address</div>
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{userProfile.address}</div>
          <div className="mt-4 dark:text-gray-400">Phone number</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.phone}</div>
        </div>
      </div>
    </div>
    <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Software Skills</h3>
    <div className="mt-0 flex space-x-3">
      {userProfile.softwareSkills.map(({ icon, label }) => (
        <Image key={label} alt={label} height={16} src={icon} width={16} />
      ))}
    </div>
  </div>
);

const UserFeed: FC<UserFeedPageData> = ({ userFeed, userProfile }) => (
  <>
    <div className="col-span-2 m-auto mb-5 h-full max-w-3xl space-y-6 overflow-hidden overflow-y-auto p-4 lg:pt-6">
      {userFeed.map((userFeedEntry) => (
        <Card
          key={userFeedEntry.avatar}
          theme={{
            root: { children: "space-y-4 p-4 lg:space-y-6 xl:p-6 2xl:p-8" },
          }}
        >
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <Image alt="" height={40} src={userFeedEntry.avatar} width={40} className="rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{userFeedEntry.author}</p>
              <p className="truncate text-sm font-normal text-gray-500 dark:text-gray-400">{userFeedEntry.time}</p>
            </div>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <HiDotsVertical className="text-2xl" />
            </Link>
          </div>
          <div className="space-y-4">
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">{userFeedEntry.message}</p>
            {!!userFeedEntry.attachments?.length && (
              <div className="flex flex-wrap">
                {userFeedEntry.attachments?.map((attachment) => (
                  <Image key={attachment} alt="" height={160} src={attachment} width={160} className="mb-4 mr-4 rounded-lg" />
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-6 border-y border-gray-200 py-3 dark:border-gray-700">
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <MdComment className="mr-1 h-4 w-4" />
              {userFeedEntry.numComments > 0 ? `${userFeedEntry.numComments} Comments` : "No comments"}
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <HiHeart className="mr-1 h-4 w-4" />
              {userFeedEntry.numLikes} Likes
            </Link>
          </div>
          <div>
            <form action="#">
              <label htmlFor="write-message" className="sr-only">
                Comment
              </label>
              <input
                type="text"
                id="write-message"
                placeholder="Write comment"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              />
            </form>
          </div>
        </Card>
      ))}
    </div>
    <div className="hidden w-full space-y-10 px-4 py-6 xl:sticky xl:flex xl:flex-col">
      <div>
        <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Experience</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {userProfile.experience.map(({ organization, position, location, logo }) => (
            <li key={logo} className="flex items-center space-x-4 py-4 pb-4 first-of-type:pt-0 last-of-type:pb-0">
              <div className="flex shrink-0 items-center justify-center rounded-lg">
                <Image alt="" height={40} src={logo} width={40} />
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{organization}</div>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {position}, {location}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="xl:sticky">
        <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Education</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {userProfile.education.map(({ institution, focus }) => (
            <li key={institution} className="flex items-center space-x-4 py-4 first-of-type:pt-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold uppercase text-white dark:bg-gray-600">
                {institution.split(" ").map((word) => word.charAt(0))}
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{institution}</div>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{focus}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default UserFeedPageContent;
