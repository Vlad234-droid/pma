import { useEffect, useMemo } from 'react';
import {
  getReviewSchema,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsSelector,
  SchemaActions,
  TimelineActions,
} from '@pma/store';
import { useSelector } from 'react-redux';

import { transformReviewsToObjectives } from 'features/Objectives';

import { ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

export const useUserObjectivesData = (uuid, reviewLoaded, schemaLoaded, setObjectives) => {
  const dispatch = useDispatch();
  const { data } = useSelector(reviewsSelector);
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');

  const params = useMemo(
    () => ({ pathParams: { colleagueUuid: uuid, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT' } }),
    [uuid],
  );

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: uuid }));
  }, []);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(data, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews(params));
    if (uuid) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid: uuid }));
      dispatch(SchemaActions.getSchema({ colleagueUuid: uuid }));
    }

    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
    };
  }, [uuid]);
};
