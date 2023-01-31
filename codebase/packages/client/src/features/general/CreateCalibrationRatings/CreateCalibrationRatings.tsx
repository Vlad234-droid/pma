import React, { FC, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationReviewAction, getColleagueSelector, getFormByCode } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import RatingForm from './components/RatingForm';
import Colleague from 'components/Colleague';
import { SuccessMark } from 'components/Icon';
import { Mode, Status } from 'config/types';
import { buildData, STANDARD_CALIBRATION_FORM_CODE } from './utils';
import { useCalibrationReview, useColleague, usePermissions } from './hooks';
import { Profile } from 'config/entities/User';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export enum Statuses {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

const CreateCalibrationRatings: FC = () => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();
  const [currentStatus, setCurrentStatus] = useState('');
  const [successTitle, setSuccessTitle] = useState('');
  const { userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    userUuid: string;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { backPath, activeList, prevBackPath, period, filters } = (state as any) || {};

  const { profile } = useSelector(getColleagueSelector(colleagueUuid)) || {};

  const { components } = useSelector(getFormByCode(STANDARD_CALIBRATION_FORM_CODE)) || {};

  const { loading, loaded, updated, calibrationReview } = useCalibrationReview();
  const { loading: colleagueLoading } = useColleague();
  const { isNew, isDraft, readOnly, sessionMode, editablePPSession, sessionModeCreate } = usePermissions();

  const handleSave = (values: any) => {
    const data = {
      ...values,
    };
    setCurrentStatus(data.status);
    setSuccessTitle(() => t('submit_calibration_ratings', 'Submit calibration ratings'));
    dispatch(CalibrationReviewAction.saveCalibrationReview(buildData(data, colleagueUuid)));
  };

  const handleUpdate = (values) => {
    const data = {
      ...values,
    };

    if (sessionMode && editablePPSession) {
      const status = calibrationReview?.status;
      if (status === Status.WAITING_FOR_COMPLETION) {
        data.status = Status.WAITING_FOR_COMPLETION;
      } else {
        const isFormChanged = !Object.entries(calibrationReview?.properties)?.every(
          ([key, value]) => data?.[key] === value,
        );

        data.status = status === Status.APPROVED && isFormChanged ? Status.WAITING_FOR_COMPLETION : Status.APPROVED;
      }
    }
    setCurrentStatus(data.status);
    setSuccessTitle(() =>
      isDraft && data.status === Status.WAITING_FOR_APPROVAL
        ? t('submit_calibration_ratings', 'Submit calibration ratings')
        : t('calibration_ratings', 'Calibration ratings'),
    );
    dispatch(CalibrationReviewAction.updateCalibrationReview(buildData(data, colleagueUuid)));
  };

  const handleBack = () =>
    navigate(backPath || buildPath(paramsReplacer(Page.USER_REVIEWS, { ':uuid': colleagueUuid as string })), {
      state: { activeList, backPath: prevBackPath, period, filters },
    });

  if (!components || loading || colleagueLoading) return null;

  if (!loading && updated) {
    if (currentStatus === Status.DRAFT) {
      handleBack();
      return null;
    }
    return (
      <SuccessModal
        customButtonStyles={{ background: theme.colors.tescoBlue, color: theme.colors.white }}
        onClose={handleBack}
        title={successTitle}
        description={t(
          'you_have_submitted_your_colleague_final_ratings',
          'You have submitted your colleague’ final ratings.',
        )}
        additionalText={t(
          'any_changes_agreed_in_calibration_will_be_saved_here',
          'Any changes agreed in calibration will be saved here.',
        )}
        mark={<SuccessMark />}
      />
    );
  }

  if (!isNew && loaded && !calibrationReview?.properties) {
    navigate(
      {
        pathname: buildPath(
          paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':uuid': 'new', ':userUuid': colleagueUuid }),
        ),
        search: sessionMode ? new URLSearchParams({ sessionMode }).toString() : '',
      },
      { replace: true, state: { backPath, prevBackPath, activeList, period, filters } },
    );
  }

  return (
    <WrapperModal
      onClose={handleBack}
      title={
        isDraft
          ? t('submit_calibration_ratings')
          : readOnly
          ? t('calibration_ratings', 'Calibration ratings')
          : t('edit_calibration_ratings')
      }
    >
      <div className={css(ratingWrapper)}>
        {isDraft && (
          <p>
            <Trans i18nKey={'ratings_to_change_in_calibration_until_they_confirmed'}>
              Ratings are subject to change in calibration and should not be communicated to colleagues until they are
              confirmed.
            </Trans>
          </p>
        )}
        <Colleague profile={profile as Profile} />
        <RatingForm
          onSubmit={isNew ? handleSave : handleUpdate}
          onCancel={handleBack}
          components={components}
          defaultValues={!isNew ? calibrationReview?.properties : {}}
          mode={isDraft && !sessionModeCreate ? Mode.CREATE : Mode.UPDATE}
          readOnly={readOnly}
        />
      </div>
    </WrapperModal>
  );
};

const ratingWrapper: Rule = {
  padding: '10px 40px',
  height: '100%',
  overflow: 'auto',
};

export default CreateCalibrationRatings;
