import React, { useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsWithStatuses, ReviewsActions, reviewsMetaSelector, SchemaActions } from '@pma/store';
import { useParams } from 'react-router-dom';

import Spinner from 'components/Spinner';
import { Backward } from 'components/Backward';
import { YearSwitch } from 'components/YearSwitch';
import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { AdditionalInfo } from 'features/ObjectiveRatings/ObjectiveRatings';
import { Section } from 'features/Objectives';
import { IconButton } from 'components/IconButton';
import { Trans, useTranslation } from 'components/Translation';
import { Accordion } from './components';
import { getCurrentYear } from 'utils';
import { Plug } from 'components/Plug';

const PreviousReviewForms = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { loading, loaded } = useSelector(reviewsMetaSelector);
  const reviews = useSelector(getReviewsWithStatuses);

  const [year, setYear] = useState<number>(Number(getCurrentYear()));

  useEffect(() => {
    if (uuid) {
      dispatch(ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: uuid, cycleUuid: 'CURRENT' } }));
      dispatch(SchemaActions.getSchema({ colleagueUuid: uuid }));
    }
  }, [uuid]);

  const handleChange = (year) => {
    setYear(year);
    // TODO: dispatch(...)
  };

  const user = {
    fullName: 'Ron Rogers',
    job: 'Grocery',
    manager: 'Justin Thomas',
  };

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        <ProfileTileWrapper user={user} customStyle={widthStyles({ mobileScreen })}>
          <AdditionalInfo manager={user.manager} />
        </ProfileTileWrapper>
      </div>
      <YearSwitch
        currentYear={getCurrentYear()}
        onChange={(year) => {
          handleChange(year);
        }}
      />
      {loading ? (
        <Spinner fullHeight />
      ) : loaded && !reviews.length ? (
        <Plug text={t('review_not_completed', 'Review not completed')} customStyle={widthStyles({ mobileScreen })} />
      ) : (
        <Section
          left={{
            content: <div className={css(tileStyles)}>{t('review_forms_for', 'Review forms for', { year })}</div>,
          }}
          right={{
            content: (
              <div>
                <IconButton
                  onPress={() => alert('download')}
                  graphic='download'
                  customVariantRules={{ default: iconButtonStyles }}
                  iconStyles={iconStyles}
                >
                  <Trans data-test-id={'test-download-btn'} i18nKey='download'>
                    Download
                  </Trans>
                </IconButton>
              </div>
            ),
          }}
        >
          <Accordion />
        </Section>
      )}
    </>
  );
};

const widthStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  maxWidth: !mobileScreen ? '80%' : '100%',
});

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};
const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});
const iconStyles: Rule = {
  marginRight: '10px',
};

export default PreviousReviewForms;
