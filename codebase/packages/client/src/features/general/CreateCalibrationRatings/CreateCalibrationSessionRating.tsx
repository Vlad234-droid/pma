import React from 'react';
import { Icon, Rule, useStyle } from '@pma/dex-wrapper';
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
import User from 'components/User';

import { useCalibrationReview, useColleague } from './hooks';
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
  const { profile } = useSelector(getColleagueSelector) || {};

  const { components } = useSelector(getFormByCode(STANDARD_CALIBRATION_FORM_CODE)) || {};

  const { loading, updated } = useCalibrationReview();
  const { loading: colleagueLoading } = useColleague();

  const handleBack = () =>
    navigate(backPath || paramsReplacer(buildPath(Page.CALIBRATION_SESSION), { ':uuid': sessionUuid as string }), {
      state: { activeList },
    });

  const handleSave = (values: any) => {
    const data = {
      ...values,
    };
    data.status = Status.APPROVED;
    dispatch(CalibrationReviewAction.saveCalibrationSessionReview({ ...buildData(data, colleagueUuid), sessionUuid }));
  };

  if (!components || loading || colleagueLoading) return null;

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
        <User user={profile as Profile} />
        <RatingForm
          onSubmit={handleSave}
          onCancel={handleBack}
          components={components}
          defaultValues={{}}
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

const helpTitleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});

export default CreateCalibrationSessionRating;
