interface Section {
  title: string;
  items: SectionItem[];
}

interface SectionItem {
  title: string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const SECTIONS: Section[] = [
  {
    title: "Resources",
    items: [
      {
        title: "Themesberg",
        href: "https://themesberg.com?ref=flowbite.com",
      },
      {
        title: "Figma",
        href: "https://www.figma.com/?ref=flowbite.com",
      },
      {
        title: "Tailwind CSS",
        href: "https://tailwindcss.com/?ref=flowbite.com",
      },
      {
        title: "Blog",
        href: "https://themesberg.com/blog?ref=flowbite.com",
      },
      {
        title: "Affiliate program",
        href: "https://themesberg.com/affiliate?ref=flowbite.com",
      },
    ],
  },
  {
    title: "Help and support",
    items: [
      {
        title: "Contact us",
        href: "https://themesberg.com/contact?ref=flowbite.com",
      },
      {
        title: "Knowledge Center",
        href: "https://themesberg.com/knowledge-center?ref=flowbite.com",
      },
    ],
  },
  {
    title: "Follow us",
    items: [
      {
        title: "Github",
        href: "https://github.com/themesberg",
      },
      {
        title: "Twitter",
        href: "https://twitter.com/themesberg",
      },
      {
        title: "Facebook",
        href: "https://www.facebook.com/themesberg",
      },
      {
        title: "LinkedIn",
        href: "https://ro.linkedin.com/company/themesberg",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        title: "Privacy Policy",
        href: "https://themesberg.com/privacy-policy",
      },
      {
        title: "Terms & Conditions",
        href: "https://themesberg.com/terms-and-conditions",
      },
      {
        title: "EULA",
        href: "https://flowbite.com/license",
      },
    ],
  },
];

export function FooterMain() {
  return (
    <footer className="bg-white py-12 dark:bg-gray-800 xl:py-24">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid gap-12 xl:grid-cols-6 xl:gap-24">
          <Brand />
          {SECTIONS.map((section) => (
            <Section key={section.title} {...section} />
          ))}
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-700 lg:my-12" />
        <Copyright />
      </div>
    </footer>
  );
}

function Brand() {
  return (
    <div className="col-span-2">
      <a href="/" className="mr-4 flex">
        <img src="/images/logo.svg" className="mr-3 h-8" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Flowbite</span>
      </a>
      <p className="mt-4 max-w-lg text-gray-500 dark:text-gray-400">
        Flowbite is a UI library of elements &amp; components based on Tailwind CSS that can get you started building websites faster and
        more efficiently.
      </p>
    </div>
  );
}

function Section({ title, items }: Section) {
  return (
    <div>
      <h3 className="mb-6 text-sm font-semibold uppercase text-gray-600 dark:text-white">{title}</h3>
      <ul>
        {items.map((item) => (
          <SectionItem key={`section-${title}-item-${item.title}`} {...item} />
        ))}
      </ul>
    </div>
  );
}

function SectionItem({ title, href, target = "_blank" }: SectionItem) {
  return (
    <li className="mb-4">
      <a href={href} target={target} rel="noreferrer" className="font-normal text-gray-600 hover:underline dark:text-gray-400">
        {title}
      </a>
    </li>
  );
}

function Copyright() {
  return (
    <span className="block text-center text-gray-600 dark:text-gray-400">
      © 2019-<span id="currentYear">{new Date().getFullYear()}</span>{" "}
      <a href="https://themesberg.com" target="_blank" rel="noreferrer">
        Themesberg
      </a>
      . All Rights Reserved.
    </span>
  );
}
