import React, { FC } from 'react';
import { useStyle, useBreakpoints } from '@dex-ddl/core';

import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';

import { ModalGiveFeedbackProps } from '../type';
import { SuccessModal, SubmitPart, InfoModal } from './index';

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
          <Trans i18nKey='how_is_the_colleague_performing'>How is the colleague performing?</Trans>
        </div>
        <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
          <Trans i18nKey='colleague_requested_feedback'>
            This colleague has requested feedback from you. Fill out the questions below to share your feedback.
          </Trans>
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
