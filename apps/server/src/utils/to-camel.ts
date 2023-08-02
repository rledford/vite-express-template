type AnyObject = Record<string, unknown>;
type AnyArray = Array<AnyObject>;

export const keysToCamel = <T>(arg: T): T => {
  if (isAnyObject(arg)) {
    const result: AnyObject = {};

    Object.keys(arg).forEach((k) => {
      result[toCamel(k)] = arg[k];
    });

    return result as T;
  }

  if (isAnyArray(arg)) {
    return arg.map(keysToCamel) as T;
  }

  return arg;
};

const toCamel = (s: string) => {
  return s.replace(/[-_][a-z]/gi, ($1) => {
    return $1.toUpperCase().replace('_', '');
  });
};

const isAnyObject = (arg: unknown): arg is AnyObject => {
  return arg !== null && !isAnyArray(arg) && typeof arg !== 'function';
};

const isAnyArray = (arg: unknown): arg is AnyArray => {
  return Array.isArray(arg);
};
