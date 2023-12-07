import { stat, mkdir } from 'node:fs/promises';
import { basename, sep } from 'node:path';

export const toBool = [() => true, () => false];

export const directoryExists = async (path: string) => {
  const stats = await stat(path).catch(() => null);
  if (!stats) return false;
  return stats.isDirectory();
};

export const ensureDirectory = async (path: string) => {
  const alreadyExists = await directoryExists(path);
  if (alreadyExists) return true;
  return mkdir(path).then(...toBool);
};

export const parsePath = (relPath: string) => {
  const name = basename(relPath, '.js');
  const names = relPath.split(sep);
  names[names.length - 1] = name;
  return names;
};
