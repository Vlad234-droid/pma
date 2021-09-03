import { useCallback, useMemo } from 'react';

import { useBreakpoints, useBreakpointsContext, BreakpointNames } from '../';

type ExtendedBreakpointNames = `${BreakpointNames}${'' | 'Above' | 'Below'}`;
type Options<T> = Partial<Record<ExtendedBreakpointNames, T>>;

export const useMedia = () => {
  const breakpoints = useBreakpointsContext();
  const [currentBreakpoint] = useBreakpoints();

  const breakpointNames = useMemo(() => Object.keys(breakpoints), [breakpoints]);
  const breakpointIndex = useMemo(
    () => currentBreakpoint && breakpointNames.indexOf(currentBreakpoint),
    [currentBreakpoint, breakpointNames],
  );

  const matchMedia: <TOptions>(options: Options<TOptions>) => TOptions | undefined = useCallback(
    (options) => {
      if (!currentBreakpoint || !breakpointIndex) return undefined;

      // direct match
      if (currentBreakpoint in options) return options[currentBreakpoint];

      // match the closest Above
      for (let i = breakpointIndex; i >= 0; --i) {
        const breakpointName = `${breakpointNames[i]}Above` as BreakpointNames;
        if (breakpointName in options) return options[breakpointName];
      }

      // match the closest Below
      for (let i = breakpointIndex; i < breakpointNames.length; ++i) {
        const breakpointName = `${breakpointNames[i]}Below` as BreakpointNames;
        if (breakpointName in options) return options[breakpointName];
      }
    },
    [breakpointIndex, breakpointNames, currentBreakpoint],
  );

  return { matchMedia };
};
