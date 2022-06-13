import React, { FC } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import requestInfoModal from 'images/requestInfoModal.png';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';

export const WRAPPER = 'wrapper';

type InfoModalProps = {
  onClose: () => void;
};

const InfoModalContent: FC<InfoModalProps> = ({ onClose }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return (
    <div className={css(wrapperStyle)} data-test-id={WRAPPER}>
      <p className={css(titleStyle)}>
        <Trans i18nKey='when_you_request_feedback_from_you_colleagues'>
          When you request feedback from you colleagues, follow these steps to guide your colleague to give you great
          feedback.
        </Trans>
        <br />
      </p>
      <ol className={css(listStyle)}>
        <li>
          <b>
            <Trans i18nKey='take_a_step_back'></Trans>
          </b>{' '}
          <Trans i18nKey='take_time_to_reflect_on_the_feedback'>
            Take time to reflect on the feedback you&apos;ve received, don&apos;t feel like you must take action right
            away. If you&apos;re having a bad day, you&apos;re more likely to receive feedback negatively, so making
            sure you&apos;re in a positive frame of mind where you can stay curious about your feedback will set you up
            to receive feedback as constructive and well meaning.
          </Trans>
        </li>
        <li>
          <b>
            <Trans i18nKey='take_a_step_back'>Request feedback in real-time.</Trans>
          </b>{' '}
          <Trans i18nKey='by_requesting_feedback_in_real_time'>
            By requesting feedback in real time, your colleagues are more likely to have a great memory of what happened
            meaning you&apos;re more likely to receive great feedback. For example, if you&apos;re requesting feedback
            on your presentation style, request feedback straight after a meeting you&apos;ve presented at.
          </Trans>
        </li>

        <li>
          <b>
            <Trans i18nKey='seek_a_rounded_view'>Seek a rounded view.</Trans>
          </b>{' '}
          <Trans i18nKey='request_feedback_from_a_range_of_colleagues'>
            Request feedback from a range of colleagues such as your peers, line manager and project stakeholders so you
            can build a rounded perspective of how your colleagues view you.
          </Trans>
        </li>
      </ol>
      <p className={css(titleStyle)}>
        <Trans i18nKey='when_requesting_feedback_choose_one_area'>
          When requesting feedback, choose one area you&apos;d like feedback on. This could be any part of your role:
          &apos;what&apos; you do or &apos;how&apos; you do it. We&apos;ve linked the options to your full contribution.
        </Trans>
      </p>
      <div className={css({ marginTop: '22px' })}>
        <img
          className={css({ width: '100%', height: '100%', objectFit: 'contain' })}
          src={requestInfoModal}
          alt='Learn more about how to request great feedback'
        />
      </div>
      <span className={css(iconStyle({ mobileScreen }))}>
        <IconButton graphic='arrowLeft' onPress={onClose} iconProps={{ invertColors: true }} />
      </span>
    </div>
  );
};
const wrapperStyle: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};

const iconStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const titleStyle: Rule = {
  margin: '0px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

const listStyle: Rule = () => ({
  paddingLeft: '24px',

  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
});

export default InfoModalContent;
