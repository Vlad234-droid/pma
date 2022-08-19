import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

export const TEST_ID = 'review-help-modal';

const HelperModal: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div data-test-id={TEST_ID} className={css(wrapperStyle)}>
      <div className={css(wrapperBlockStyle({ mobileScreen }))}>
        <div>
          <div className={css(titleStyle)}>
            <Trans i18nKey={'help_write_priorities'} ns={'bank'}>
              Need help with writing your priorities?
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <Trans i18nKey={'hint_priority_1'} ns={'bank'}>
              Below we have listed some resources to help you write objectives that are meaningful and relevant to your
              role.
            </Trans>
          </div>
          <div className={css(subTitleStyle)}>
            <Trans i18nKey={'what_to_write_priorities'} ns={'bank'}>
              What to write in your priorities
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <Trans i18nKey={'hint_review_2'}>
              What’s most important is the quality of the review conversation you’ve had.
            </Trans>
          </div>
          <div className={css(subTitleStyle)}>
            <Trans i18nKey={'what_to_write_priorities'} ns={'bank'}>
              What to write in your priorities
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <Trans i18nKey={'hint_review_2'}>
              What’s most important is the quality of the review conversation you’ve had.
            </Trans>
          </div>
          <div className={css(subTitleStyle)}>
            <Trans i18nKey={'what_to_write_priorities'} ns={'bank'}>
              What to write in your priorities
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <Trans i18nKey={'hint_review_2'}>
              What’s most important is the quality of the review conversation you’ve had.
            </Trans>
          </div>
        </div>
      </div>
    </div>
  );
};

const wrapperStyle: Rule = {
  height: '100%',
};

const wrapperBlockStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  height: '100%',
  overflow: 'auto',
  padding: mobileScreen ? '0 16px' : '0 40px',
});

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fixed.f24.lineHeight,
  letterSpacing: '0px',
  paddingBottom: '8px',
  fontWeight: theme.font.weight.bold,
});

const subTitleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
});

const tipsStyle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    paddingTop: '8px',
    paddingBottom: '20px',
    display: 'flex',
  };
};

export default HelperModal;
