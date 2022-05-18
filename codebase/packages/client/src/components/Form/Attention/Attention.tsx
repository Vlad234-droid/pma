import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Rule } from '@pma/dex-wrapper';

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

const containerStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  marginBottom: '10px',
  ...theme.font.fixed.f18,
  fontWeight: '400',
  letterSpacing: '0px',
});

export default Attention;
