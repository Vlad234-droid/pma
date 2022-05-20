import React, { FC, useState } from 'react';
import { Rule, Styles, useStyle, CreateRule } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { reviewsMetaSelector, schemaMetaSelector, timelineTypesAvailabilitySelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { YearSwitch } from 'components/YearSwitch';
import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { ObjectiveTypes as OT } from 'features/Objectives';
import { Trans } from 'components/Translation';
import { Backward } from 'components/Backward';
import { useUserObjectivesData } from 'features/UserObjectives/hooks';
import { UserObjectivesSections } from 'features/UserObjectivesSections';

import { ObjectiveType } from 'config/enum';
import { getCurrentYear } from 'utils/date';

const ObjectiveRatings = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { uuid } = useParams<{ uuid: string }>();
  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];

  const navigate = useNavigate();

  const user = {
    fullName: 'Ron Rogers',
    job: 'Grocery',
    manager: 'Justin Thomas',
  };

  useUserObjectivesData(uuid, reviewLoaded, schemaLoaded, setObjectives);

  const handleChange = (year) => {
    //TODO: dispatch(...)
  };

  return (
    <>
      <YearSwitch
        currentYear={getCurrentYear()}
        onChange={(year) => {
          handleChange(year);
        }}
      />

      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        <ProfileTileWrapper user={user} customStyle={widthStyles({ mobileScreen })}>
          <AdditionalInfo manager={user.manager} />
        </ProfileTileWrapper>
      </div>
      <div className={css(widthStyles({ mobileScreen }))}>
        <UserObjectivesSections
          canShowObjectives={canShowObjectives}
          reviewLoading={reviewLoading}
          objectives={objectives}
        />
      </div>
    </>
  );
};

export const AdditionalInfo: FC<{ manager: string }> = ({ manager }) => {
  const { css } = useStyle();

  return (
    <div className={css(additionalInfo)}>
      <h2>
        <Trans i18nKey={'line_manager'}>Line manager</Trans>
      </h2>
      <p>{manager}</p>
    </div>
  );
};

const widthStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  maxWidth: !mobileScreen ? '80%' : '100%',
});

const additionalInfo: Rule = ({ theme }) =>
  ({
    '& > h2': {
      marginTop: 0,
      marginBottom: '8px',
      fontSize: theme.font.fixed.f20.fontSize,
      fontWeight: theme.font.weight.bold,
      color: theme.colors.base,
    },
    '& > p': {
      marginTop: 0,
      fontSize: theme.font.fixed.f16.fontSize,
      fontWeight: theme.font.weight.regular,
      color: theme.colors.base,
    },
  } as Styles);

export default ObjectiveRatings;
