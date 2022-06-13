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
    />
  );
};

const titleCustomStyles: Rule = ({ theme }) => ({
  border: 'none',
  //@ts-ignore
  borderBottom: `1px solid ${theme.colors.lightGray}`,
  background: theme.colors.white,
  color: theme.colors.tescoBlue,
  textAlign: 'left',
  height: '40px',
  fontWeight: theme.font.weight.bold,
});
const descriptionCustomStyle: Rule = () => ({
  textAlign: 'left',
  border: 'none',
  height: '53px',
});
const trCustomStyle: Rule = ({ theme }) =>
  ({
    ':not(:last-child)': {
      //@ts-ignore
      borderBottom: `1px solid ${theme.colors.lightGray}`,
    },
    '& > td': {
      fontSize: theme.font.fixed.f16.fontSize,
      ':first-child': {
        color: theme.colors.base,
        fontWeight: theme.font.weight.bold,
      },
      ':nth-child(2)': {
        fontWeight: theme.font.weight.bold,
      },
    },
  } as Styles);
