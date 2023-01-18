import { useMemo } from 'react';

export const useOptions = (reviews) => {
  const options = useMemo(() => {
    const periods = new Set<number>(reviews.map(({ lastUpdatedTime }) => new Date(lastUpdatedTime).getFullYear()));
    const sorted = Array.from(periods).sort();

    return {
      options: sorted.map((value) => ({ value: value.toString(), label: `${value} - ${value + 1}` })),
      defaultSelect: sorted.at(-1)?.toString(),
    };
  }, [reviews]);

  return options;
};
