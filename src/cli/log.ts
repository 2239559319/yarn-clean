import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function log(str: string) {
  const timeStr = new Date().toString();

  await writeFile(join(__dirname, 'log.txt'), `${timeStr}   ${str}\n`, {
    encoding: 'utf-8',
    flag: 'a'
  });
}
