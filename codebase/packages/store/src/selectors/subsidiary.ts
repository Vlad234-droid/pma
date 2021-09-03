import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const subsidiariesSelector = (state: RootState) => state.subsidiaries.data;

//@ts-ignore
export const subsidiariesLoadingSelector = (state: RootState) => state.subsidiaries.meta.loading;

export const subsidiariesNameSelector = createSelector(subsidiariesSelector, (subsidiaries) => {
  return subsidiaries ? subsidiaries.map((s: any) => s.name) : null;
});

export const subsidiariesOptionsSelector = createSelector(subsidiariesSelector, (subsidiaries) => {
  return subsidiaries ? subsidiaries.map(({ uuid, name }) => ({ value: uuid, label: name })) : null;
});

export const subsidiaryByUuidSelector = (uuid) =>
  createSelector(subsidiariesSelector, (subsidiaries) =>
    subsidiaries ? subsidiaries.find((subsidiary: any) => subsidiary.uuid == uuid) : null,
  );
