import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { colleagueUUIDSelector, FeedbackActions, feedbackByStatusSelector } from '@pma/store';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { FilterOption } from 'features/Shared';
import { FeedbackStatus } from 'config/enum';
import { FeedbackBlock, RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';

const OuterGiveFeedBack: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [status, setCheckedStatus] = useState(FeedbackStatus.DRAFT);

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActions.getAllFeedbacks({
        'colleague-uuid': colleagueUuid,
        _limit: '300',
      }),
    );
  }, [colleagueUuid]);

  // filter
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [filterFeedbacks, setFilterFeedbacks] = useState({
    AZ: false,
    ZA: false,
    newToOld: false,
    oldToNew: false,
  });

  useEffect(() => {
    if (!focus) setSearchValueFilterOption(() => '');
    if (focus) {
      setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
      setFilterModal(() => false);
    }
  }, [focus]);

  const handleBtnClick = (): void => {
    navigate(paramsReplacer(`/${Page.GIVE_NEW_FEEDBACK}`, { ':uuid': 'new' }));
  };

  const feedbackList = useSelector(feedbackByStatusSelector(status)) || [];

  return (
    <>
      <div>
        <div className={css(headerStyled)}>
          <RadioBtns checkedRadio={status} onCheck={setCheckedStatus} handleBtnClick={handleBtnClick} />
          <div className={css(FilterIconStyled)}>
            <FilterOption
              focus={focus}
              customIcon={true}
              searchValue={searchValueFilterOption}
              onFocus={setFocus}
              withIcon={false}
              customStyles={{
                ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
                ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
              }}
              onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
              onSettingsPress={() => {
                setFilterModal((prev) => !prev);
                setFocus(() => false);
              }}
            />
            <FilterModal
              isOpen={filterModal}
              filter={filterFeedbacks}
              setFilter={setFilterFeedbacks}
              toggleOpen={setFilterModal}
            />
          </div>
        </div>
        <div className={css(Drafts_style)}>
          <FeedbackBlock list={feedbackList} canEdit={status === FeedbackStatus.DRAFT} />
        </div>
      </div>
    </>
  );
};
const FilterIconStyled: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const small = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    alignItems: 'center',
    ...(small && { flexBasis: '300px', marginTop: '24px' }),
    position: 'relative',
  };
};
const headerStyled: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    flexWrap: medium ? 'wrap' : 'nowrap',
    ...(medium && { flexBasis: '250px' }),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
  };
};

const Drafts_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

export default OuterGiveFeedBack;
