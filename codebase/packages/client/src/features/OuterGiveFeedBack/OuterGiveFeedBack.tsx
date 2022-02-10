import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateRule, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { colleagueUUIDSelector, FeedbackActions, feedbackByStatusSelector } from '@pma/store';
import debounce from 'lodash.debounce';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { FilterOption } from 'features/Shared';
import { FeedbackStatus } from 'config/enum';
import { FeedbackBlock, RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';
import { getSortString } from 'utils/feedback';

type TypeinitialFilters = {
  sort: string;
  search: string;
};

const initialFilters: TypeinitialFilters = {
  sort: '',
  search: '',
};

const OuterGiveFeedBack: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();

  // filter
  const [focus, setFocus] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState<TypeinitialFilters>(initialFilters);

  const hasActiveFilter = Object.values(filter).some((f) => f);

  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const small = isBreakpoint.small || isBreakpoint.xSmall;

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [status, setCheckedStatus] = useState(FeedbackStatus.DRAFT);

  const getAllFeedback = useCallback(
    debounce((filter) => {
      dispatch(
        FeedbackActions.getAllFeedbacks({
          _limit: '300',
          'colleague-uuid': colleagueUuid,
          ...(filter.search.length > 2 && { _search: filter.search }),
          _sort: getSortString(filter),
        }),
      );
    }, 300),
    [],
  );

  useEffect(() => {
    if (!colleagueUuid) return;
    getAllFeedback(filter);
  }, [colleagueUuid, filter]);

  useEffect(() => {
    if (focus) {
      setFilterModal(() => false);
    }
  }, [focus]);

  const handleBtnClick = (): void => {
    navigate(paramsReplacer(`/${Page.GIVE_NEW_FEEDBACK}`, { ':uuid': 'new' }));
  };

  const feedbackList = useSelector(feedbackByStatusSelector(status)) || [];

  return (
    <div>
      <div className={css(headerStyled({ medium }))}>
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
          <FilterModal isOpen={filterModal} filter={filter} setFilter={setFilter} toggleOpen={setFilterModal} />
        </div>
      </div>
      <div className={css(draftsStyle)}>
        <FeedbackBlock list={feedbackList} canEdit={status === FeedbackStatus.DRAFT} />
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

export default OuterGiveFeedBack;
