import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewSchema, getReviewSchemaWithPermission } from '@pma/store/src/selectors/schema';
import { getUserRoles, getUserWorkLevels } from '@pma/store/src/selectors/users';
import {
  colleagueUUIDSelector,
  countByStatusReviews,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
} from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import { dslRequest, replaceDslString } from 'utils';
import { objectivesExtraSchemaOptions } from '../utils';

function useReviewSchema(type: ReviewType) {
  const dispatch = useDispatch();
  const schema = useSelector(getReviewSchema(type));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { components = [] } = schema;

  const getSchema = useCallback(() => {
    if (!components?.length) {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
    }
  }, [components]);

  useEffect(() => {
    getSchema();
  }, []);

  return [schema, getSchema];
}

function useReviewSchemaWithPermission(type: ReviewType) {
  const dispatch = useDispatch();
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector) || {};
  const objectiveCount = useSelector(countByStatusReviews(ReviewType.OBJECTIVE, Status.APPROVED));
  const userRoles = useSelector(getUserRoles);
  const userWorkLevels = useSelector(getUserWorkLevels);
  const schema = useSelector(getReviewSchemaWithPermission(type, [...userRoles, ...userWorkLevels]));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { components = [] } = schema;

  const newComponents: any[] = [];
  components?.forEach((component) => {
    const textWithDsl = component?.type === 'text' ? component?.text : component?.description;
    const dslReviewArray: string[] = dslRequest(textWithDsl);
    if (dslReviewArray?.length) {
      [...Array(Number(objectiveCount))].forEach((_, index) =>
        newComponents.push(objectivesExtraSchemaOptions(index + 1)),
      );
    }
    newComponents.push({
      ...component,
      text: replaceDslString(component.text),
      description: replaceDslString(component.description),
    });
  });

  const getSchema = useCallback(() => {
    if (!components?.length) {
      dispatch(SchemaActions.getSchema({ colleagueUuid }));
    }
  }, [components]);

  useEffect(() => {
    getSchema();
  }, []);

  useEffect(() => {
    if (!reviewLoaded) {
      dispatch(
        ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: colleagueUuid, cycleUuid: 'CURRENT' } }),
      );
    }
  }, [reviewLoaded, colleagueUuid]);

  return [{ ...schema, components: newComponents }, getSchema];
}

export default useReviewSchema;
export { useReviewSchemaWithPermission };
