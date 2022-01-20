import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, SchemaActions, getPDPSchema } from '@pma/store';
import { PDPType } from 'config/enum';

function usePDPSchema(type: PDPType) {
  const dispatch = useDispatch();
  const schema = useSelector(getPDPSchema(type));
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

export default usePDPSchema;
