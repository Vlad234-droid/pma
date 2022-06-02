import React, { FC } from 'react';
import { useStyle, CreateRule, Rule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { VideoPlayer, VideoId } from 'features/VideoPlayer';

export const TEST_ID = 'objective-help-modal';
const OBJECTIVES_HELP =
  'https://colleague-help.ourtesco.com/hc/en-us/articles/4417164321428-Your-Contribution-Strategic-objectives';

const ObjectiveHelpModal: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div data-test-id={TEST_ID} className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <div>
          <div className={css(titleStyle)}>
            <Trans i18nKey={'need_help_with_objectives'}>Need help with writing your objectives?</Trans>
          </div>
          <div className={css(descriptionStyle)}>
            <Trans i18nKey={'need_help_with_objectives_description'}>
              Here are some resources to help you write relevant and meaningful objectives.
            </Trans>
          </div>
        </div>

        <div className={css(subTitleStyle)}>
          <Trans i18nKey={'learn'}>Learn</Trans>
        </div>
        <div className={css(descriptionStyle)}>
          <Trans
            i18nKey={'learn_objectives'}
            components={{
              linkHref: <a href={OBJECTIVES_HELP} />,
            }}
            defaults={
              'This self-led eLearning will help you set objectives that are aligned, ambitious and assessable. Visit Colleague Help <linkHref>here</linkHref>, to find the correct learning pathway for you.'
            }
          ></Trans>
        </div>
        <div className={css(subTitleStyle)}>
          <Trans i18nKey={'read'}>Read</Trans>
        </div>
        <div className={css(descriptionStyle)}>
          <Trans i18nKey={'read_description'}>
            Explore how the 3 A s model can help you write great strategic objectives with real examples to bring it to
            life.
          </Trans>
        </div>

        <div className={css(subTitleStyle)}>
          <Trans i18nKey={'watch'}>Watch</Trans>
        </div>
        <div className={css(descriptionStyle)}>
          <Trans i18nKey={'watch_description'}>
            Understand the 3 A s model and how this approach can help you write strong objectives (3 mins).
          </Trans>
        </div>

        <div className={css(videoPlayerWrapperStyle)}>
          <VideoPlayer videoId={VideoId.CREATE_OBJECTIVE} />
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  height: '100%',
  overflow: 'auto',
  padding: mobileScreen ? '0 16px' : '0 40px',
});

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fluid.f24.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  paddingBottom: '32px',
});

const subTitleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f20,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  paddingTop: '32px',
  paddingBottom: '16px',
});

const descriptionStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const videoPlayerWrapperStyle: Rule = {
  paddingTop: '32px',
};

export default ObjectiveHelpModal;
