import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';

import BaseWidget from 'components/BaseWidget';

const RatingsSubmitted: FC<{ number?: string; outOf?: string }> = ({ number = '5', outOf = '10' }) => {
  const { t } = useTranslation();

  return (
    <BaseWidget
      title={t('ratings_submitted', 'Ratings submitted')}
      onClick={console.log}
      hover={false}
      withButton={false}
      number={number}
      description={t('outOf', 'Out Of', { outOf })}
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

export default RatingsSubmitted;

const tileWrapperStyles: Rule = { minWidth: '350px' };
