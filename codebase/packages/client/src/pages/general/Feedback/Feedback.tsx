import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import Feedback from 'features/general/Feedback';
import { Trans } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';

export const FEED_BACK_PAGE = 'feed_back_page';

const FeedBack: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const tenant = useTenant();
  const navigate = useNavigate();

  const handleOpen360Feedback = () => {
    window.open('https://feedback.etsplc.com/Tesco360/', '_blank')?.focus();
  };

  const toggleInfoModal = () => navigate(buildPath(Page.FEEDBACK_360_INFO));

  const FeedbackPreference = useMemo(
    () =>
      tenant === Tenant.GENERAL
        ? React.lazy(() =>
            import('features/general/FeedbackPreference').then((module) => ({ default: module.default })),
          )
        : () => null,
    [],
  );

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={FEED_BACK_PAGE}>
      <div className={css(inMomentStyle({ mobileScreen }))}>
        <div className={css(CenterFlexStyle)}>
          <h2 className={css(inTheMomentStyle)}>
            <Trans i18nKey='difference_between_everyday_feedback_and_feedback_360'>
              What is the difference between ‘Everyday feedback’ and ‘360 feedback’?
            </Trans>
          </h2>
          <IconButton
            graphic='information'
            iconStyles={{ marginLeft: '8px', marginRight: '20px' }}
            data-test-id='iconButton'
            onPress={() => toggleInfoModal()}
          />
        </div>
        <div>
          <IconButton
            customVariantRules={{ default: iconBtnStyle }}
            onPress={handleOpen360Feedback}
            graphic='add'
            iconProps={{ invertColors: true }}
            iconStyles={iconStyle}
          >
            <Trans i18nKey='feedback_360'>360 Feedback</Trans>
          </IconButton>
        </div>
      </div>
      <Feedback />
      <FeedbackPreference />
    </div>
  );
};

const inTheMomentStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
});

const CenterFlexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inMomentStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  if (mobileScreen) {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }
  return { letterSpacing: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 22px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  whiteSpace: 'nowrap',
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

export default FeedBack;
