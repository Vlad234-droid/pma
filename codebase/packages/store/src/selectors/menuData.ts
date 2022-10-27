import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const menuDataSelector = (state: RootState) => state.menuData;

export const getTopMenuData = createSelector(menuDataSelector, ({ data }) =>
  data?.top?.sort((a, b) => a?.properties?.order - b?.properties?.order),
);
export const getMetaMenu = createSelector(menuDataSelector, (data) => data.meta);
export const getBottomMenuData = createSelector(menuDataSelector, ({ data }) =>
  data?.bottom
    ?.filter((item) => item?.properties?.level === '1')
    ?.sort((a, b) => a?.properties?.order - b?.properties?.order),
);
export const getInnerMenuData = createSelector(menuDataSelector, ({ data }) =>
  data?.bottom
    ?.filter((item) => item?.properties?.level === '2')
    ?.sort((a, b) => a?.properties?.order - b?.properties?.order),
);
