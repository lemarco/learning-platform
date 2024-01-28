export default () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-[900px]">
        <div className=" py-8 px-4 my-auto mx-auto max-w-screen-xl text-center sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">The most trusted learning platform</h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here are a few reasons why you should choose our company</p>
          <div className="mt-8 lg:mt-12 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              {/* <FingerprintIcon className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" /> */}
              <h3 className="mb-2 text-xl font-bold dark:text-white">Secure storage</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                We store the vast majority of the digital assets in secure offline storage.
              </p>
            </div>
            <div>
              {/* <NoteIcon className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" /> */}
              <h3 className="mb-2 text-xl font-bold dark:text-white">Insurance</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                Flowbite maintains crypto insurance and all USD cash balances are covered.
              </p>
            </div>
            <div>
              {/* <CheckMarkIcon className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500" /> */}
              <h3 className="mb-2 text-xl font-bold dark:text-white">Best practices</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                Flowbite marketplace supports a variety of the most popular digital currencies.
              </p>
            </div>
          </div>
          <h4 className="mt-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white"> There is no vacancy available</h4>
        </div>
      </section>
    </>
  );
};

export const metadata = {
  title: "Careers",
  meta: [
    {
      name: "description",
      content: "Careers",
    },
  ],
};
