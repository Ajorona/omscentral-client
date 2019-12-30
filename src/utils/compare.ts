function compare(a?: boolean, b?: boolean): number;
function compare(a?: string, b?: string): number;
function compare(a?: number, b?: number): number;
function compare(
  a?: boolean | string | number,
  b?: boolean | string | number
): number {
  const aUndefined = typeof a === 'undefined';
  const bUndefined = typeof b === 'undefined';
  if (aUndefined || bUndefined) {
    return aUndefined && bUndefined ? 0 : aUndefined ? -1 : 1;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  return String(a).localeCompare(String(b));
}

export default compare;
