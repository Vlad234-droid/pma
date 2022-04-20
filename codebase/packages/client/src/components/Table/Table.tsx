import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

export const TABLE_WRAPPER = 'table-wrapper';

const Table: FC<{ titles: Array<string>; description: Array<string> }> = ({ titles, description }) => {
  const { css } = useStyle();
  return (
    <div data-test-id={TABLE_WRAPPER} className={css(tableContainer)}>
      <div className={css(wrapper)}>
        <div className={css(innerWrapper)}>
          <table className={css(tableStyle)}>
            <thead>
              <tr>
                {titles.map((item) => (
                  <th className={css(contentStyle)} key={item}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {description.map((item, i) => (
                  <td key={`${item}${i}`} className={css(contentStyle)}>
                    {item}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const contentStyle: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  padding: '10px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  verticalAlign: 'middle',
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
const tableStyle: Rule = ({ theme }) => ({
  borderCollapse: 'collapse',
  marginTop: theme.spacing.s4,
  marginBottom: theme.spacing.s4,
  width: '100%',
});

export default Table;
