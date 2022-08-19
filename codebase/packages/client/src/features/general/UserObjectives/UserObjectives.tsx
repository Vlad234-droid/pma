import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { reviewsMetaSelector, schemaMetaSelector, timelineTypesAvailabilitySelector } from '@pma/store';

import { ObjectiveTypes as OT } from 'features/general/Reviews';
import { UserObjectivesSections } from 'features/general/UserObjectivesSections';
import { ReviewType } from 'config/enum';
import { useUserObjectivesData } from './hooks';

export const TEST_ID = 'user-objectives-page';

const UserObjectives: FC = () => {
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { uuid } = useParams<{ uuid: string }>();

  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  useUserObjectivesData(uuid, reviewLoaded, schemaLoaded, setObjectives);

  return (
    <UserObjectivesSections
      canShowObjectives={canShowObjectives}
      reviewLoading={reviewLoading}
      objectives={objectives}
      reviewLoaded={true}
    />
  );
};

export default UserObjectives;
