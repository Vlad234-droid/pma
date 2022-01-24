import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { FilterOption } from 'features/Shared';
import { DraftItem, RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export const RESPOND_FEEDBACK_CONTAINER = 'respond_feedback_container';

const RespondFeedbackContainer: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();

  const [checkedRadio, setCheckedRadio] = useState({
    pending: true,
    completed: false,
  });

  //filter
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

  const draftFeedback = (selectedNote): void => {
    navigate(paramsReplacer(`/${Page.GIVE_NEW_FEEDBACK}`, { ':uuid': selectedNote.uuid }));
  };

  return (
    <>
      <div data-test-id={RESPOND_FEEDBACK_CONTAINER}>
        <div className={css(headerStyled)}>
          <RadioBtns
            checkedRadio={checkedRadio}
            setCheckedRadio={setCheckedRadio}
            focus={focus}
            setFocus={setFocus}
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            setFilterFeedbacks={setFilterFeedbacks}
          />
          <div className={css(FlexStyled)}>
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
        <div className={css(DraftsStyle)}>
          <DraftItem
            draftFeedback={draftFeedback}
            checkedRadio={checkedRadio}
            searchValue={searchValueFilterOption}
            focus={focus}
            setFocus={setFocus}
            filterModal={filterModal}
            setFilterModal={setFilterModal}
            setFilterFeedbacks={setFilterFeedbacks}
            filterFeedbacks={filterFeedbacks}
          />
        </div>
      </div>
    </>
  );
};

const FlexStyled: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    alignItems: 'center',
    ...(mobileScreen && { flexBasis: '250px' }),
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

const DraftsStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

export default RespondFeedbackContainer;
