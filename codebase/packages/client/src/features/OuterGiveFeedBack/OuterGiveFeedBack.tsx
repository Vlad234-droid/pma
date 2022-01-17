import React, { FC, useState, useEffect } from 'react';
import { useStyle, useBreakpoints, Rule } from '@dex-ddl/core';
import { useNavigate } from 'react-router-dom';
import { FilterOption } from 'features/Shared';
import { PeopleTypes, TypefeedbackItems } from './type';
import { DraftItem, RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';
import { Page } from 'pages';

const OuterGiveFeedBack: FC = () => {
  const { css } = useStyle();
  const [isOpenMainModal, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  const [feedbackItemsS, setFeedbackItems] = useState<TypefeedbackItems[] | []>([]);

  const navigate = useNavigate();

  const [checkedRadio, setCheckedRadio] = useState({
    draft: true,
    submitted: false,
  });

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
    navigate(`/${Page.GIVE_NEW_FEEDBACK}`);
  };

  const draftFeedback = (selectedNote): void => {
    setFeedbackItems(() => selectedNote.feedbackItems);

    setSearchValue(
      () =>
        `${selectedNote.targetColleagueProfile?.colleague?.profile?.firstName} ${selectedNote.targetColleagueProfile?.colleague?.profile?.lastName}`,
    );
    setTitle(() => 'Give feedback');
    setSelectedPerson(() => {
      return {
        ...selectedNote.targetColleagueProfile.colleague,
        profileAttributes: selectedNote.targetColleagueProfile.profileAttributes,
        uuid: selectedNote.uuid,
      };
    });
    setIsOpen(() => true);
  };

  return (
    <>
      <div>
        <div className={css(headerStyled)}>
          <RadioBtns
            checkedRadio={checkedRadio}
            setCheckedRadio={setCheckedRadio}
            handleBtnClick={handleBtnClick}
            focus={focus}
            setFocus={setFocus}
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            setFilterFeedbacks={setFilterFeedbacks}
          />
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
              filterModal={filterModal}
              filterFeedbacks={filterFeedbacks}
              setFilterFeedbacks={setFilterFeedbacks}
              setFilterModal={setFilterModal}
            />
          </div>
        </div>
        <div className={css(Drafts_style)}>
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
