import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';

import BaseWidget from 'components/BaseWidget';

const RatingsChange: FC<{ count?: number }> = ({ count = '0' }) => {
  const { t } = useTranslation();

  return (
    <BaseWidget
      title={t('ratings_changed', 'Ratings changed')}
      onClick={console.log}
      hover={false}
      withButton={false}
      number={count}
      description={t('ratings', 'Ratings')}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        ...tileWrapperStyles,
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default RatingsChange;

const tileWrapperStyles: Rule = { minWidth: '350px' };
