import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesByCriteria, MessagesActions } from '@pma/store';
import { DataType, Item } from '../types';

import { colleaguesData, managersData } from '../config';

type Props = {
  dataType?: DataType;
  filterFn?: (item: Item) => boolean;
  size?: number;
};

const useData = ({ dataType, filterFn = () => true }: Props): [Item[], () => void] => {
  const [data, setData] = useState<Item[]>([]);
  const dispatch = useDispatch();

  const linksMap = []; // useSelector(getKnowledgeLibraryData());

  useEffect(() => {
    let mapFn = (item: Item) => item;
    if (linksMap.length) {
      mapFn = (item: Item) => ({ ...item, link: linksMap[item.id] ?? '' });
    }

    setData(getData().filter(filterFn).map(mapFn));
  }, [dataType, JSON.stringify(linksMap)]);

  useEffect(() => {
    fetchData();
  }, []);

  const getData = () => {
    switch (dataType) {
      case DataType.COLLEAGUES:
        return colleaguesData;
      case DataType.MANAGERS:
        return managersData;
      default:
        return [...colleaguesData, ...managersData];
    }
  };

  const fetchData = useCallback(() => {
    console.log('request');
    // dispatch(KnowledgeLibraryActions.getData());
  }, []);

  return [data, fetchData];
};

export default useData;
