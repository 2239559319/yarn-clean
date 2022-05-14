interface PathResult {
  name: string;
  version: string;
  integrity: string;
}

export function parse(pathname: string): PathResult | null {
  const arr = pathname.split('-');
  if (arr.length < 4) {
    return null;
  }

  let name = '';
  let version = '';
  let integrity = '';
  const len = arr.length;
  if (arr[len - 2].length !== 40) {
    version = arr[len - 2];
    // eslint-disable-next-line prefer-destructuring
    name = arr[1];
    for (let i = 2; i < len - 2; i++) {
      name += `-${arr[i]}`;
    }
  } else {
    integrity = arr[len - 2];
    version = arr[len - 3];
    // eslint-disable-next-line prefer-destructuring
    name = arr[1];
    for (let i = 2; i < len - 3; i++) {
      name += `-${arr[i]}`;
    }
  }

  return {
    name,
    version,
    integrity
  };
}
