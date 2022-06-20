import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { InfoModalProps } from '../../type';
import { Trans } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
export const MESSAGE_WRAPPER = 'message-wrapper';

const InfoMessage: FC<InfoModalProps> = ({ goBack }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperInfo)} data-test-id={MESSAGE_WRAPPER}>
      <p className={css(preTitle)}>
        <Trans i18nKey='giving_feedback_helps_us_to_make_sure'>
          Giving feedback helps us to make sure we&apos;re all contributing our best; whether that&apos;s celebrating
          what&apos;s gone well or letting someone know when something could be better.
        </Trans>
        <br />
      </p>
      <p className={css(preTitle)}>
        <Trans i18nKey='to_help_you_give_great_feedback_to_your_colleagues'>
          To help you give great feedback to your colleagues, follow these steps:
        </Trans>
        <br />
      </p>
      <ol className={css(orderedList)}>
        <li>
          <Trans i18nKey='make_your_good_intentions_clear'>
            Make your good intentions clear. This builds trust and lets the receiver know that your words come from a
            positive place. This means they&apos;ll be more likely to listen and reflect on what you&apos;ve shared. An
            example of this would be starting your feedback with something like
          </Trans>{' '}
          <i>&apos;I&apos;m sharing this feedback with you so we can work better together&apos;.</i>
        </li>
        <li>
          <Trans i18nKey='describe_the_situation_importants'>
            Describe the situation. It&apos;s important to be specific about the time, place, and situation you want to
            give feedback on. Being specific helps provide context for the receiver and ensures your feedback is clear.
            An example of this could be
          </Trans>{' '}
          <i>&apos;on Monday when we were working on the customer service desk&apos;</i> or{' '}
          <i>&apos;in last week&apos;s team meeting&apos;.</i>
        </li>
        <li>
          <Trans i18nKey='give_great_examples'>
            Give great examples. Describe what you observed, assumptions aren&apos;t helpful. For example
          </Trans>
          , <i>&apos;I noticed you&apos;ve been late twice this week&apos;</i> is more helpful than{' '}
          <i>&apos;you&apos;re never on time&apos;.</i>
        </li>
        <li>
          <Trans i18nKey='explain_the_impact'>
            Explain the impact. Sharing the impact your examples had gives the receiver an opportunity to reflect and
            think about specific actions they could take going forward. An example of impact
          </Trans>{' '}
          <i>&apos;this meant the customer received great service&apos;</i> or{' '}
          <i>&apos;this meant the rest of the team stayed late&apos;.</i>
        </li>
      </ol>

      <h3 className={css(titleFeedback)}>
        <Trans i18nKey='feedback_shared_will_be_named'>
          Feedback shared will be named, this allows the receiver to ask you questions about the feedback when you next
          speak.
        </Trans>
      </h3>
      <ArrowLeftIcon onClick={goBack} testId={'testId'} />
    </div>
  );
};

const orderedList: Rule = {
  '& li': {
    marginTop: '8px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  },
} as Styles;

const wrapperInfo: Rule = {
  padding: '0px 36px',
  overflow: 'auto',
  height: '100%',
};
const titleFeedback: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

const preTitle: Rule = {
  margin: '16px 0px 0px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

export default InfoMessage;
