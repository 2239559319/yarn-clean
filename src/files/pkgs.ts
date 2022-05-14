import { join } from 'path';
import { readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { getCacheDir } from './cacheDir';
import { parse } from './utils';

export interface Pkg {
  /**
   * absolute path
   */
  path: string;

  name: string;

  version: string;

  integrity: string;

  lastAccessMs: number;

  lastAccessTime: string;
}

async function getPkgsPath(): Promise<Array<Pkg | null>> {
  const dir = await getCacheDir();
  const files = await readdir(dir);
  return Promise.all(
    files.map(async (p) => {
      const parseData = parse(p);
      if (parseData == null) {
        return null;
      }
      const { name, version, integrity } = parse(p);

      let nameWithScope = name;

      let metafilePath = join(dir, p, 'node_modules');
      if (name.charAt(0) === '@') {
        const [scope] = await readdir(metafilePath);
        metafilePath = join(metafilePath, scope);
        const [privateName] = await readdir(metafilePath);
        metafilePath = join(metafilePath, privateName, '.yarn-metadata.json');
        nameWithScope = `${scope}/${privateName}`;
      } else {
        const [pkgNameWithoutScope] = await readdir(metafilePath);
        metafilePath = join(
          metafilePath,
          pkgNameWithoutScope,
          '.yarn-metadata.json'
        );
      }
      if (!existsSync(metafilePath)) {
        return null;
      }
      const statData = await stat(metafilePath);
      return {
        name: nameWithScope,
        path: join(dir, p),
        integrity,
        version,
        lastAccessMs: statData.atimeMs,
        lastAccessTime: statData.atime.toString()
      };
    })
  );
}

export async function getPkgsPathFilter(): Promise<Array<Pkg>> {
  const pkgList = await getPkgsPath();
  return pkgList.filter((v) => v);
}
