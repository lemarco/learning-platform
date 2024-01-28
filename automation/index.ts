import { clean } from "./clean";
import { install } from "./install";
import { re } from "./re";

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
