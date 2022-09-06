import { useEffect, useState } from 'react';
import {
  ColleagueActions,
  filterReviewsByTypeSelector,
  getReviewSchema,
  PreviousReviewFilesActions,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
  schemaMetaSelector,
  TimelineActions,
} from '@pma/store';
import { useSelector } from 'react-redux';

//TODO: move utils to current feature
import { ObjectiveTypes as OT, transformReviewsToObjectives } from 'features/general/Reviews';

import { ReviewType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

const useObjectivesData = (uuid) => {
  const dispatch = useDispatch();
  const { loaded: schemaLoaded, loading: schemaLoading } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const data = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

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
  }, [reviewLoaded, schemaLoaded, JSON.stringify(formElements)]);

  useEffect(() => {
    dispatch(ReviewsActions.getReviews({ pathParams: { colleagueUuid: uuid, cycleUuid: 'CURRENT' } }));
    dispatch(TimelineActions.getUserTimeline({ colleagueUuid: uuid }));
    dispatch(SchemaActions.getSchema({ colleagueUuid: uuid }));
    dispatch(ColleagueActions.getColleagueByUuid({ colleagueUuid: uuid }));

    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
      dispatch(ColleagueActions.clearColleagueData());
    };
  }, [uuid]);

  return { objectives, meta: { loaded: schemaLoaded && reviewLoaded, loading: schemaLoading || reviewLoading } };
};

export default useObjectivesData;
