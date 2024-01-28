"use client";
import { useLanguage } from "@/services/i18n/use-language";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect } from "react";
import { useAuth } from "./use-auth";

type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function withPageRequiredGuest(Component: FunctionComponent<PropsType>) {
  return function PageRequiredGuest(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();
    const language = useLanguage();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo") ?? `/${language}`;
        router.replace(returnTo);
      };

      check();
    }, [user, isLoaded, router, language]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}
