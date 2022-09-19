import React, { FC, useState } from 'react';
import { Status } from 'config/enum';
import { Icon, SuccessMark } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { ConfirmModal } from 'components/ConfirmModal';
import SuccessModal from 'components/SuccessModal';

export const CompletePriority: FC<{
  status: Status;
  number: number;
  handleCompletion: (T) => void;
}> = ({ status, number, handleCompletion }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const enabledButton = [Status.APPROVED].includes(status);
  const handleOpen = () => {
    if (enabledButton) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    handleCompletion(number);
  };

  return (
    <div>
      {status === Status.COMPLETED ? (
        <div className={css(buttonLikeStyle({ disabled: false }))}>
          <Icon graphic='roundTick' title={'check'} size={'24px'} />
          <span className={css({ paddingLeft: '10px' })}>
            <Trans i18nKey={'completed'}>Completed</Trans>
          </span>
        </div>
      ) : (
        <div className={css(buttonLikeStyle({ disabled: !enabledButton }))} onClick={handleOpen}>
          <span className={css(iconCircleStyles)}>
            <Icon graphic='check' title={'check'} size={'14px'} />
          </span>
          <span className={css({ paddingLeft: '10px' })}>
            <Trans i18nKey={'have_completed_priority'}>I have completed this priority</Trans>
          </span>
        </div>
      )}

      {isOpen && (
        <ConfirmModal
          title={t(
            'confirm_question_complete_priorities',
            'Are you sure you have completed all the steps of this priority? Your manager will be notified of this priority completion.',
          )}
          onSave={() => {
            handleSave();
            setOpen(false);
            setOpenModal(true);
          }}
          submitBtnTitle={<Trans i18nKey='complete'>Complete</Trans>}
          onCancel={() => setOpen(false)}
          onOverlayClick={() => setOpen(false)}
        />
      )}
      {isOpenModal && (
        <SuccessModal
          title={t('quarterly_priority', 'Quarterly priority')}
          onClose={() => setOpenModal(false)}
          description={t('priority_completed', 'Your Line Manager will now review your completed priority')}
          mark={<SuccessMark />}
        />
      )}
    </div>
  );
};

const buttonLikeStyle: CreateRule<{ disabled: boolean }> =
  ({ disabled }) =>
  ({ theme }) => ({
    display: 'flex',
    cursor: disabled ? 'unset' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    color: theme.colors.tescoBlue,
    alignItems: 'center',
  });

const iconCircleStyles: Rule = ({ theme }) => ({
  border: `solid 1px ${theme.colors.tescoBlue}`,
  borderRadius: '14px',
  padding: '4px',
});
