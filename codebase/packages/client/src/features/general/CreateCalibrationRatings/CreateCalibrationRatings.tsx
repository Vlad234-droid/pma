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
import AvatarName from 'components/AvatarName';
import { SuccessMark } from 'components/Icon';
import { Mode, Status } from 'config/types';
import { buildData } from './utils';
import { useCalibrationReview, useColleague, usePermissions } from './hooks';
import User from 'config/entities/User';
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
  useColleague();
  const { isNew, isDraft, readOnly } = usePermissions();

  if (!components) return null;

  const handleSave = (data: any) => {
    setCurrentStatus(data.status);
    dispatch(CalibrationReviewAction.saveCalibrationReview(buildData(data, colleagueUuid)));
  };

  const handleUpdate = (data) => {
    setCurrentStatus(data.status);
    dispatch(CalibrationReviewAction.updateCalibrationReview(buildData(data, colleagueUuid)));
  };

  const handleBack = () =>
    navigate(backPath || paramsReplacer(buildPath(Page.USER_REVIEWS), { ':uuid': colleagueUuid as string }));

  if (loading) return null;

  if (!loading && updated) {
    if (currentStatus === Status.DRAFT) {
      handleBack();
      return null;
    }
    return (
      <SuccessModal
        customButtonStyles={{ background: theme.colors.tescoBlue, color: theme.colors.white }}
        onClose={handleBack}
        title={t('calibration_ratings')}
        description={t('you_have_submitted_your_colleague_final_ratings')}
        additionalText={t('any_changes_agreed_in_calibration_will_be_saved_here')}
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
          ? t('view_calibration_ratings', 'View Calibration Ratings')
          : t('edit_calibration_ratings')
      }
    >
      <div className={css(ratingWrapper)}>
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
        <AvatarName user={profile as User} />
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
