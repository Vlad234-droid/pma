import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

const ReviewHelpTrigger: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <Icon graphic='information' iconStyles={{ width: '18px' }} />
      <span className={css(textStyle)}>
        <Trans i18nKey='need_help_to_write'>Need help with what to write?</Trans>
      </span>
    </div>
  );
};

const wrapperStyle: Rule = { display: 'flex', alignItems: 'center' };

const textStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});

export default ReviewHelpTrigger;
