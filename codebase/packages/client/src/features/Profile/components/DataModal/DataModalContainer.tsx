import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  currentUserSelector,
} from '@pma/store';

import DataModal from './DataModal';

const DataModalContainer: FC = ()  => {
  const { info } = useSelector(currentUserSelector);

  return (
    <DataModal info={info} />
  );
};


export default DataModalContainer;
