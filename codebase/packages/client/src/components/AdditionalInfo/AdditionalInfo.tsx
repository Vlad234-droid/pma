import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

const AdditionalInfo: FC<{ manager: string; businessType?: string }> = ({ manager, businessType = '' }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <div className={css(additionalInfo)}>
        <h2>
          <Trans i18nKey={'line_manager'}>Line manager</Trans>
        </h2>
        <p>{manager}</p>
      </div>
      {businessType && (
        <div className={css(additionalInfo, { marginLeft: '30px' })}>
          <h2>
            <Trans i18nKey={'function'}>Function</Trans>
          </h2>
          <p>{businessType}</p>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;

const wrapperStyle: Rule = {
  display: 'inline-flex',
};

const additionalInfo: Rule = ({ theme }) =>
  ({
    '& > h2': {
      marginTop: 0,
      marginBottom: '8px',
      fontSize: theme.font.fixed.f20.fontSize,
      fontWeight: theme.font.weight.bold,
      color: theme.colors.base,
    },
    '& > p': {
      marginTop: 0,
      fontSize: theme.font.fixed.f16.fontSize,
      fontWeight: theme.font.weight.regular,
      color: theme.colors.base,
    },
  } as Styles);
