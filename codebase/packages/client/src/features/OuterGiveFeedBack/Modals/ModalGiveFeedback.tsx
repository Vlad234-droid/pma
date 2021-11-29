import React, { FC } from 'react';
import { useBreakpoints, useStyle } from '@dex-ddl/core';
import { ModalGiveFeedbackProps } from '../type';
import { InfoModal, SearchPart, SubmitPart, SuccessModal } from './index';
import { IconButton } from 'components/IconButton';
//import { SubmitButton } from '../../../features/Objectives/components/Modal/index';
import { getFindedColleguesS, ColleaguesActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';

const ModalGiveFeedback: FC<ModalGiveFeedbackProps> = ({
  setIsOpen,
  setSelectedPerson,
  selectedPerson,
  infoModal,
  setInfoModal,
  modalSuccess,
  setModalSuccess,
  searchValue,
  setSearchValue,
  feedbackItemsS,
  methods,
  setFeedbackItems,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const findedColleagues = useSelector(getFindedColleguesS) || [];

  const dispatch = useDispatch();

  const switchClose = (): void => {
    if (findedColleagues.length) {
      dispatch(ColleaguesActions.clearGettedCollegues());
    }
    setFeedbackItems(() => []);
    if (selectedPerson !== null) {
      setSelectedPerson(() => null);
    } else {
      setIsOpen(() => false);
    }
  };

  if (modalSuccess)
    return (
      <SuccessModal
        setModalSuccess={setModalSuccess}
        selectedPerson={selectedPerson}
        setIsOpen={setIsOpen}
        setSelectedPerson={setSelectedPerson}
        setFeedbackItems={setFeedbackItems}
      />
    );

  if (infoModal) return <InfoModal setInfoModal={setInfoModal} />;

  return (
    <>
      <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '28px',
            ...(mobileScreen && { textAlign: 'center' }),
          })}
        >
          Let a colleague know how they are doing
        </div>
        <div
          className={css({
            marginTop: '8px',
            fontSize: '18px',
            lineHeight: '22px',
            ...(mobileScreen && { textAlign: 'center' }),
          })}
        >
          Select which colleague you want to provide feedback for.
        </div>
        <SearchPart
          setSelectedPerson={setSelectedPerson}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          selectedPerson={selectedPerson}
        />
        {selectedPerson && (
          <SubmitPart
            selectedPerson={selectedPerson}
            setInfoModal={setInfoModal}
            setModalSuccess={setModalSuccess}
            setIsOpen={setIsOpen}
            methods={methods}
            feedbackItemsS={feedbackItemsS}
            setFeedbackItems={setFeedbackItems}
            setSelectedPerson={setSelectedPerson}
          />
        )}
        <span
          className={css({
            position: 'fixed',
            top: theme.spacing.s5,
            left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IconButton graphic='arrowLeft' onPress={() => switchClose()} iconProps={{ invertColors: true }} />
        </span>
      </div>
    </>
  );
};

export default ModalGiveFeedback;
