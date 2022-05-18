import React, { FC } from 'react';
import { useStyle, Rule, Styles, CreateRule } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { TableProps as Props } from './types';

export const TABLE_WRAPPER = 'table-wrapper';

const Table: FC<Props> = ({
  currentItems,
  tableTitles,
  tableStyles = {},
  titleCustomStyles = {},
  descriptionCustomStyle = {},
  trCustomStyle = {},
  breakTd = false,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const breakWord = (text) => {
    return (
      <>
        {text.reduce((acc, item, i) => {
          if (!i) return [...acc, item];
          return [...acc, <br key={i} />, item];
        }, [])}
      </>
    );
  };

  return (
    <div data-test-id={TABLE_WRAPPER} className={css(tableContainer, tableStyles)}>
      <div className={css(wrapper)}>
        <div className={css(innerWrapper)}>
          <table className={css(tableStyle)}>
            <thead>
              <tr className={css(tableTitlesStyle)}>
                {tableTitles?.map((item) => (
                  <th className={css(contentStyle, titleRow({ item }), titleCustomStyles)} key={item}>
                    {t(item)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, i) => (
                <tr key={i} className={css(trCustomStyle)}>
                  {Object.values(item)?.map((desc, i) => (
                    <td key={`${desc}${i}`} className={css(contentStyle, descriptionStyle, descriptionCustomStyle)}>
                      {/*@ts-ignore*/}
                      {!i ? desc : !breakTd ? desc : breakWord(desc ? desc?.split(' ') ?? desc : desc)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const contentStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  border: `1px solid ${theme.colors.lightGray}`,
  padding: '7px 10px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  verticalAlign: 'middle',
});
const titleRow: CreateRule<{ item: string }> =
  ({ item }) =>
  ({ theme }) => ({
    background: item ? theme.colors.tescoBlue : theme.colors.white,
  });
const tableTitlesStyle: Rule = ({ theme }) =>
  ({
    color: theme.colors.white,
    '& > th': {
      fontWeight: '700',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f20.fontSize,
    },
  } as Styles);

const descriptionStyle: Rule = ({ theme }) =>
  ({
    '& > th': {
      color: theme.colors.base,
      fontWeight: '400',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: '22px',
    },
  } as Styles);

const tableStyle: Rule = ({ theme }) => ({
  borderCollapse: 'collapse',
  marginTop: theme.spacing.s0,
  marginBottom: theme.spacing.s0,
  width: '100%',
});

const tableContainer: Rule = {
  width: '100%',
};

const wrapper: Rule = {
  display: 'table',
  tableLayout: 'fixed',
  width: '100%',
};

const innerWrapper: Rule = {
  display: 'table-cell',
  width: '100%',
};

export default Table;
