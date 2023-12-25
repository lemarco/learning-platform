import { existsSync, lstatSync, readdirSync, rmdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

function deleteNodeModules(rootDir: string): void {
  try {
    const files = readdirSync(rootDir);

    for (const file of files) {
      const filePath = join(rootDir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        if (file === "node_modules") {
          // console.log(`Deleting ${filePath}`);
          deleteFolderRecursive(filePath);
        } else {
          deleteNodeModules(filePath);
        }
      }
    }
  } catch (error) {
    // console.error(`Error: ${error.message}`);
  }
}

function deleteFolderRecursive(folderPath: string): void {
  if (existsSync(folderPath)) {
    readdirSync(folderPath).forEach((file: string) => {
      const curPath = join(folderPath, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(folderPath);
  }
}

deleteNodeModules("./");
