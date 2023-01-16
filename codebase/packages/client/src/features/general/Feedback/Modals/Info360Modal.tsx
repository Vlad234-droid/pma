import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { VideoId, VideoPlayer } from 'features/general/VideoPlayer';
import { Trans } from 'components/Translation';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';

export const INFO_MODAL = 'info_modal';

type Props = {
  onClose: () => void;
};
const Info360Modal: FC<Props> = ({ onClose }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const tenant = useTenant();

  return (
    <div className={css(WrapperInfo)} data-test-id={INFO_MODAL}>
      <div className={css({ height: '100%' })}>
        <div className={css(title)}>
          <Trans i18nKey='difference_between_everyday_feedback_and_feedback_360'>
            What is the difference between ‘Everyday feedback’ and ‘360 feedback’?
          </Trans>
        </div>
        <p className={css(descriptionStyle)}>
          <Trans i18nKey='you_can_give_and_receive_feedback_with_your_colleagues'>
            You can give and receive feedback with your colleagues using Everyday feedback or 360 feedback.
          </Trans>
        </p>
        <p className={css(descriptionStyle)}>
          <Trans i18nKey='everyday_feedback_lets_you_share' ns={tenant}>
            Everyday feedback lets you share your feedback with your colleagues across any work level and function in
            real time. This type of feedback lets a colleague know what they&apos;re doing great at, the opportunities
            they have to be even better and how to make improvements continuously, meaning they can take the feedback
            onboard and start to make changes straight away. It can and should relate to any part of their full
            contribution: someone&apos;s personal development, their impact on others, their day job or strategic
            objectives. Colleagues have the option to request Everyday feedback, focusing on any area of interest.
          </Trans>
        </p>
        <p className={css(descriptionStyle)}>
          <Trans i18nKey='feedback_360_is_more_structured'>
            360 feedback is more structured. The questionnaire of pre-set questions provides an in-depth view of
            someone&apos;s performance against our Win Together behaviours or our values. Usually, 360 feedback would be
            used once a year to gather a detailed understanding on your decisions and how they impact others from a
            group of self-selected colleagues, including your line manager, direct reports and other people you work
            with regularly, for example project stakeholders.
          </Trans>
        </p>
        <p className={css(descriptionStyle)}>
          <Trans i18nKey='you_will_find_supporting_videos'>
            You will find supporting videos to guide you when giving and receiving feedback on the giving and receiving
            feedback pages.
          </Trans>
        </p>

        <h2 className={css(videoTitleStyle)}>
          <Trans i18nKey='watch_this_video_on_the_importance_of_feedback'>
            Watch this 2-minute video on the importance of feedback:
          </Trans>
        </h2>
        <div className={css(BlockVideoExplanation)}>
          <VideoPlayer videoId={VideoId.LEARN_FEEDBACK} />
        </div>
        <h3 className={css(infoTitleStyle)}>
          <Trans i18nKey='face_to_face_conversations'>Face to face conversations are best for giving feedback.</Trans>
        </h3>
        <p className={css(infoDescriptionStyle)}>
          <Trans i18nKey='sharing_feedback_face_to_face_gives'>
            Sharing feedback face to face gives you the space to have a two-way conversation, building trust and working
            together on what the colleague could do next. Where this isn&apos;t possible, you can use the feedback
            function in the Your Contribution system.
          </Trans>
        </p>
        <h3 className={css(infoTitleStyle)}>
          <Trans i18nKey='want_to_say_thank_you_to_a_colleague'>Want to say “thank you” to a colleague?</Trans>
        </h3>
        <p className={css(infoDescriptionStyle)}>
          <Trans
            i18nKey='recognition_is_important_as_all_other_feedback'
            ns={tenant}
            components={[
              <a
                className={css(linkStyle)}
                target='_blank'
                rel='noreferrer'
                key={0}
                href='https://apps.powerapps.com/play/c247995a-b0c7-4476-8f83-f34f3d2b3e23?tenantId=bce3f16a-29b1-444a-afde-a7b86e45a778&source=portal&screenColor=rgba%280%2C+123%2C+182%2C+1%29&skipAppMetadata=true'
              />,
            ]}
          >
            {tenant === Tenant.GENERAL ? (
              "Recognition is just as important as all other feedback. We need to remember to celebrate our successes, share praise or say 'thank you' to our colleagues when things have gone well. You can share recognition with your colleagues during face to face conversations and using Values Awards. Where this isn't possible, you can use the feedback function in the Your Contribution system."
            ) : (
              <>
                Recognition is just as important as all other feedback. We need to remember to celebrate our successes,
                share praise or say &ldquo;thank you&ldquo; to our colleagues when things have gone well. You can share
                recognition with your colleagues during face to face conversations or through the{' '}
                <a
                  href={
                    'https://apps.powerapps.com/play/c247995a-b0c7-4476-8f83-f34f3d2b3e23?tenantId=bce3f16a-29b1-444a-afde-a7b86e45a778&source=portal&screenColor=rgba%280%2C+123%2C+182%2C+1%29&skipAppMetadata=true'
                  }
                  className={css(linkStyle)}
                  target='_blank'
                  rel='noreferrer'
                >
                  Meaningful Moments Hub
                </a>
              </>
            )}
          </Trans>
        </p>
      </div>
      <span className={css(arrowSpan({ mobileScreen }))}>
        <IconButton graphic='arrowLeft' onPress={onClose} iconProps={{ invertColors: true }} />
      </span>
    </div>
  );
};

const arrowSpan: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : `${theme.spacing.s10}`,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const linkStyle: Rule = {
  textDecoration: 'underline',
};

const title: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  fontWeight: `${theme.font.weight.bold}`,
  marginBottom: '20px',
});

const WrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const descriptionStyle: Rule = ({ theme }) => ({
  margin: '16px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: '20px',
});

const videoTitleStyle: Rule = ({ theme }) => ({
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f24.lineHeight}`,
  margin: '32px 0px 16px 0px',
});

const BlockVideoExplanation: Rule = {
  width: '100%',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'contain',
  },
} as Styles;

const infoTitleStyle: Rule = ({ theme }) => ({
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  marginBottom: '16px',
});

const infoDescriptionStyle: Rule = ({ theme }) => ({
  fontWeight: `${theme.font.weight.light}`,
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  margin: '0px',
});

export default Info360Modal;
