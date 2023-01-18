import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewSchema } from '@pma/store/src/selectors/schema';
import { colleagueCurrentCycleSelector, colleagueUUIDSelector, SchemaActions } from '@pma/store';
import { ReviewType } from 'config/enum';

function useReviewSchema(type: ReviewType) {
  const dispatch = useDispatch();
  const schema = useSelector(getReviewSchema(type));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const { components = [] } = schema;

  const getSchema = useCallback(() => {
    if (!components?.length) {
      dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: currentCycle }));
    }
  }, [components]);

  useEffect(() => {
    getSchema();
  }, []);

  return [schema, getSchema];
}

export default useReviewSchema;
