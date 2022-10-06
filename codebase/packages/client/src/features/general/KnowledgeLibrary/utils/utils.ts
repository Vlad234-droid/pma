import { Item } from '../types';
import { colleaguesData, managersData, bankColleaguesData, managersBankData } from '../config';
import { Tenant } from 'config/enum';

export const prepareData = (dataMap, filterFn, tenant) => {
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

  return (
    [
      ...colleaguesData,
      ...(tenant === Tenant.BANK ? managersBankData : managersData),
      ...(tenant === Tenant.BANK ? bankColleaguesData : []),
    ]
      .filter(filterFn)
      //@ts-ignore
      .map(mapFn)
  );
};
