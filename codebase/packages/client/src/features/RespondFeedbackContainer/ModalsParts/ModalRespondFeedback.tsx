import React, { FC } from 'react';
import { useStyle, useBreakpoints } from '@dex-ddl/core';
import { ModalGiveFeedbackProps } from '../type';
import { SuccessModal, SubmitPart, InfoModal } from './index';
import { IconButton } from 'components/IconButton';

const ModalRespondFeedback: FC<ModalGiveFeedbackProps> = ({
  setIsOpen,
  setSelectedPerson,
  selectedPerson,
  infoModal,
  setInfoModal,
  modalSuccess,
  setModalSuccess,
  feedbackItems,
  setFeedbackItems,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const switchClose = (): void => {
    setSelectedPerson(() => null);
    setIsOpen(() => false);
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
        <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
          How is the colleague performing?
        </div>
        <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
          Your colleague has requested feedback, fill out the comment boxes against each question to provide your
          feedback
        </div>
        {selectedPerson && (
          <SubmitPart
            selectedPerson={selectedPerson}
            setInfoModal={setInfoModal}
            setModalSuccess={setModalSuccess}
            feedbackItems={feedbackItems}
            setIsOpen={setIsOpen}
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

export default ModalRespondFeedback;
