import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Rule } from '@dex-ddl/core';

export type AttentionProps = {
  customStyle?: Rule;
};

const Attention: FC<AttentionProps> = ({ customStyle = {} }) => {
  const { css } = useStyle();
  return (
    <div className={css(containerStyle, customStyle)}>
      <Trans i18nKey={'attention'}>
        Please complete all fields, including meeting minimum character count of 10, before moving on
      </Trans>
    </div>
  );
};

const containerStyle: Rule = {
  fontStyle: 'italic',
  marginBottom: '10px',
};

export default Attention;
