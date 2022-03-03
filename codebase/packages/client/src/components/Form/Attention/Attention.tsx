import React from 'react';
import { Trans } from 'components/Translation';
import { useStyle } from '@dex-ddl/core';

const Attention = () => {
  const { css } = useStyle();
  return (
    <div
      className={css({
        fontStyle: 'italic',
        marginBottom: '10px',
      })}
    >
      <Trans i18nKey={'attention'}>
        Please complete all fields, including meeting minimum character count of 10, before moving on
      </Trans>
    </div>
  );
};

export default Attention;
