import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon, Rule, useStyle } from '@pma/dex-wrapper';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  ColleagueActions,
  getColleagueMetaSelector,
  getColleagueSelector,
  getFormByCode,
  SchemaActions,
} from '@pma/store';

import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { Trans, useTranslation } from 'components/Translation';
import AvatarName from 'components/AvatarName';
import { SuccessMark } from 'components/Icon';
import useDispatch from 'hooks/useDispatch';
import RatingForm from './components/RatingForm';
import SuccessModal from 'components/SuccessModal';
import User from 'config/entities/User';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import { Mode, Status } from 'config/types';

export enum Statuses {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

const STANDARD_CALIBRATION_FORM_CODE = 'forms/standard_calibration.form';

const CreateCalibrationRatings: FC = () => {
  const { uuid, userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    uuid: string;
    userUuid: string;
  };
  const { profile } = useSelector(getColleagueSelector) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { components } = useSelector(getFormByCode(STANDARD_CALIBRATION_FORM_CODE)) || {};
  const { loading, loaded, updated } = useSelector(calibrationReviewMetaSelector);
  const calibrationReview = useSelector(calibrationReviewDataSelector(colleagueUuid)) || {};
  const { t } = useTranslation();
  const { css, theme } = useStyle();

  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector);

  useEffect(() => {
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid }));
  }, [colleagueUuid, colleagueLoaded]);

  const isNew = uuid === 'new';

  useEffect(() => {
    if (!isNew) {
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: 'CURRENT' }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, []);

  if (!components) return null;

  const handleBack = () => {
    navigate(paramsReplacer(buildPath(Page.USER_REVIEWS), { ':uuid': colleagueUuid as string }));
  };

  const buildData = (data: any) => {
    const { status, ...properties } = data;
    return {
      data: {
        number: 1,
        properties,
        lastUpdatedTime: new Date(),
        colleagueUuid,
        status,
      },
      colleagueUuid,
      cycleUuid: 'CURRENT',
    };
  };

  const handleSave = (data: any) => {
    dispatch(CalibrationReviewAction.saveCalibrationReview(buildData(data)));
  };

  const handleUpdate = (data) => {
    dispatch(CalibrationReviewAction.updateCalibrationReview(buildData(data)));
  };

  const { properties, status } = calibrationReview;

  if ([Status.WAITING_FOR_APPROVAL, Status.APPROVED].includes(status)) {
    handleBack();
    return null;
  }

  if (loading) return null;

  if (!loading && updated)
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

  if (!isNew && loaded && !calibrationReview?.properties) {
    navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':uuid': 'new' })), { replace: true });
  }

  return (
    <WrapperModal onClose={handleBack} title={isNew ? t('submit_calibration_ratings') : t('edit_calibration_ratings')}>
      <div className={css(ratingWrapper)}>
        <div className={css({ display: 'flex', alignItems: 'center' })}>
          <Icon graphic='information' />
          <span className={css(helpTitleStyle)}>
            <Trans i18nKey={'guidence_how_to_use_page'}>Guidence on how to use this page</Trans>
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
          defaultValues={!isNew ? properties : {}}
          mode={isNew ? Mode.CREATE : Mode.UPDATE}
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
