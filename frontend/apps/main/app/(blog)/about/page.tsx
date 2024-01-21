export default () => {
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
      <section className="bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">Our Values</h2>
            <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
              Crafted with skill and care to help our clients grow their business!
            </p>
          </div>

          <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <span className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Official website</h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>

            <div className="space-y-4">
              <span className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Management system</h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>

            <div className="space-y-4">
              <span className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                ololo
              </span>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">Logo design</h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the world. Learn.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map(({ photo, role, name, description, twitterLink, githubLink, profileUrl }) => {
              return (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href={profileUrl}>
                    <img className="p-4 w-full rounded-lg" src={photo} alt={name} />
                  </a>
                  <div className="px-5 pb-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href={profileUrl}>{name}</a>
                    </h3>
                    <span className="text-gray-500">{role}</span>
                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
                    <ul className="flex space-x-4 sm:mt-0">
                      <li>
                        <a href={twitterLink} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          {/* <TwitterLinkIcon className="w-5 h-5" /> */}
                        </a>
                      </li>
                      <li>
                        <a href={githubLink} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          {/* <GithubLinkIcon className="w-5 h-5" /> */}
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
};

export const metadata = {
  title: "About us",
  meta: [
    {
      name: "description",
      content: "About us",
    },
  ],
};
