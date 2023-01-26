import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { CalibrationReviewAction, getColleagueSelector, getFormByCode } from '@pma/store';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import SuccessModal from 'components/SuccessModal';
import RatingForm from './components/RatingForm';
import { SuccessMark } from 'components/Icon';
import Colleague from 'components/Colleague';

import { useCalibrationReview, useCalibrationSession, useColleague } from './hooks';
import useDispatch from 'hooks/useDispatch';

import { buildData, STANDARD_CALIBRATION_FORM_CODE } from './utils';
import { paramsReplacer } from 'utils';
import { Profile } from 'config/entities/User';
import { Mode, Status } from 'config/types';
import { Page } from 'pages';

const CreateCalibrationSessionRating = () => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();

  const { userUuid: colleagueUuid, sessionUuid } = useParams<{ sessionUuid: string; userUuid: string }>() as {
    userUuid: string;
    sessionUuid: string;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { backPath, activeList } = (state as any) || {};
  const { profile } = useSelector(getColleagueSelector(colleagueUuid)) || {};

  const { components } = useSelector(getFormByCode(STANDARD_CALIBRATION_FORM_CODE)) || {};

  const { loading, updated, calibrationReview } = useCalibrationReview();
  const { loading: colleagueLoading } = useColleague();
  const { csLoading, isStarted } = useCalibrationSession();

  const handleBack = () =>
    navigate(backPath || paramsReplacer(buildPath(Page.CALIBRATION_SESSION), { ':uuid': sessionUuid as string }), {
      state: { activeList },
    });

  const handleSave = (values: any) => {
    const data = {
      ...values,
    };
    data.status = isStarted ? Status.APPROVED : Status.WAITING_FOR_APPROVAL;
    dispatch(CalibrationReviewAction.saveCalibrationSessionReview({ ...buildData(data, colleagueUuid), sessionUuid }));
  };

  if (!components || loading || colleagueLoading || csLoading) return null;

  if (!loading && updated) {
    return (
      <SuccessModal
        customButtonStyles={{ background: theme.colors.tescoBlue, color: theme.colors.white }}
        onClose={handleBack}
        title={t('submit_calibration_ratings', 'Submit calibration ratings')}
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
  return (
    <WrapperModal onClose={handleBack} title={t('submit_calibration_ratings')}>
      <div className={css(ratingWrapper)}>
        <p>
          <Trans i18nKey={'ratings_to_change_in_calibration_until_they_confirmed'}>
            Ratings are subject to change in calibration and should not be communicated to colleagues until they are
            confirmed.
          </Trans>
        </p>
        <Colleague profile={profile as Profile} />
        <RatingForm
          onSubmit={handleSave}
          onCancel={handleBack}
          components={components}
          defaultValues={calibrationReview?.properties || {}}
          mode={Mode.UPDATE}
          readOnly={false}
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

export default CreateCalibrationSessionRating;
