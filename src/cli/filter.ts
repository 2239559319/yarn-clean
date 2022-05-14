import { Pkg } from '../files';

/**
 * return need remove pkg
 */
export function filterMonth({
  list,
  monthCount
}: {
  list: Pkg[];
  monthCount: number;
}) {
  const lastAccessTs =
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000 * monthCount;
  return list.filter(({ lastAccessMs }) => lastAccessMs < lastAccessTs);
}
