export enum SortBy {
  AZ = 'AZ',
  ZA = 'ZA',
  NEW_TO_OLD = 'newToOld',
  OLD_TO_NEW = 'oldToNew',
}

export type SortOption = {
  id: string;
  label: SortBy;
  text: string;
};

export type FilterOption = {
  options: string[];
  title: string;
  multi?: boolean;
  id: number;
};

type FilterValue = string | Record<string, boolean>;
export type FilterValues = Record<number, FilterValue>;
