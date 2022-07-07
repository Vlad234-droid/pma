import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@pma/store';

import DataModal from './DataModal';

// TODO: should move from components to current feature
const DataModalContainer: FC = () => {
  const { info } = useSelector(currentUserSelector);

  return <DataModal info={info} />;
};

export default DataModalContainer;
