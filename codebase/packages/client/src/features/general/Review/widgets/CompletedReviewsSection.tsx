import React, { FC, useEffect, useState } from 'react';

import { Button, Rule, useStyle } from '@pma/dex-wrapper';

import { Trans } from 'components/Translation';

import Section from 'components/Section';
import { CompletedReviewsModal } from 'features/general/CompletedReviews';
import useDispatch from 'hooks/useDispatch';
import {
  colleagueCyclesSelector,
  userPerformanceCyclesSelector,
  CompletedReviewsAction,
  completedReviewsSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';

type Props = {
  colleagueUuid?: string;
};

export const CompletedReviewsSection: FC<Props> = ({ colleagueUuid }) => {
  const { css, theme } = useStyle();

  const [isCompletedReviewsModalOpen, setCompletedReviewsModalOpen] = useState(false);

  const isColleagueView = !!colleagueUuid;

  const dispatch = useDispatch();
  const cycles = useSelector(isColleagueView ? colleagueCyclesSelector(colleagueUuid) : userPerformanceCyclesSelector);
  const completedReviews = useSelector(completedReviewsSelector);

  useEffect(() => {
    if (cycles.length) {
      dispatch(CompletedReviewsAction.getCompletedReviews({ colleagueUuid }));
    }
  }, [dispatch, cycles, colleagueUuid]);

  return (
    <>
      <Section
        left={{
          content: (
            <div className={css(title)}>
              <Trans i18nKey='completed_reviews'>Completed Reviews</Trans>
            </div>
          ),
        }}
        right={{
          content: (
            <div>
              <Button
                mode='inverse'
                onPress={() => setCompletedReviewsModalOpen(true)}
                styles={[linkStyles({ theme })]}
                isDisabled={!completedReviews.length}
              >
                <Trans className={css(title)} i18nKey='view_history'>
                  View history
                </Trans>
              </Button>
            </div>
          ),
        }}
      >
        <div className={css(emptyBlockStyle)}>
          {completedReviews.length ? (
            <Trans i18nKey='completed_reviews_count' count={completedReviews.length}>
              You have {completedReviews.length} completed reviews
            </Trans>
          ) : (
            <Trans i18nKey='no_completed_reviews'>You have no completed reviews</Trans>
          )}
        </div>
      </Section>
      {isCompletedReviewsModalOpen && <CompletedReviewsModal onClose={() => setCompletedReviewsModalOpen(false)} />}
    </>
  );
};

const title: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const emptyBlockStyle: Rule = ({ theme }) => ({
  paddingBottom: '20px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const linkStyles = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});
