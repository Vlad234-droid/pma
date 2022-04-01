import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { getReviewByUuidS } from '@pma/store';
import { useSelector } from 'react-redux';
import { Trans } from 'components/Translation';
import { getPropperTargetType } from '../../utils';

export const NOTES_WRAPPER = 'notes-wrapper';

type PendingNotesProps = {
  item: any;
};

const PendingNotes: FC<PendingNotesProps> = ({ item }) => {
  const { css } = useStyle();

  const review = useSelector(getReviewByUuidS) || [];

  return (
    <div data-test-id={NOTES_WRAPPER}>
      <div className={css({ marginBottom: '16px' })}>
        <h3 className={css(TileTitle)}>
          <Trans i18nKey='colleague_requested_feedback'>
            This colleague has requested feedback from you. Fill out the questions below to share your feedback.
          </Trans>
        </h3>
        <h3 className={css(SphereResondStyle)}>
          {getPropperTargetType(item.targetType, item.targetId, item.feedbackItems, review)}
        </h3>
        <p className={css(QuestionStyle, { marginTop: '4px' })}>
          {item?.feedbackItems?.find((feed) => feed?.code === 'comment_to_request')?.content ?? ''}
        </p>
      </div>

      <p className={css(QuestionStyle)}>
        <Trans i18nKey='let_the_colleague_know_how_the_are_doing'>Let the colleague know how they&apos;re doing</Trans>
      </p>
    </div>
  );
};

const TileTitle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const SphereResondStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px 0px 0px 0px',
};

const QuestionStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};

export default PendingNotes;
