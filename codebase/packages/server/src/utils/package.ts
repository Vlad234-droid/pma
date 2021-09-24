import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (value) => value,
  );
  return (...args: T) => piped(fn1(...args));
};

export const getPackageDistFolder = (packageName: string, buildPath: string) =>
  pipe(require.resolve, path.dirname, (mainFilePath) => mainFilePath.replace('src', buildPath))(packageName);
