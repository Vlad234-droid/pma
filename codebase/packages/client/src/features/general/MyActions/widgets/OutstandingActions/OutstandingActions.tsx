import React, { FC } from 'react';

import { useTranslation } from 'components/Translation';
import { useSelector } from 'react-redux';
import { getOutstandingPendingEmployees } from '@pma/store';
import { useAuthContainer } from 'contexts/authContext';
import { ActionNotification } from '../../components/ActionNotification';

const OutstandingActions: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContainer();
  const {
    employeeOverdueMYR,
    employeeOverdueEYR,
    employeeOverdueObjectives,
    employeeObjectivesWaiting,
    employeeOverdueAnniversary,
  } = useSelector(getOutstandingPendingEmployees);

  return (
    <>
      {employeeOverdueObjectives.length !== 0 && (
        <ActionNotification
          text={t('colleague_not_completed_objectives', 'Your colleague(s) has/have not completed their objectives.')}
        />
      )}
      {employeeOverdueEYR.length !== 0 && (
        <ActionNotification
          text={t('colleague_not_completed_EYR', 'Your colleague(s) has/have not completed their year-end review.')}
        />
      )}
      {employeeOverdueMYR.length !== 0 && (
        <ActionNotification
          text={t('colleague_not_completed_MYR', 'Your colleague(s) has/have not completed their mid-year review.')}
        />
      )}
      {employeeOverdueAnniversary.length !== 0 && (
        <ActionNotification
          text={t(
            'colleague_not_completed_ANNIVERSARY',
            'Your colleague(s) has/have not completed their anniversary review.',
          )}
        />
      )}
      {employeeObjectivesWaiting.length !== 0 && (
        <ActionNotification
          text={t(
            'colleague_not_completed_MYR',
            `${user?.fullName}, your colleague(s) has/have objectives which are still pending your approval. Please review them and respond as soon as possible as the period of approval has now passed.`,
          )}
        />
      )}
    </>
  );
};

export default OutstandingActions;
