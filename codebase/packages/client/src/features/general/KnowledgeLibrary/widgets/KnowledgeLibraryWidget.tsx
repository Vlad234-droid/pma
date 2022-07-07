import React, { FC } from 'react';

import List from '../components/List';
import { Item } from '../types';
import useData from '../hooks/useData';

const KnowledgeLibraryWidget: FC = () => {
  const ids = ['your-contribution', 'everyday-conversations', 'feedback-at-tesco', 'system-guidance-and-faqs'];

  const filterFn = (item: Item) => ids.includes(item.id);

  const { colleaguesData } = useData({ filterFn });

  return (
    <List
      data={colleaguesData.sort((i1, i2) => ids.indexOf(i1.id) - ids.indexOf(i2.id))}
      customRule={{ width: '100%' }}
    />
  );
};

export default KnowledgeLibraryWidget;
