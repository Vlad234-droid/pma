import { useEffect } from 'react';
import {
  ColleagueActions,
  getReviewSchema,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsSelector,
  SchemaActions,
  TimelineActions,
} from '@pma/store';
import { useSelector } from 'react-redux';

import { transformReviewsToObjectives } from 'features/general/Objectives';

import { ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

export const useUserObjectivesData = (uuid, reviewLoaded, schemaLoaded, setObjectives) => {
  const dispatch = useDispatch();
  const { data } = useSelector(reviewsSelector);
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: uuid }));
  }, []);

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      setObjectives(transformReviewsToObjectives(data, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  useEffect(() => {
    dispatch(
      ReviewsActions.getReviews({
        pathParams: { colleagueUuid: uuid, code: 'OBJECTIVE', cycleUuid: 'CURRENT' },
      }),
    );
    if (uuid) {
      dispatch(TimelineActions.getUserTimeline({ colleagueUuid: uuid }));
      dispatch(SchemaActions.getSchema({ colleagueUuid: uuid }));
      dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid: uuid }));
    }

    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
      dispatch(ColleagueActions.clearColleagueData());
    };
  }, [uuid]);
};
