import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Link } from 'react-router-dom';
import TableContent from './components/TableContent';
import { InfoTableProps as Props } from './type';
import { paramsReplacer } from 'utils';
import { buildPath, buildPathWithParams } from 'features/Routes';

export const INFO_TABLE_WRAPPER = 'info_table_wrapper';

const InfoTable: FC<Props> = ({
  mainTitle,
  data,
  preTitle = '',
  link = '',
  Wrapper = 'div',
  type = '',
  params = {},
}) => {
  const { css } = useStyle();

  const props = {
    mainTitle,
    data,
    preTitle,
  };

  if (!link)
    return (
      <Wrapper className={css(infoTableWrapper)} data-test-id={INFO_TABLE_WRAPPER}>
        <TableContent {...props} />
      </Wrapper>
    );

  return (
    <Link
      to={buildPathWithParams(buildPath(paramsReplacer(link, { ':type': type })), {
        ...params,
      })}
      className={css(infoTableWrapper)}
      data-test-id={INFO_TABLE_WRAPPER}
    >
      <TableContent {...props} />
    </Link>
  );
};

const infoTableWrapper: Rule = ({ theme }) => ({
  padding: '24px',
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  width: '100%',
});

export default InfoTable;