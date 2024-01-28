import { Button } from "flowbite-react";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi";

export default function ServerErrorPage() {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div className="block md:max-w-lg">
        <Image alt="" height={550} src="/images/illustrations/500.svg" width={550} />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Something has gone seriously wrong
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          It&apos;s always time for a coffee break. We should be back by the time you finish your coffee.
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
