import React, { FC, useCallback, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  FeedbackActions,
  getLoadedStateSelector,
  getRespondedFeedbacksSelector,
} from '@pma/store';

import { FilterModal } from '../Shared/components/FilterModal';
import { DraftItem, RadioBtns } from './components';
import { FilterOption } from 'features/general/Shared';
import debounce from 'lodash.debounce';
import { FEEDBACK_STATUS_IN, FeedbackStatus } from 'config/enum';
import Spinner from 'components/Spinner';
import { initialState } from './config';

import { buildSearchFeedbacksQuery, getSortString } from 'utils';
import { Plug } from '../../../components/Plug';
import { useTranslation } from '../../../components/Translation';

export const RESPOND_FEEDBACK_CONTAINER = 'respond_feedback_container';

const RespondFeedback: FC = () => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const medium = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const dispatch = useDispatch();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loaded } = useSelector(getLoadedStateSelector);

  const [focus, setFocus] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filterFeedbacks, setFilterFeedbacks] = useState(initialState);
  const [status, setStatus] = useState(FeedbackStatus.PENDING);

  useEffect(() => {
    dispatch(FeedbackActions.clearFeedback());
  }, []);

  const getAllFeedback = useCallback(
    debounce((filter) => {
      dispatch(
        FeedbackActions.getRespondFeedback({
          _limit: '300',
          'colleague-uuid': colleagueUuid,
          ...(filter.search.length > 2 && buildSearchFeedbacksQuery(filter.search)),
          _sort: getSortString(filter),
          status_in: [FEEDBACK_STATUS_IN.PENDING, FEEDBACK_STATUS_IN.COMPLETED],
          statuses_in: [FeedbackStatus.SUBMITTED, FeedbackStatus.COMPLETED],
        }),
      );
    }, 300),
    [],
  );

  useEffect(() => {
    if (!colleagueUuid) return;
    getAllFeedback(filterFeedbacks);
  }, [colleagueUuid, filterFeedbacks]);

  useEffect(() => {
    if (focus) {
      setFilterModal(() => false);
    }
  }, [focus]);

  const hasActiveFilter = Object.values(filterFeedbacks).some((f) => f);

  const { feedbackList, hasSomeFeedbacks } = useSelector(getRespondedFeedbacksSelector(status)) || [];

  const getPlugElement = () => {
    if (!hasSomeFeedbacks) {
      return (
        <Plug
          title={t('no_respond_feedbacks_title', 'You have no feedback requests to view.')}
          text={t('no_respond_feedbacks_text', 'When you receive a feedback request, you will see it here.')}
        />
      );
    }
    if (status === FeedbackStatus.PENDING) {
      return (
        <Plug
          title={t('no_respond_pending_feedbacks_title', 'You have no pending feedback requests.')}
          text={t(
            'no_respond_pending_feedbacks_text',
            `To see requests for feedback that you have already responded to, please switch to the 'completed' tab`,
          )}
        />
      );
    } else {
      return (
        <Plug
          title={t('no_respond_completed_feedbacks_title', 'You have no completed feedback requests.')}
          text={t(
            'no_respond_completed_feedbacks_text',
            `To see feedback requests you have not responded to, please switch to the 'pending' ta`,
          )}
        />
      );
    }
  };

  return (
    <>
      <div data-test-id={RESPOND_FEEDBACK_CONTAINER}>
        <div className={css(headerStyled({ medium }))}>
          <RadioBtns status={status} setStatus={setStatus} setFilterModal={setFilterModal} filterModal={filterModal} />
          <div className={css(FlexStyled({ medium }))}>
            <FilterOption
              focus={focus}
              customIcon={true}
              searchValue={filterFeedbacks.search}
              onFocus={setFocus}
              withIcon={false}
              customStyles={{
                ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
                ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
              }}
              onChange={(e) => setFilterFeedbacks((prev) => ({ ...prev, search: e.target.value }))}
              onSettingsPress={() => {
                setFilterModal((prev) => !prev);
                setFocus(() => false);
              }}
              hasActiveFilter={hasActiveFilter}
            />
            <FilterModal
              isOpen={filterModal}
              filter={filterFeedbacks}
              setFilter={setFilterFeedbacks}
              toggleOpen={setFilterModal}
              styles={{ ...(medium && { right: '42px' }) }}
            />
          </div>
        </div>
        <div className={css(DraftsStyle)}>
          {!loaded ? (
            <Spinner />
          ) : (
            <DraftItem
              status={status}
              list={feedbackList}
              canEdit={status === FeedbackStatus.PENDING}
              plugElement={getPlugElement()}
            />
          )}
        </div>
      </div>
    </>
  );
};

const FlexStyled: CreateRule<{ medium: boolean }> = ({ medium }) => ({
  display: 'flex',
  alignItems: 'center',
  ...(medium && { flexBasis: '250px' }),
  position: 'relative',
});

const headerStyled: CreateRule<{ medium: boolean }> = ({ medium }) => ({
  display: 'flex',
  flexWrap: medium ? 'wrap' : 'nowrap',
  ...(medium && { flexBasis: '250px' }),
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '24px',
});

const DraftsStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

export default RespondFeedback;
