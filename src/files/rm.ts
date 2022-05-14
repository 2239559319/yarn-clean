import { rm } from 'fs/promises';
import type { Pkg } from '.';

export async function rmPkgList(list: Pkg[]) {
  return Promise.all(
    list.map(async ({ path }) => {
      await rm(path, {
        force: true,
        recursive: true,
        maxRetries: 2
      });
    })
  );
}
