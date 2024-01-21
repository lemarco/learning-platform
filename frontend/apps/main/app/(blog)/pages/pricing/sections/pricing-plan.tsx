"use client";

import { formatNumber } from "@/helpers/format-number";
import { Label, ToggleSwitch } from "flowbite-react";
import { ComponentProps, useState } from "react";
import {
  HiChat,
  HiCreditCard,
  HiCube,
  HiEmojiHappy,
  HiFire,
  HiPaperAirplane,
  HiPresentationChartBar,
  HiShieldCheck,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

const BENEFITS: PricingCardBenefit[] = [
  {
    icon: HiCreditCard,
    title: "Everything you need to manage payments",
  },
  {
    icon: HiEmojiHappy,
    title: "No setup fees, monthly fees, or hidden fees",
  },
  {
    icon: HiShieldCheck,
    title: "Comprehensive & rigorous compliance",
  },
  {
    icon: HiPaperAirplane,
    title: "Get hundreds of feature updates each year",
  },
  {
    icon: HiFire,
    title: "Predictable payouts to your bank accounts",
  },
  {
    icon: HiPresentationChartBar,
    title: "Financial reconciliation and reporting",
  },
  {
    icon: HiChat,
    title: "24×7 phone, chat, and email support",
  },
  {
    icon: HiCube,
    title: "Robust developer platform and third-party integrations",
  },
];

export function PricingPlan() {
  const [isYearly, setYearly] = useState(false);

  return (
    <>
      <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:leading-none sm:tracking-tight">
        Our pricing plan made simple
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
        All types of businesses need access to development resources, so we give
        you the option to decide how much you need to use.
      </p>
      <div className="flex items-center">
        <span
          className={twMerge(
            "text-base font-medium text-gray-500 dark:text-gray-400",
            !isYearly && "text-gray-900 dark:text-white",
          )}
        >
          Monthly
        </span>
        <div>
          <Label
            htmlFor="yearly"
            className="relative mx-4 flex cursor-pointer items-center"
          >
            <ToggleSwitch
              checked={isYearly}
              id="yearly"
              name="yearly"
              onChange={() => setYearly((state) => !state)}
            />
          </Label>
        </div>
        <span
          className={twMerge(
            "text-base font-medium text-gray-500 dark:text-gray-400",
            isYearly && "text-gray-900 dark:text-white",
          )}
        >
          Yearly
        </span>
      </div>
      <section className="xl-gap-8 grid grid-cols-1 space-y-12 pt-9 lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <PricingCard
          title="Freelancer"
          price={{
            type: isYearly ? "yearly" : "monthly",
            monthly: 49,
            yearly: 49 * 10,
            currency: "$",
          }}
          description="Great for personal use and for your side projects."
          benefits={BENEFITS.map((benefit, index) => ({
            ...benefit,
            ...(index > 1 && { disabled: true }),
          }))}
          href="#freelancer"
        />
        <PricingCard
          title="Company"
          price={{
            type: isYearly ? "yearly" : "monthly",
            monthly: 299,
            yearly: 299 * 10,
            currency: "$",
          }}
          description="Great for personal use and for your side projects."
          benefits={BENEFITS.map((benefit, index) => ({
            ...benefit,
            ...(index > 3 && { disabled: true }),
          }))}
          href="#company"
        />
        <PricingCard
          title="Enterprise"
          price={{
            type: isYearly ? "yearly" : "monthly",
            monthly: 2999,
            yearly: 2999 * 10,
            currency: "$",
          }}
          description="Great for personal use and for your side projects."
          benefits={BENEFITS}
          href="#enterprise"
        />
      </section>
    </>
  );
}

interface PricingCardProps {
  title: string;
  price: {
    type: "monthly" | "yearly";
    monthly: number;
    yearly: number;
    currency: string;
  };
  description: string;
  benefits: PricingCardBenefit[];
  href: string;
}

function PricingCard({
  title,
  price,
  description,
  benefits,
  href,
}: PricingCardProps) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow dark:bg-gray-800 xl:p-8">
      <div className="flex-1">
        <h3 className="mb-4 text-2xl font-semibold text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <div className="mb-4 flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold dark:text-white">
            {price.currency}
          </span>
          <span className="text-5xl font-extrabold tracking-tight dark:text-white">
            {formatNumber(price[price.type])}
          </span>
          <span className="ml-1 text-2xl font-normal text-gray-500 dark:text-gray-400">
            {price.type === "monthly" && "/month"}
            {price.type === "yearly" && "/year"}
          </span>
        </div>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <ul role="list" className="my-6 space-y-4">
          {benefits.map((benefit) => (
            <PricingCardBenefit key={benefit.title} {...benefit} />
          ))}
        </ul>
      </div>
      <a
        href={href}
        className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Choose plan
      </a>
    </div>
  );
}

interface PricingCardBenefit {
  icon: React.FC<ComponentProps<"svg">>;
  title: string;
  disabled?: boolean;
}

function PricingCardBenefit({
  icon: Icon,
  title,
  disabled,
}: PricingCardBenefit) {
  return (
    <li className={twMerge("flex space-x-3", disabled && "line-through")}>
      <Icon
        className={twMerge(
          "h-5 w-5 flex-shrink-0 text-green-400",
          disabled && "text-gray-400 dark:text-gray-500",
        )}
      />
      <span
        className={twMerge(
          "text-base font-normal text-gray-500 dark:text-gray-400",
          disabled && "text-gray-500 dark:text-gray-500",
        )}
      >
        {title}
      </span>
    </li>
  );
}
