import React, { FC, useState } from 'react';
import { Rule, Styles, useStyle, CreateRule } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { reviewsMetaSelector, schemaMetaSelector, timelineTypesAvailabilitySelector, colleagueInfo } from '@pma/store';
import { useSelector } from 'react-redux';

import { YearSwitch } from 'components/YearSwitch';
import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { ObjectiveTypes as OT } from 'features/general/Objectives';
import { Trans } from 'components/Translation';
import { Backward } from 'components/Backward';
import { useUserObjectivesData } from 'features/general/UserObjectives/hooks';
import { UserObjectivesSections } from 'features/general/UserObjectivesSections';
import { useFetchColleague } from 'features/general/RatingsTiles/hooks/useFetchColleague';

import { ReviewType } from 'config/enum';
import { getCurrentYear } from 'utils/date';

const ObjectiveRatings = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const navigate = useNavigate();

  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { uuid } = useParams<{ uuid: string }>();
  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { firstName, lastName, businessType, managerSirName, managerName, job, department } =
    useSelector(colleagueInfo);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  useFetchColleague(uuid);
  useUserObjectivesData(uuid, reviewLoaded, schemaLoaded, setObjectives);

  const handleChange = (/*year*/) => {
    //TODO: dispatch(...)
  };

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        <ProfileTileWrapper
          user={{ fullName: `${firstName} ${lastName}`, job: `${job} ${department}` }}
          customStyle={widthStyles({ mobileScreen })}
        >
          <AdditionalInfo manager={`${managerName} ${managerSirName}`} businessType={businessType} />
        </ProfileTileWrapper>
      </div>
      <YearSwitch currentYear={getCurrentYear()} onChange={handleChange} />
      <div className={css(widthStyles({ mobileScreen }))}>
        <UserObjectivesSections
          canShowObjectives={canShowObjectives}
          reviewLoading={reviewLoading}
          objectives={objectives}
          reviewLoaded={reviewLoaded}
        />
      </div>
    </>
  );
};

export const AdditionalInfo: FC<{ manager: string; businessType?: string }> = ({ manager, businessType = '' }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <div className={css(additionalInfo)}>
        <h2>
          <Trans i18nKey={'line_manager'}>Line manager</Trans>
        </h2>
        <p>{manager}</p>
      </div>
      {businessType && (
        <div className={css(additionalInfo, { marginLeft: '30px' })}>
          <h2>
            <Trans i18nKey={'function'}>Function</Trans>
          </h2>
          <p>{businessType}</p>
        </div>
      )}
    </div>
  );
};

const widthStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  maxWidth: !mobileScreen ? '80%' : '100%',
});

const wrapperStyle: Rule = {
  display: 'inline-flex',
};

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
