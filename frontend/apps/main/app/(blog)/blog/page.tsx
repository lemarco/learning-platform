const ArticlePreview = () => {
  return (
    <article className="w-full max-w-4xl">
      <header className="mb-4 lg:mb-6 ">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          Prototyping from A to Z: best practices for successful prototypes
        </h1>
        <div className="text-base">
          <address className="inline">
            {" "}
            By
            <a rel="author" className="text-gray-900 no-underline dark:text-white hover:underline" href="/">
              {" "}
              Jese Leos{" "}
            </a>{" "}
          </address>
          in{" "}
          <a href="/" className="text-gray-900 no-underline dark:text-white hover:underline">
            Design
          </a>
          on
        </div>
      </header>
      <div className="flex justify-between items-center mb-4">
        <aside aria-label="Share social media">
          <a
            href="/"
            className="inline-flex items-center py-2 px-3 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {/* <FacebookShareIcon className="mr-2 w-3 h-3" /> */}
            Share
          </a>
          <a
            href="/"
            className="inline-flex items-center py-2 px-3 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {/* <TwitterShareIcon className="mr-2 w-3 h-3" /> */}
            Tweet
          </a>
          <a
            href="/"
            className="inline-flex items-center py-2 px-3 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {/* <CopyLinkIcon className="mr-2 w-3 h-3" /> */}
            Copy link
          </a>
        </aside>
        <button
          data-tooltip-target="tooltip-save"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          {/* <BookMarkIcon className="w-5 h-5" /> */}
        </button>
        <div
          id="tooltip-save"
          role="tooltip"
          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Save this article
          <div className="tooltip-arrow" data-popper-arrow />
        </div>
      </div>
      <figure>
        <img src={"https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"} alt="" />

        <figcaption>Digital art by Anonymous</figcaption>
      </figure>
      <p className="text-gray-900 no-underline dark:text-white hover:underline">
        Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes
        interactive elements such as dropdowns, modals, datepickers.
      </p>
      <p className="text-gray-900 no-underline dark:text-white hover:underline">
        Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through
        before committing to an actual design project.
      </p>
      <p className="text-gray-900 no-underline dark:text-white hover:underline">
        But then I found a <a href="/">component library based on Tailwind CSS called Flowbite</a>. It comes with the most commonly used UI
        components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes
        from Tailwind CSS.
      </p>

      <h2>Getting started with Flowbite</h2>
      <p className="text-gray-900 no-underline dark:text-white hover:underline">
        First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components
        based on Tailwind CSS that you can just copy-paste from the documentation.
      </p>
    </article>
  );
};
const RecommendedTopics = () => {
  return (
    <div className="p-6 mb-6 font-medium text-gray-500 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <h4 className="mb-6 font-bold text-gray-900 uppercase dark:text-white">Recommended topics</h4>
      <div className="flex flex-wrap">
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Technology
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Money
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Art
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Productivity
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Psychology
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 mb-3"
        >
          Design
        </a>
        <a
          href="/"
          className="bg-primary-100 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
        >
          Mindfulness
        </a>
      </div>
    </div>
  );
};
const AsideProfileCard = () => {
  return (
    <div className="p-6 mb-6 text-gray-500 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <a href="/" className="flex items-center mb-4">
        <div className="mr-3 shrink-0">
          <img
            className="mt-1 w-8 h-8 rounded-full"
            src={"https://flowbite.com/docs/images/people/profile-picture-1.jpg"}
            alt="Jese Leos"
          />
        </div>
        <div className="mr-3">
          <span className="block font-medium text-gray-900 dark:text-white">Jese Leos</span>
          <span className="text-sm">34k followers</span>
        </div>
      </a>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Hey! I'm Jese Leos. I'm a career-changer. Bootcamp grad & Dev.</p>
      <dl className="mb-5">
        <dt className="mb-2 text-sm font-bold text-gray-900 uppercase dark:text-white">Location</dt>
        <dd className="mb-3 text-sm text-gray-500 dark:text-gray-400">California, United States</dd>
        <dt className="mb-2 text-sm font-bold text-gray-900 uppercase dark:text-white">Joined</dt>
        <dd className="text-sm text-gray-500 dark:text-gray-400">September 20, 2018</dd>
      </dl>
    </div>
  );
};
const Sidebar = () => {
  return (
    <aside className="hidden lg:block lg:w-72" aria-labelledby="sidebar-label">
      <div className="sticky z-50 top-36">
        <h3 id="sidebar-label" className="sr-only">
          Sidebar
        </h3>
        <AsideProfileCard />
        <RecommendedTopics />
      </div>
    </aside>
  );
};

const Blog = () => {
  const articles = [1, 2, 3, 4, 5];
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 xl:px-0 mx-auto max-w-screen-xl ">
          <div className="flex flex-col">
            {articles.map((content, idx) => {
              return <ArticlePreview key={idx + Math.random()} />;
            })}
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default Blog;

export const metadata = {
  title: "Feed",
  meta: [
    {
      name: "description",
      content: "Feed",
    },
  ],
};
