import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';

export const TEST_ID = 'review-help-modal';

const READ_LINK = 'https://colleague-help.ourtesco.com/hc/en-us/article_attachments/6701783987988/3As_overview.pdf';
const EXPLORE_LINK =
  'https://colleague-help.ourtesco.com/hc/en-us/articles/4631411873812-Your-Contribution-Quarterly-Priorities';

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
          <div className={css(tipsStyle, tipsTextStyle)}>
            <Trans i18nKey={'hint_priority_1'} ns={'bank'}>
              Here are some resources to help you identify relevant and meaningful priorities.
            </Trans>
          </div>
          <div className={css(subTitleStyle)}>
            <Trans i18nKey={'what_to_write_priorities'} ns={'bank'}>
              Read
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <span className={css(tipsTextStyle)}>
              <Trans
                i18nKey={'read_help_priorities'}
                components={{
                  linkHref: <a href={READ_LINK} />,
                }}
                defaults={'Use the 3 A s model to help you write great quarterly priorities <linkHref>here</linkHref>.'}
              ></Trans>
            </span>
          </div>
          <div className={css(subTitleStyle)}>
            <Trans i18nKey={'what_to_write_priorities'} ns={'bank'}>
              Explore
            </Trans>
          </div>
          <div className={css(tipsStyle)}>
            <span className={css(tipsTextStyle)}>
              <Trans
                i18nKey={'explore_help_priorities'}
                components={{
                  linkHref: <a href={EXPLORE_LINK} />,
                }}
                defaults={
                  'Find out more about quarterly priorities and how they support your contribution in the quarterly priorities guide for colleagues and managers <linkHref>here</linkHref>.'
                }
              ></Trans>
            </span>
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

const tipsTextStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  '& > a': {
    color: theme.colors.tescoBlue,
  },
});

const tipsStyle: Rule = ({ theme }) => {
  return {
    paddingTop: '8px',
    paddingBottom: '20px',
    display: 'flex',
  };
};

export default HelperModal;
