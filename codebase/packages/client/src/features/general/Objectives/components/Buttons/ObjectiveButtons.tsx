import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  getReviewSchema,
  currentUserSelector,
  ReviewsActions,
  getTimelineByCodeSelector,
  colleagueUUIDSelector,
  colleagueCurrentCycleSelector,
} from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import { USER } from 'config/constants';
import { ButtonWithConfirmation } from 'features/general/Modal';
import { canEditSingleObjectiveFn, canDeleteSingleObjectiveFn } from '../../utils';
import EditButton from './EditButton';

export type ObjectiveButtonsProps = {
  id: number;
  status: Status;
};

const ObjectiveButtons: FC<ObjectiveButtonsProps> = ({ id, status }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const { info } = useSelector(currentUserSelector);

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current, currentCycle));
  const countDraftReviews = parseInt(timelineObjective?.statistics?.[Status.DRAFT] || '0');
  const countDeclinedReviews = parseInt(timelineObjective?.statistics?.[Status.DECLINED] || '0');
  const countApprovedReviews = parseInt(timelineObjective?.statistics?.[Status.APPROVED] || '0');

  const canEditSingleObjective = canEditSingleObjectiveFn({ status, objectiveSchema, number: id });
  const canDelete = canDeleteSingleObjectiveFn({
    status,
    objectiveSchema,
    countDraftReviews,
    countDeclinedReviews,
    countApprovedReviews,
  });

  const handleRemove = () => {
    dispatch(
      ReviewsActions.deleteReview({
        pathParams: { colleagueUuid: info.colleagueUUID, code: 'OBJECTIVE', cycleUuid: 'CURRENT', number: id },
      }),
    );
  };

  return (
    <div className={css(WrapperStyle)}>
      {canEditSingleObjective && (
        <EditButton buttonText={t('edit', 'Edit')} editNumber={id} icon={'edit'} styles={buttonStyle} />
      )}
      {canDelete && (
        <ButtonWithConfirmation
          onSave={handleRemove}
          withIcon={true}
          buttonName={t('delete', 'Delete')}
          confirmationButtonTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
          confirmationTitle={t('objective_number', `Objective ${id}`, { number: id })}
          confirmationDescription={t('delete_objective_confirmation', 'Are you sure you want to delete objective?')}
          styles={[buttonStyle]}
        />
      )}
    </div>
  );
};
const WrapperStyle: Rule = ({ theme }) => ({ paddingBottom: theme.spacing.s5 });

const buttonStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  paddingRight: theme.spacing.s5,
  '& svg': {
    height: theme.spacing.s3_5,
    width: theme.spacing.s3_5,
    marginRight: theme.spacing.s2_5,
  },
});

export default ObjectiveButtons;
