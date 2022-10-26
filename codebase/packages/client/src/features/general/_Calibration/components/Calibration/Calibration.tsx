import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import { Trans, useTranslation } from 'components/Translation';
import { Filters, useSearch, FilterOption } from 'features/general/Filters';
import { TileWrapper } from 'components/Tile';
import SuccessModal from 'components/SuccessModal';
import { Employee } from 'config/types';
import { SuccessMark } from 'components/Icon';

import Widgets from '../Widgets';
import Colleagues from '../Colleagues';
import RatingsChart from '../RatingsChart';
import CompareModal from '../CompareModal';
import { getCompareOptions, getCompareData, getCurrentData } from '../../mock';

export const CALIBRATION_TEST_ID = 'CALIBRATION_TEST_ID';

type Props = {
  loadFilterOptions: () => void;
  colleagues?: Employee[];
  colleagueUuid?: string;
  filterOptions?: FilterOption[];
  loading: boolean;
};

const Calibration: FC<Props> = ({ colleagues, filterOptions }) => {
  const [compareMode, setCompareMode] = useState<string>('None');

  const isCompareMode = compareMode !== 'None';
  const compareData = isCompareMode ? getCompareData(compareMode) : undefined;
  const graphData = getCurrentData();

  return (
    <TileWrapper>
      <RatingsChart currentData={graphData} compareData={compareData} />
    </TileWrapper>
  );
};

export default Calibration;
