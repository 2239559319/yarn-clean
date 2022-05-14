import { parseOption } from './cmd';
import { filterMonth } from './filter';
import { log } from './log';
import { getPkgsPathFilter, rmPkgList } from '..';

async function start() {
  const { help, month: monthCount } = parseOption();

  if (help) {
    console.log(
      `help   alias -h    get help  
      month   alias -m    set month count     eg  yarn-clean -m 2
    `
    );
    return Promise.resolve();
  }

  const pkgList = await getPkgsPathFilter();
  const pkgNeedRemove = await filterMonth({
    list: pkgList,
    monthCount
  });
  log(JSON.stringify(pkgNeedRemove));

  await rmPkgList(pkgNeedRemove);
  log('remove done');
  return Promise.resolve();
}

(async () => {
  await start();
})();
