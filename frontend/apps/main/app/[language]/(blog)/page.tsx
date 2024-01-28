import { getMetadataGenerator } from "@/services/i18n";
import Image from "next/image";
export const generateMetadata = getMetadataGenerator("home");
export default function Home() {
  return <>HOME PAGE</>;
}
