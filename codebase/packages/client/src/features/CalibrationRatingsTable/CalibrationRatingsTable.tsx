import React from 'react';
import { Rule, Styles } from '@pma/dex-wrapper';

import { Table } from 'components/Table';
import { useTranslation } from 'components/Translation';

import { getContent, getTitles } from './utils';

export const CalibrationRatingsTable = () => {
  const { t } = useTranslation();
  return (
    <Table
      tableTitles={getTitles(t)}
      tableStyles={{ overflow: 'auto' }}
      titleCustomStyles={titleCustomStyles}
      descriptionCustomStyle={descriptionCustomStyle}
      trCustomStyle={trCustomStyle}
      currentItems={getContent()}
      breakTd={true}
    />
  );
};

const titleCustomStyles: Rule = ({ theme }) => ({
  border: 'none',
  //@ts-ignore
  borderBottom: `1px solid ${theme.colors.lightGray}`,
  background: theme.colors.white,
  color: theme.colors.base,
  textAlign: 'left',
  height: '40px',
});
const descriptionCustomStyle: Rule = () => ({
  textAlign: 'left',
  border: 'none',
  height: '70px',
});
const trCustomStyle: Rule = ({ theme }) =>
  ({
    ':nth-child(odd)': {
      //@ts-ignore
      background: theme.colors.backgroundDarkest,
    },
    '& > td': {
      ':first-child': {
        color: theme.colors.tescoBlue,
        fontWeight: theme.font.weight.bold,
      },
      ':nth-child(2)': {
        fontWeight: theme.font.weight.bold,
      },
    },
  } as Styles);
