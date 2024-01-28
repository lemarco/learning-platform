import { getMetadataGenerator } from "@/services/i18n";
import { sleep } from "@/utils/sleep";

export const generateMetadata = getMetadataGenerator("editor");
export default async function Editor() {
  await sleep(10000); // testing loading page
  return <>Editor page</>;
}
