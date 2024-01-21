import { re } from "./re";
import { install } from "./install";
import { clean } from "./clean";

const args = process.argv;
const command = args[2];

const commands: Record<string, () => void> = {
  clean,
  install,
  re,
};
if (!command || !commands[command]) {
  console.log(`available commands are: ${Object.keys(commands).join(",")}`);
  process.exit();
}

await commands[command]();
