import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

const Table: FC<{ currentItems: Array<Record<string, string | number | null>>; tableTitles: Array<string> }> = ({
  currentItems,
  tableTitles,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      <div className={css(tableContainer)}>
        <div className={css(wrapper)}>
          <div className={css(innerWrapper)}>
            <table className={css(tableStyle)}>
              <thead>
                <tr className={css(tableTitlesStyle)}>
                  {tableTitles?.map((item) => (
                    <th className={css(contentStyle)} key={item}>
                      {t(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              {currentItems?.map((item, i) => (
                <tbody key={i}>
                  <tr className={css(descriptionStyle)}>
                    {Object.values(item)?.map((desc, i) => (
                      <td key={`${desc}${i}`} className={css(contentStyle)}>
                        {desc as string}
                      </td>
                    ))}
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const contentStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  border: `1px solid ${theme.colors.lightGray}`,
  padding: '8px 10px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  verticalAlign: 'middle',
});
const tableTitlesStyle: Rule = ({ theme }) =>
  ({
    background: theme.colors.tescoBlue,
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
  overflowX: 'auto',
  width: '100%',
};

export default Table;
