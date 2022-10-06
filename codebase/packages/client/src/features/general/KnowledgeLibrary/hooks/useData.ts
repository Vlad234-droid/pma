import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKnowledgeLibraryUrls, getKnowledgeLibraryData, KnowledgeLibraryActions } from '@pma/store';
import { useTenant } from 'features/general/Permission';
import { DataType, Item } from '../types';
import { prepareData } from '../utils';

type Props = {
  filterFn?: (item: Item) => boolean;
  size?: number;
};

const useData = ({ filterFn = () => true }: Props): { colleaguesData: Array<Item>; managersData: Array<Item> } => {
  const [data, setData] = useState<Item[]>([]);
  const dispatch = useDispatch();

  const linksMap = useSelector(getKnowledgeLibraryUrls);
  const dataMap = useSelector(getKnowledgeLibraryData);
  const tenant = useTenant();

  useEffect(() => {
    if (Object.keys(dataMap)) {
      setData(prepareData(dataMap, filterFn, tenant));
    }
  }, [JSON.stringify(dataMap)]);

  useEffect(() => {
    fetchURLs();
  }, []);

  useEffect(() => {
    const keys = Object.keys(linksMap);
    if (keys.length != 0) {
      fetchData({ keys });
    }
  }, [JSON.stringify(Object.keys(linksMap))]);

  const fetchURLs = useCallback(() => {
    dispatch(KnowledgeLibraryActions.getHelpFaqUrls());
  }, []);

  const dataFilter = useCallback((status) => data.filter((item) => item?.type === status), [data]);

  const fetchData = useCallback((links) => {
    dispatch(KnowledgeLibraryActions.getHelpFaqs(links));
  }, []);

  return {
    colleaguesData: dataFilter(DataType.COLLEAGUES),
    managersData: dataFilter(DataType.MANAGERS),
  };
};

export default useData;
