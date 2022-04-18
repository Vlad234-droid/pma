import React from 'react';
import { useSelector } from 'react-redux';
import { useStyle } from '@pma/dex-wrapper';
import { getWorkLevelProfilesSelector } from '@pma/store';
import { useTranslation } from 'components/Translation';
import { getTableTitles } from '../../utils';

import { Table } from 'components/Table';

const WorkLevelContent = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const tableData = useSelector(getWorkLevelProfilesSelector);

  const tableTitles = getTableTitles(t);

  return (
    <div className={css({ display: 'flex', flexDirection: 'column' })}>
      {tableData.map((item, i) => (
        <Table key={`${item}${i}`} titles={tableTitles} description={Object.values(item)} />
      ))}
    </div>
  );
};

export default WorkLevelContent;
