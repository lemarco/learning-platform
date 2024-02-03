import { Run } from "./framework/server";

await Run({
  routes: "./pages",
  base: "http://localhost:3000",
  dist: "./dist",
  watch: true,
  i18n: true,
  i18nResources: "./i18n",
});
