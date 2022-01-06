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
