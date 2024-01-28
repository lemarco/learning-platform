"use client";

import { useParams } from "next/navigation";
import { fallbackLanguage } from "./config";

export const useLanguage = () => {
  const params = useParams();
  return (Array.isArray(params?.language) ? params?.language[0] : params?.language) || fallbackLanguage;
};
