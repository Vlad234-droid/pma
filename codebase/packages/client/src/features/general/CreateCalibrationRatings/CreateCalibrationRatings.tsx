import React, { FC, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Icon, Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationReviewAction, getColleagueSelector, getFormByCode } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import RatingForm from './components/RatingForm';
import User from 'components/User';
import { SuccessMark } from 'components/Icon';
import { Mode, Status } from 'config/types';
import { buildData } from './utils';
import { useCalibrationReview, useColleague, usePermissions } from './hooks';
import { Profile } from 'config/entities/User';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export enum Statuses {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

const STANDARD_CALIBRATION_FORM_CODE = 'forms/standard_calibration.form';

const CreateCalibrationRatings: FC = () => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();
  const [currentStatus, setCurrentStatus] = useState('');
  const { userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    userUuid: string;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { backPath } = (state as any) || {};

  const { profile } = useSelector(getColleagueSelector) || {};

  const { components } = useSelector(getFormByCode(STANDARD_CALIBRATION_FORM_CODE)) || {};

  const { loading, loaded, updated, calibrationReview } = useCalibrationReview();
  const { loading: colleagueLoading } = useColleague();
  const { isNew, isDraft, readOnly, sessionMode, editablePPSession } = usePermissions();

  const handleSave = (data: any) => {
    setCurrentStatus(data.status);
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
    dispatch(CalibrationReviewAction.updateCalibrationReview(buildData(data, colleagueUuid)));
  };

  const handleBack = () =>
    navigate(backPath || paramsReplacer(buildPath(Page.USER_REVIEWS), { ':uuid': colleagueUuid as string }));

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
        title={t('submit_calibration_ratings', 'Submit Calibration Ratings')}
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

  if (!isNew && loaded && !calibrationReview?.properties)
    navigate(
      buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':uuid': 'new', ':userUuid': colleagueUuid })),
      {
        replace: true,
        state: {
          backPath,
        },
      },
    );

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
          <>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <Icon graphic='information' />
              <span className={css(helpTitleStyle)}>
                <Trans i18nKey={'guidance_how_to_use_page'}>Guidance on how to use this page</Trans>
              </span>
            </div>
            <p>
              <Trans i18nKey={'ratings_to_change_in_calibration_until_they_confirmed'}>
                Ratings are subject to change in calibration and should not be communicated to colleagues until they are
                confirmed.
              </Trans>
            </p>
          </>
        )}
        <User user={profile as Profile} />
        <RatingForm
          onSubmit={isNew ? handleSave : handleUpdate}
          onCancel={handleBack}
          components={components}
          defaultValues={!isNew ? calibrationReview?.properties : {}}
          mode={isDraft ? Mode.CREATE : Mode.UPDATE}
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

const helpTitleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});

export default CreateCalibrationRatings;
