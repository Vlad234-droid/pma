import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, SchemaActions, getPDPSchema } from '@pma/store';

function usePDPSchema() {
  const dispatch = useDispatch();
  const schema = useSelector(getPDPSchema());

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { components = [] } = schema;

  const getSchema = useCallback(() => {
    if (!components?.length) {
      dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: 'CURRENT' }));
    }
  }, [components]);

  useEffect(() => {
    getSchema();
  }, []);

  return [schema, getSchema];
}

export default usePDPSchema;
