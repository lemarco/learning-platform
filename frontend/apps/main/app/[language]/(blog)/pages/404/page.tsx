import { Button } from "flowbite-react";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div className="block md:max-w-lg">
        <Image alt="" height={600} src="/images/illustrations/404.svg" width={600} />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">Page not found</h1>
        <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
        </p>
        <Button color="blue" href="/" className="inline-flex p-[1px]">
          <div className="mr-1 flex items-center gap-x-2">
            <HiChevronLeft className="text-xl" /> Go back home
          </div>
        </Button>
      </div>
    </div>
  );
}
