"use client";

import { Badge, Breadcrumb, Progress } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { HiBriefcase, HiHome, HiLocationMarker } from "react-icons/hi";
import type { UserProfilePageData } from "./page";

const UserProfilePageDataContent: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
    <div className="col-span-full mb-4 xl:mb-2">
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href="#">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
            <span className="dark:text-white">Home</span>
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Profile</h1>
    </div>
    <div className="col-span-full xl:col-auto">
      <ProfileIntro userProfile={userProfile} />
      <Skills userProfile={userProfile} />
      <Hobbies userProfile={userProfile} />
    </div>
    <div className="col-span-2">
      <GeneralInformation userProfile={userProfile} />
      <SkillProficiencyProgressBars userProfile={userProfile} />
    </div>
  </div>
);

const ProfileIntro: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    <div className="sm:flex sm:space-x-4 xl:block xl:space-x-0">
      <Image alt="" height={80} src={userProfile.avatar} width={80} className="mb-2 rounded-lg" />
      <div>
        <h2 className="text-xl font-bold dark:text-white">Jese Leos</h2>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <HiBriefcase className="mr-2 h-4 w-4 text-gray-900 dark:text-gray-100" />
            {userProfile.position}
          </li>
          <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <HiLocationMarker className="mr-2 h-4 w-4 text-gray-900 dark:text-gray-100" />
            {userProfile.location}
          </li>
        </ul>
      </div>
    </div>
    <div className="sm:flex xl:block xl:space-y-4">
      <div className="sm:flex-1">
        <div className="text-sm font-normal not-italic text-gray-500 dark:text-gray-400">
          <div className="mt-4">Email address</div>
          <Link className="text-sm font-medium text-gray-900 dark:text-white" href={`mailto:${userProfile.email}`}>
            {userProfile.email}
          </Link>
          <div className="mt-4">Home address</div>
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{userProfile.address}</div>
          <div className="mt-4">Phone number</div>
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{userProfile.phone}</div>
        </div>
      </div>
    </div>
    <div>
      <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Software Skills</h3>
      <div className="flex space-x-3">
        {userProfile.softwareSkills.map(({ icon, label }) => (
          <Image key={label} alt={label} height={16} src={icon} width={16} />
        ))}
      </div>
    </div>
  </div>
);

const Skills: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    <div className="flow-root">
      <h3 className="text-xl font-bold dark:text-white">Skills</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {userProfile.skills.map((skill) => (
          <li key={skill}>
            <Badge color="success" size="xl" className="px-3 py-1.5 font-medium">
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Hobbies: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    <div className="flow-root">
      <h3 className="text-xl font-bold dark:text-white">Hobbies</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {userProfile.hobbies.map((hobby) => (
          <li key={hobby}>
            <Badge color="indigo" size="xl" className="px-3 py-1.5 font-medium">
              {hobby}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const GeneralInformation: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    <h3 className="mb-4 text-xl font-bold dark:text-white">General information</h3>
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <dt className="text-lg font-medium text-gray-900 dark:text-white">About me</dt>
        <dd className="mt-1 max-w-prose space-y-3 text-sm text-gray-500 dark:text-gray-400">
          {userProfile.aboutMe.split("\n").map((paragraph, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <p key={i}>{paragraph}</p>
          ))}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">
          {userProfile.education.map(({ institution }, i) => (
            <>
              {institution}
              {i < userProfile.education.length - 1 ? ", " : null}
            </>
          ))}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Work History</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">
          {userProfile.experience.map(({ organization }, i) => (
            <>
              {organization}
              {i < userProfile.experience.length - 1 ? ", " : null}
            </>
          ))}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">{userProfile.joinDate}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">
          {userProfile.languages.map((language, i) => (
            <>
              {language}
              {i < userProfile.languages.length - 1 ? ", " : null}
            </>
          ))}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">{userProfile.organization}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">{userProfile.position}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">{userProfile.department}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Birthday</dt>
        <dd className="text-sm font-semibold text-gray-900 dark:text-white">{userProfile.birthday}</dd>
      </div>
    </dl>
  </div>
);

const SkillProficiencyProgressBars: FC<UserProfilePageData> = ({ userProfile }) => (
  <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 md:gap-x-16 lg:gap-x-8 2xl:gap-x-24">
      {userProfile.skillProficiencies.map(({ skill, proficiency }) => (
        <div key={skill}>
          <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">{skill}</div>
          <Progress color="dark" progress={proficiency} />
        </div>
      ))}
    </div>
  </div>
);

export default UserProfilePageDataContent;
