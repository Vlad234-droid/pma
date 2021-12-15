//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const configEntriesSelector = (state: RootState) => state.configEntries || {};

export const getConfigEntriesSelector = createSelector(configEntriesSelector, ({ data }) => {
  // @ts-ignore
  return data.map((item) => ({ value: item?.uuid, label: item?.name }));
});

export const getConfigEntriesSelectorLevel2 = (level1) =>
  createSelector(configEntriesSelector, ({ data }) => {
    if (!data) return [];
    // @ts-ignore
    return data
      .filter((item) => {
        // @ts-ignore
        return item.name === level1;
      })
      .reduce((prev, item) => {
        // @ts-ignore
        return [
          ...prev,
          ...item.children.map((child) => ({
            value: child.uuid,
            label: child.name,
            children: child.children,
          })),
        ];
      }, []);
  });

export const configEntriesMetaSelector = createSelector(configEntriesSelector, ({ meta }) => meta);
