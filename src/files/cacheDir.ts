import { spawn } from 'child_process';
import { stat } from 'fs/promises';

export async function getCacheDir(): Promise<string> {
  return new Promise((resolve, reject) => {
    const childP = spawn('yarn', ['cache', 'dir'], {
      cwd: process.cwd()
    });
    childP.stdout.on('data', async (data: Buffer) => {
      const dir = data.toString('utf-8').trim();
      const statData = await stat(dir);
      if (statData.isDirectory()) {
        resolve(dir);
      } else {
        reject(new Error('can not get cache dir'));
      }
    });
  });
}
