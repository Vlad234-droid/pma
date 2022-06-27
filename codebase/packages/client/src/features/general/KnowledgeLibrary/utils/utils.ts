import { Item } from '../types';
import { colleaguesData, managersData } from '../config';

export const prepareData = (dataMap, filterFn) => {
  let mapFn = (item: Item) => item;
  if (Object.keys(dataMap).length) {
    mapFn = (item: Item) => ({
      ...item,
      title: dataMap?.[item?.id]?.[0]?.title ?? '',
      description: dataMap?.[item?.id]?.[0]?.description ?? '',
      link: dataMap?.[item?.id]?.[0]?.properties?.url ?? '',
      imgDescription: dataMap?.[item?.id]?.[0]?.properties?.imgDescription ?? '',
      type: dataMap?.[item?.id]?.[0]?.properties?.type ?? '',
    });
  }
  //@ts-ignore
  return [...colleaguesData, ...managersData].filter(filterFn).map(mapFn);
};
