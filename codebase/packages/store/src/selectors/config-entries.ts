//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const configEntriesSelector = (state: RootState) => state.configEntries.data || [];
export const configEntriesMetaSelector = (state: RootState) => state.configEntries.meta;

export const getConfigEntriesSelectorLevel2 = (level1) =>
  createSelector(configEntriesSelector, (configEntries) => {
    return (
      configEntries
        .filter((item) => {
          // @ts-ignore
          return item.name === level1;
        })
        // @ts-ignore
        .reduce((prev, item) => {
          return [
            ...prev,
            // @ts-ignore
            ...item.children.map((child) => ({
              value: child.uuid,
              label: child.name,
              children: child.children,
            })),
          ];
        }, [])
    );
  });
