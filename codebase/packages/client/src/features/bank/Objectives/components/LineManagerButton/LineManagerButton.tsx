import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { Status } from 'config/enum';
import { useTranslation } from 'components/Translation';
import ButtonWithConfirmation from 'components/ButtonWithConfirmation';
import { ReviewAction } from '../../type';

export type Props = {
  onAction: (action: ReviewAction, status: Status, uuid?: string, number?: number) => void;
  status?: Status;
  number?: number;
  uuid?: string;
  isBulkUpdate?: boolean;
};

export const LineManagerButton: FC<Props> = ({ status, uuid, number, onAction, isBulkUpdate = false }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  if (status && ![Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION].includes(status)) {
    return null;
  }

  return (
    <>
      <div className={css(titleStyle)}>
        {isBulkUpdate
          ? t('LineManagerButton_priorities_agree_or_amend_plural_confirmation', { ns: 'bank' })
          : t('LineManagerButton_priorities_agree_or_amend_singular_confirmation', { number, ns: 'bank' })}
      </div>
      <div className={css({ display: 'flex' })}>
        <ButtonWithConfirmation
          withIcon
          onSave={() =>
            status
              ? onAction(ReviewAction.DECLINE, status, uuid)
              : onAction(ReviewAction.DECLINE, Status.WAITING_FOR_APPROVAL)
          }
          graphic={'cancel'}
          styles={iconButtonStyles({ disabled: false })}
          iconSize={16}
          buttonName={t('amend', 'Amend')}
          confirmationTitle={isBulkUpdate ? 'Ammends to priorities' : 'Amends to priority'}
          confirmationDescription={
            isBulkUpdate
              ? t('LineManagerButton_amend_confirmation_description_plural', { ns: 'bank' })
              : t('LineManagerButton_amend_confirmation_description_singular', { ns: 'bank' })
          }
          confirmationButtonTitle={t('amend', 'Amend')}
        />
        <ButtonWithConfirmation
          withIcon
          onSave={() =>
            status
              ? onAction(ReviewAction.APPROVE, status, uuid)
              : onAction(ReviewAction.APPROVE, Status.WAITING_FOR_APPROVAL)
          }
          graphic={'check'}
          styles={iconButtonStyles({ disabled: false, invertColors: true })}
          iconSize={16}
          iconProps={{ invertColors: true }}
          buttonName={t('agree', 'Agree')}
          confirmationTitle={isBulkUpdate ? 'Agree to priorities' : 'Agree to priority'}
          confirmationDescription={
            isBulkUpdate
              ? t('LineManagerButton_agree_confirmation_description_plural', { ns: 'bank' })
              : t('LineManagerButton_agree_confirmation_description_singular', { ns: 'bank' })
          }
          confirmationButtonTitle={t('agree', 'Agree')}
        />
      </div>
    </>
  );
};

const titleStyle: Rule = {
  lineHeight: '20px',
  fontSize: '16px',
  paddingTop: '20px',
  paddingBottom: '10px',
  fontWeight: 'bold',
};

const iconButtonStyles: CreateRule<{ disabled: boolean; invertColors?: boolean }> =
  ({ disabled = false, invertColors = false }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    height: '40px',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: invertColors ? `${theme.colors.tescoBlue}` : `${theme.colors.white}`,
    color: invertColors ? `${theme.colors.white}` : `${theme.colors.tescoBlue}`,
    justifyContent: 'space-between',
    padding: '0px 15px',
    opacity: disabled ? 0.4 : 1,
    borderRadius: '20px',
    border: `1px solid ${theme.colors.tescoBlue}`,
  });
