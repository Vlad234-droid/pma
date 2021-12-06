import React, { FC, useState, useEffect } from 'react';
import { Modal, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';

import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';
import { PeopleTypes, TypefeedbackItems } from './type';
import { ModalRespondFeedback } from './ModalsParts';
import { DraftItem } from './components';
import { RadioBtns } from './components';
import { FilterModal } from '../Shared/components/FilterModal';

export const RESPOND_FEEDBACK_CONTAINER = 'respond_feedback_container';

const RespondFeedbackContainer: FC = () => {
  const { css } = useStyle();

  const [isOpenMainModal, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [feedbackItems, setFeedbackItems] = useState<TypefeedbackItems[] | []>([]);

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
    if (selectedNote.feedbackItems) {
      setFeedbackItems(() => selectedNote.feedbackItems);
    }
    setSearchValue(
      () =>
        `${selectedNote.targetColleagueProfile?.colleague?.profile?.firstName} ${selectedNote.targetColleagueProfile?.colleague?.profile?.lastName}`,
    );
    setTitle(() => 'Respond to feedback requests');
    setSelectedPerson(() => ({
      ...selectedNote.targetColleagueProfile.colleague,
      targetId: selectedNote?.targetId,
      targetType: selectedNote?.targetType,
      uuid: selectedNote.uuid,
    }));
    setIsOpen(() => true);
  };
  return (
    <>
      <div data-test-id={RESPOND_FEEDBACK_CONTAINER}>
        <div className={css(header_styled)}>
          <RadioBtns
            checkedRadio={checkedRadio}
            setCheckedRadio={setCheckedRadio}
            focus={focus}
            setFocus={setFocus}
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            setFilterFeedbacks={setFilterFeedbacks}
          />
          <div className={css(Flex_styled)}>
            <IconButton graphic='information' iconStyles={iconStyle} />
            <FilterOption
              focus={focus}
              customIcon={true}
              searchValue={searchValueFilterOption}
              onFocus={() => setFocus(() => true)}
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
      {isOpenMainModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setModalSuccess(() => false);
              setSelectedPerson(() => null);
              setIsOpen(() => false);
              setInfoModal(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: title,
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            if (infoModal) setInfoModal(() => false);
            if (modalSuccess) setModalSuccess(() => false);
            setSelectedPerson(() => null);
            setIsOpen(() => false);
          }}
        >
          <ModalRespondFeedback
            setIsOpen={setIsOpen}
            isOpenMainModal={isOpenMainModal}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setFeedbackItems={setFeedbackItems}
            feedbackItems={feedbackItems}
          />
        </Modal>
      )}
    </>
  );
};

const Flex_styled: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    alignItems: 'center',
    ...(mobileScreen && { flexBasis: '250px' }),
    position: 'relative',
  };
};

const header_styled: Rule = () => {
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

const iconStyle: Rule = {
  marginRight: '10px',
};

const Drafts_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

//
const containerRule: Rule = ({ colors }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 84px' }
      : { borderRadius: '32px', padding: `40px 0 102px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
    overflow: 'auto',
  };
};

const modalCloseOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
        }),
  };
};

export default RespondFeedbackContainer;
