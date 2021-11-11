import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectivesSelector, ObjectiveActions, objectivesSelector } from '@pma/store';

function useObjectives(params = { performanceCycleUuid: '' }) {
  const { performanceCycleUuid } = params;
  const dispatch = useDispatch();

  const { origin } = useSelector(objectivesSelector);
  const { mapObjectives } = useSelector(getObjectivesSelector);

  const getObjectives = useCallback(() => {
    if (!origin?.length) {
      dispatch(ObjectiveActions.getObjectives({ performanceCycleUuid }));
    }
  }, [performanceCycleUuid, origin]);

  useEffect(() => {
    getObjectives();
  }, []);

  return [origin, mapObjectives, getObjectives];
}

export default useObjectives;
