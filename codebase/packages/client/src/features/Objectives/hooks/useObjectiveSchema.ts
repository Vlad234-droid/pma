import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectiveSchema } from '@pma/store/src/selectors/schema';
import { colleagueUUIDSelector, SchemaActions } from '@pma/store';

function useObjectivesSchema() {
  const dispatch = useDispatch();
  const schema = useSelector(getObjectiveSchema);
  const { components = [] } = useSelector(getObjectiveSchema);
  const colleagueUuid = useSelector(colleagueUUIDSelector);

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

export default useObjectivesSchema;
