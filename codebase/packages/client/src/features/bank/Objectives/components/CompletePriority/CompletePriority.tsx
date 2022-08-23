import React, { FC, useState } from 'react';
import { Status } from 'config/enum';
import { Icon, SuccessMark } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, CreateRule, useStyle } from '@pma/dex-wrapper';

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
  const disabledButton = [Status.DRAFT].includes(status);
  const handleOpen = () => {
    if (!disabledButton) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    handleCompletion(number);
  };

  return (
    <div>
      {status === Status.APPROVED && (
        <div className={css(buttonLikeStyle({ disabled: disabledButton }))} onClick={handleOpen}>
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
          title={'Are you sure ?'}
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
    cursor: 'pointer',
    opacity: disabled ? 0.4 : 1,
    color: theme.colors.tescoBlue,
  });

const iconCircleStyles: Rule = ({ theme }) => ({
  border: `solid 1px ${theme.colors.tescoBlue}`,
  borderRadius: '14px',
  padding: '4px',
});
