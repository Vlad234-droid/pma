import {
  colleagueCurrentCycleSelector,
  colleagueCycleDataSelector,
  colleagueUUIDSelector,
  userCurrentPerformanceCycleSelector,
  userPerformanceCyclesSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';

export const useCurrentCycle = (userUuid = '') => {
  const cycles = useSelector(userPerformanceCyclesSelector);

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const currentCycle = useSelector(colleagueCurrentCycleSelector(userUuid || colleagueUuid));
  const startedCycle = useSelector(userCurrentPerformanceCycleSelector);
  const colleagueCycle = useSelector(colleagueCycleDataSelector(userUuid!, currentCycle));

  if (userUuid) return colleagueCycle;
  return currentCycle !== 'CURRENT' ? cycles?.find(({ uuid }) => currentCycle === uuid) : startedCycle;
};
