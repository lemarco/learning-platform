import { component$ } from "@builder.io/qwik";
import { TwitterLinkIcon, GithubLinkIcon } from "components";

export default component$(() => {
  const members = [
    {
      profileUrl: "/",
      photo: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      role: "CEO & Co Founder",
      name: "Jese Leos",
      description: "Jese drives the technical strategy of the themesberg platform and brand.",
      twitterLink: "/",
      githubLink: "",
    },
    {
      profileUrl: "/",
      photo: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      role: "CEO & Co Founder",
      name: "Jese Leos",
      description: "Jese drives the technical strategy of the themesberg platform and brand.",
      twitterLink: "/",
      githubLink: "",
    },
    {
      profileUrl: "/",
      photo: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      role: "CEO & Co Founder",
      name: "Jese Leos",
      description: "Jese drives the technical strategy of the themesberg platform and brand.",
      twitterLink: "/",
      githubLink: "",
    },
  ];
  return (
    <>
      <section class="bg-white dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">Our Values</h2>
            <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
              Crafted with skill and care to help our clients grow their business!
            </p>
          </div>

          <div class="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <div class="space-y-4">
              <span class="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Official website</h3>
              <p class="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>

            <div class="space-y-4">
              <span class="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Management system</h3>
              <p class="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>

            <div class="space-y-4">
              <span class="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 class="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Logo design</h3>
              <p class="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
            <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the world. Learn.</p>
          </div>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map(({ photo, role, name, description, twitterLink, githubLink, profileUrl }) => {
              return (
                <div class="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href={profileUrl}>
                    <img class="p-4 w-full rounded-lg" src={photo} alt={name} />
                  </a>
                  <div class="px-5 pb-5">
                    <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href={profileUrl}>{name}</a>
                    </h3>
                    <span class="text-gray-500">{role}</span>
                    <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
                    <ul class="flex space-x-4 sm:mt-0">
                      <li>
                        <a href={twitterLink} class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          <TwitterLinkIcon className="w-5 h-5" />
                        </a>
                      </li>
                      <li>
                        <a href={githubLink} class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          <GithubLinkIcon className="w-5 h-5" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
});
