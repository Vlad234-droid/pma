import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, FeedbackActions, getGiveFeedbacksSelector } from '@pma/store';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { FilterOption } from 'features/general/Shared';
import { FeedbackStatus } from 'config/enum';
import { FeedbackBlock, RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';
import { prepareData } from './config';

export const FEEDBACK_WRAPPER = 'feedback-wrapper';
export const LIST_WRAPPER = 'list-wrapper';

type Filter = {
  sort: string;
  search: string;
};

const initialFilters: Filter = {
  sort: '',
  search: '',
};

const GiveFeedBack: FC = () => {
  const { css, matchMedia } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [focus, setFocus] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState<Filter>(initialFilters);

  const hasActiveFilter = Object.values(filter).some((f) => f);

  const medium = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const small = matchMedia({ xSmall: true, small: true }) || false;

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [status, setCheckedStatus] = useState(FeedbackStatus.DRAFT);

  useEffect(() => {
    dispatch(FeedbackActions.clearFeedback());
  }, []);

  const getGiveFeedbacks = useCallback(
    debounce((filter) => {
      dispatch(FeedbackActions.getGiveFeedback(prepareData(colleagueUuid, filter)));
    }, 300),
    [],
  );

  useEffect(() => {
    if (!colleagueUuid) return;
    getGiveFeedbacks(filter);
  }, [colleagueUuid, filter]);

  useEffect(() => {
    if (focus) {
      setFilterModal(() => false);
    }
  }, [focus]);

  const handleBtnClick = (): void => {
    navigate(paramsReplacer(`/${Page.GIVE_NEW_FEEDBACK}`, { ':uuid': 'new' }));
  };

  const feedbackList = useSelector(getGiveFeedbacksSelector(status)) || [];

  return (
    <div>
      <div className={css(headerStyled({ medium }))} data-test-id={FEEDBACK_WRAPPER}>
        <RadioBtns checkedRadio={status} onCheck={setCheckedStatus} handleBtnClick={handleBtnClick} />
        <div className={css(filterIconStyled({ small }))}>
          <FilterOption
            focus={focus}
            customIcon={true}
            onFocus={setFocus}
            searchValue={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            hasActiveFilter={hasActiveFilter}
            withIcon={false}
            customStyles={{
              ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: 0 }),
              ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            }}
            onSettingsPress={() => {
              setFilterModal((prev) => !prev);
            }}
          />
          <FilterModal
            isOpen={filterModal}
            filter={filter}
            setFilter={setFilter}
            toggleOpen={setFilterModal}
            styles={{ ...(medium && { right: '0px' }), ...(small && { left: '0px' }) }}
          />
        </div>
      </div>
      <div>
        <div className={css(draftsStyle)} data-test-id={LIST_WRAPPER}>
          <FeedbackBlock list={feedbackList} canEdit={status === FeedbackStatus.DRAFT} />
        </div>
      </div>
    </div>
  );
};
const filterIconStyled: CreateRule<{ small: boolean }> = ({ small }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    ...(small && { flexBasis: '300px', marginTop: '24px' }),
    position: 'relative',
  };
};
const headerStyled: CreateRule<{ medium: boolean }> = ({ medium }) => {
  return {
    display: 'flex',
    flexWrap: medium ? 'wrap' : 'nowrap',
    ...(medium && { flexBasis: '250px' }),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
  };
};

const draftsStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

export default GiveFeedBack;
