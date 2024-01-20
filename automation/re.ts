import { clean } from "./clean";
import { install } from "./install";
export const re = async () => {
  await clean();
  await install();
};
